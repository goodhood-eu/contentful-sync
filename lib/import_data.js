exports.isImportDataEmpty = data => !data.contentTypes.length;

exports.getImportData = (contentModel, payload) => {
  const isMatched = item => item.sys.id === contentModel;
  const { contentTypes, editorInterfaces } = payload;

  const result = {
    contentTypes: contentTypes.filter(isMatched),
  };

  if (editorInterfaces) {
    result.editorInterfaces = editorInterfaces.filter(item => isMatched(item.sys.contentType));
  }

  return result;
};

exports.formatImportData = (data) => {
  const { name, description, fields } = data.contentTypes[0];
  const formattedFields = fields.map(field => field.id);

  return {
    name,
    description,
    fields: formattedFields,
  };
};
