# Contentful-sync

Cli tool to sync contentful models between spaces

## Install

```
npm install contentful-sync
```

This module targets Node.js 8 or later. If you want support for older browsers use [Babel compiler](https://babeljs.io/).

## Usage

Create .contentfulsyncrc file in project directory

```json
{
  "sourceSpaceId": "xxxxxx",
  "destinationSpaceId": "xxxxxx",
  "managementToken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

```

Run contentful-sync

```
$ npx contentfulsync <contentfulContentType>
```

## License

MIT © Abylay Keldibek
