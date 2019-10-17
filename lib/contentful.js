const request = require('contentful-export');
const send = require('contentful-import');


const exportOptions = {
  skipContent: true,
  skipRoles: true,
  skipWebhooks: true,
  saveFile: false,
};

const importOptions = {
  contentModelOnly: true,
};

exports.pullData = (options) => request({ ...exportOptions, ...options });
exports.pushData = (options) => send({ ...importOptions, ...options });
