if (!process.env.NO_ENV_CHANGE) {
  require('dotenv-safe').load(); // eslint-disable-line
}
const logger = require('./utils/logger');
const { fatal, finished } = require('./utils/handlers');
const Braintree = require('./Braintree');
const Redshift = require('./Redshift');

const braintree = new Braintree();
const redshift = new Redshift();

const nodeEnv = process.env.NODE_ENV;

/* run the script in prod OR
  export initialized classes for testing in dev */

if (nodeEnv !== 'development') {
  (async function start() {
    logger.info('starting in', nodeEnv);
    const tables = ['transactions'];
    const batchTimestamp = Date.now();

    try {
      await redshift.createSchema();
      await Promise.all(tables.map(async (table) => {
        try {
          const fileName = `transactions_${batchTimestamp}.csv`;
          await redshift.createTable(table);
          const redshiftTimestamps = await redshift.createdAtTimestamps(table);
          await braintree.uploadToS3(table, redshiftTimestamps, fileName);
          await redshift.copyFromS3(table, fileName);
          await redshift.dropDupes(table);
        } catch (err) { fatal(err); }
      }));
      finished();
    } catch (err) { fatal(err); }
  }());
} else {
  exports.braintree = braintree;
  exports.redshift = redshift;
}
