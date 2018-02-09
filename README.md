# Braintree to Redshift

Simple Node.js utility that syncs Braintree API data to Redshift tables.

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

| Env Variable | Required |
| ----------------- | :-----: |
| `REDSHIFT_HOST`  | Yes |
| `REDSHIFT_DATABASE` | Yes |
| `REDSHIFT_USER` | Yes |
| `REDSHIFT_PASSWORD` | Yes |
| `SENDGRID_API_KEY` | Yes |
| `BRAINTREE_MERCHANT_ID` | Yes |
| `BRAINTREE_PUBLIC_KEY` | Yes |
| `BRAINTREE_PRIVATE_KEY` | Yes |

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
