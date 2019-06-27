#! /usr/bin/env node
const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');
const contentfulsync = require('../lib/index');


const configFilePath = resolve(process.cwd(), '.contentfulsyncrc');

if (!existsSync(configFilePath)) {
  throw new Error('.contentfulsyncrc file is not found');
}

const configString = readFileSync(configFilePath, 'utf8');
const config = JSON.parse(configString);

const contentModel = process.argv[process.argv.length - 1];

contentfulsync({
  ...config,
  contentModel,
});
