const { pullData, pushData } = require('./contentful');
const { getImportData, formatImportData, isImportDataEmpty } = require('./import_data');
const { waitForConfirm } = require('./prompt');


const requiredOptions = [
  'contentModel',
  'sourceSpaceId',
  'targetSpaceId',
  'managementToken',
];

const getUndefinedOptions = options => requiredOptions.filter(key => !options[key]);

const promptConfirm = (data) => {
  const logObject = JSON.stringify(formatImportData(data), null, 2);
  const message = `\n\nFollowing data is prepared to be imported\n${logObject}\n\nConfirm to continue (Y): `;

  return waitForConfirm(message).then(() => data);
};

const logError = (err) => {
  const message = typeof err === 'object' ? (err.message || JSON.stringify(err)) : err;
  console.error(message);
};

module.exports = (options) => {
  const undefinedOptions = getUndefinedOptions(options);

  if (undefinedOptions.length) {
    return logError(`These options are required: ${undefinedOptions.join(', ')}`);
  }

  const {
    contentModel,
    sourceSpaceId,
    targetSpaceId,
    managementToken,
  } = options;

  const checkDestinationSpace = (payload) => {
    const data = getImportData(contentModel, payload);

    if (isImportDataEmpty(data)) return;
    return Promise.reject(new Error(`\n\nDesination space already has following model: ${contentModel}`));
  };

  const checkAndGetImportData = (payload) => {
    const data = getImportData(contentModel, payload);

    if (!isImportDataEmpty(data)) return data;
    return Promise.reject(new Error(`\n\nThere is no such model in source space: ${contentModel}`));
  };

  const logSuccess = () => {
    console.info(`Following content model was successfully imported: ${contentModel}`);
  };

  pullData({ spaceId: targetSpaceId, managementToken })
    .then(checkDestinationSpace)
    .then(() => pullData({ spaceId: sourceSpaceId, managementToken }))
    .then(checkAndGetImportData)
    .then(promptConfirm)
    .then(data => pushData({ content: data, spaceId: targetSpaceId, managementToken }))
    .then(logSuccess)
    .catch(logError);
};
