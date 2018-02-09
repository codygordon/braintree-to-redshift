# Braintree to Redshift

Node.js utility that uploads small chunks (intended for deployment in time-limited Lambda environment) of Braintree data in CSV files to S3, then uses the Redshift COPY command to load the data into tables from S3.

Currently supports [Transaction](https://developers.braintreepayments.com/reference/response/transaction/node), [Subscription](https://developers.braintreepayments.com/reference/response/subscription/node), and [Dispute](https://developers.braintreepayments.com/reference/response/dispute/node) Braintree API Response Objects.

## Install

```sh
$ git clone git@github.com:codygordon/braintree-to-redshift.git
$ cd braintree-to-redshift
$ npm i
```

## Config

First, copy `.env.example` to a new `.env` (make sure to leave `.env.example` intact) and enter environmental variables (all are required for script to run).

```sh
$ cp .env.example .env
```

| Required Env Variable  |
| :-----------------: |
| `REDSHIFT_HOST`  |
| `REDSHIFT_PORT`  |
| `REDSHIFT_DATABASE` |
| `REDSHIFT_USER` |
| `REDSHIFT_PASSWORD` |
| `REDSHIFT_DATABASE` |
| `REDSHIFT_SCHEMA_NAME` |
| `AWS_ACCESS_KEY_ID` |
| `AWS_SECRET_ACCESS_KEY` |
| `AWS_S3_BUCKET` |
| `AWS_REGION` |
| `BRAINTREE_MERCHANT_ID` |
| `BRAINTREE_PUBLIC_KEY` |
| `BRAINTREE_PRIVATE_KEY` |

## Development

You may start the script in `development` mode which assumes Node v9+ by running:

```sh
$ npm start
```

## Testing

Test suites written in Mocha. Run with:

```sh
$ npm test
```

## Build and Deploy

Webpack is used to build into single production dist file, intended to be deployed to AWS Lambda thus Babelified to work in Node v6.10+:

```sh
$ npm run build
```
