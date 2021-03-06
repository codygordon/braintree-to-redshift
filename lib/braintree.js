const { connect, Environment } = require('braintree');
const fs = require('fs');
// const { createGzip } = require('zlib');
const csvWriter = require('csv-write-stream');
const S3 = require('aws-sdk/clients/s3');
const fieldMaps = require('../lib/field-maps');

module.exports = class {
  constructor() {
    this.client = connect({
      environment: process.env.NODE_ENV !== 'development'
        ? Environment.Production
        : Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANT_ID,
      publicKey: process.env.BRAINTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });

    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadToS3(responseObject, redshiftTimestamps, csvName) {
    const tmpPath = `${__dirname}/${process.env.NODE_ENV !== 'development' ? '' : '../'}tmp`;
    const csvPath = `${tmpPath}/${csvName}`;
    const writer = csvWriter({ separator: '|', sendHeaders: false });
    const writeStream = fs.createWriteStream(csvPath);

    const writePromise = async isMin => new Promise((resolve, reject) => {
      const { min, max } = redshiftTimestamps;

      const searchStream = this.client.transaction.search(search => (
        isMin ? search.createdAt().min(max) : search.createdAt().max(min)
      ));

      /* NOTE: allow 3 minutes to get transactions greater than the current max
        and only 1 minute for those less.

        This will hopefully grab all new transactions, otherwise if all of them
        don't get uploaded in the current batch they will be skipped next time */

      const timeout = setTimeout(() => {
        searchStream.pause();
        searchStream.emit('end');
      }, isMin ? 180000 : 60000);

      searchStream.on('data', (data) => {
        writer.write(fieldMaps.transactions(data));
      });

      searchStream.on('error', err => reject(err));

      searchStream.on('end', () => {
        clearTimeout(timeout);

        if (!isMin) {
          writer.end();
          /* problems uploading gzip consistently to S3, need to test more */
          // const gzip = createGzip();
          // const gzOutput = fs.createWriteStream(`${csvPath}.gz`);
          // const gzInput = fs.createReadStream(csvPath);
          // gzInput.pipe(gzip).pipe(gzOutput);
          // gzInput.on('error', (err) => {
          //   throw err;
          // }).on('end', () => resolve());
        }
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      writeStream.on('open', async () => {
        try {
          writer.pipe(writeStream);
          await writePromise(true);
          await writePromise(false);
          resolve();
        } catch (err) { reject(err); }
      });
    });

    await this.s3.putObject({
      Bucket: 'votivate-dev',
      Key: csvName,
      Body: fs.createReadStream(csvPath),
    }).promise();
  }
};
