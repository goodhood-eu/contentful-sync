# Contentful-sync

Cli tool to sync contentful models between spaces

## Install

```
npm install contentful-synchronize
```

This module targets Node.js 8 or later. If you want support for older versions use [Babel compiler](https://babeljs.io/).

## Usage

Create .contentful-sync-rc file in project directory

```json
{
  "sourceSpaceId": "xxxxxx",
  "targetSpaceId": "xxxxxx",
  "managementToken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

```

Run contentful-sync

```
$ npx contentful-sync <contentfulContentType>
```
