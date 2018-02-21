/* eslint-disable */
'use strict'
const AWS = require('aws-sdk')

/* Because the require() is inside the handler ALL connection pools
  and state are re-instantiated per-request. See:

 http://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code

  "Separate the Lambda handler (entry point) from your core logic"

  This is generally bad, but this is currently intended to run once
  per X-hours rather than multiple instances at once,
  so this is a fair tradeoff. */

exports.handler = (event, context, callback) => {
  if (process.env.LAMBDA_DEBUG_LOG) {
    console.log('LAMBDA EVENT', event);
  }
  if (event.env) {
    for (const a in event.env) {
      process.env[a] = event.env[a];
    }
  }
  if (!event.command) {
    const index = require('./dist/index');
    index.start()
      .then(() => {
        console.log('done index');
        console.log('remaining time =', context.getRemainingTimeInMillis());
        callback(null, 'done');
      })
      .catch(err => {
        console.log('error loading index: ', err);
        callback(err);
      });
  }
  // handle a custom command sent as an event
};
