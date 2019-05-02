const { generateNamespace } = require('@gql2ts/from-schema');
const { DEFAULT_OPTIONS, DEFAULT_TYPE_MAP } = require('@gql2ts/language-typescript');
const { mergeTypes } = require('merge-graphql-schemas');
const { readFileSync, writeFileSync } = require('fs');
const glob = require('glob');

const globbedFilePaths = glob.sync('./types/*.graphql');
const content = globbedFilePaths.map((filePath) => readFileSync(filePath).toString());
const schema = mergeTypes(content);

const overrides = {
  ignoreTypeNameDeclaration: true,
  typeMap: {
    ...DEFAULT_TYPE_MAP,
    ID: 'ID',
  },
};

const transformOptions = {
  generateNamespace: (name, interfaces) => interfaces,
  interfaceBuilder: (name, body) =>
    DEFAULT_OPTIONS.exportFunction(
      DEFAULT_OPTIONS.interfaceBuilder(name, body)
    ),
  enumTypeBuilder: (name, values) =>
    `export enum ${name} ${values}`,
  typeBuilder: (name, body) =>
    `export ${DEFAULT_OPTIONS.typeBuilder(name, body)}`,
  wrapList: (type) => `${type}[]`,
};

const namespace = generateNamespace('', schema, overrides, transformOptions);

writeFileSync('./generated/index.ts', namespace);
