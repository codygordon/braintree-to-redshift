require('dotenv-safe').load();
const logger = require('./logger');

const nodeEnv = process.env.NODE_ENV;

(async function start() {
  logger.info('starting in', nodeEnv);
}());
