# Braintree to Redshift

Simple Node.js utility that fetches

Robust logging with [winston](https://github.com/winstonjs/winston).

## Install

```sh
$ git clone git@github.com:codygordon/redash-to-salesforce.git
$ cd redash-to-salesforce
$ npm i
```

## Config

First, copy `.env.example` to a new `.env` (make sure to leave `.env.example` intact) and enter environmental variables (all are required for script to run).

```sh
$ cp .env.example .env
```

Env Variable      | Value
----------------- | --------------------------------------------------------
`REDSHIFT_HOST` |
`REDSHIFT_DATABASE` |
`REDSHIFT_USER` |
`REDSHIFT_PASSWORD` | *(make sure to update if changed)*
`SENDGRID_API_KEY` |
`BRAINTREE_MERCHANT_ID` |
`BRAINTREE_PUBLIC_KEY` |
`BRAINTREE_PRIVATE_KEY` |
`LOGS_PATH` | *(log files in production will be saved in specified folder path)*

Second, edit `lib\config.js` and enter objects into the `config` constant (array).

```js
const config = [

]
```

### Redshift



### Braintree

***The script will fail if the following conditions aren't met:***

-
-

## Build

Webpack is used to build into single production dist file, intended to be deployed to AWS Lambda:

```sh
$ npm run build
```

## Deploy to Lambda

### Development

You may start the script in `development` mode (which uses [nodemon](https://github.com/remy/nodemon) and will log to the console) by running:

```sh
$ npm start
```

## TODOs

1. Write test suites in Mocha
