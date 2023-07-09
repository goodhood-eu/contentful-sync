#! /usr/bin/env node
const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');
const contentful_sync = require('../lib/index');


const configFilePath = resolve(process.cwd(), '.contentful-sync-rc');

if (!existsSync(configFilePath)) {
  throw new Error('.contentful-sync-rc file is not found');
}

const configString = readFileSync(configFilePath, 'utf8');
const config = JSON.parse(configString);

const contentModel = process.argv[2];

contentful_sync({
  ...config,
  contentModel,
});
