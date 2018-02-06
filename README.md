# Braintree to Redshift

Simple Node.js utility that syncs Braintree API data to Redshift tables.

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

Env Variables Required   
-----------------
`REDSHIFT_HOST`
`REDSHIFT_DATABASE`
`REDSHIFT_USER`
`REDSHIFT_PASSWORD`
`SENDGRID_API_KEY`
`BRAINTREE_MERCHANT_ID`
`BRAINTREE_PUBLIC_KEY`
`BRAINTREE_PRIVATE_KEY`

## Build

Webpack is used to build into single production dist file, intended to be deployed to AWS Lambda:

```sh
$ npm run build
```

## Deploy to Lambda

Intended for deployment to AWS Lambda -- Webpack build works in Node v6.10.* or higher.

### Development

You may start the script in `development` mode (which uses [nodemon](https://github.com/remy/nodemon) and will log to the console) by running:

```sh
$ npm start
```

## Testing

Test suites written in Mocha. Run with:

```sh
$ npm test
```
