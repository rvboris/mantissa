import { generateNamespace } from '@gql2ts/from-schema';
import { DEFAULT_OPTIONS, DEFAULT_TYPE_MAP } from '@gql2ts/language-typescript';
import { mergeTypes } from 'merge-graphql-schemas';
import * as fs from 'fs';
import * as glob from 'glob';

const globbedFilePaths: string[] = glob.sync('./types/*.graphql');
const content: string[] = globbedFilePaths.map((filePath: string) =>
  fs.readFileSync(filePath).toString()
);
const schema = mergeTypes(content);

const overrides = {
  ignoreTypeNameDeclaration: true,
  typeMap: {
    ...DEFAULT_TYPE_MAP,
    ID: 'ID',
  },
};

const transformOptions = {
  generateNamespace: (name: string, interfaces: string) => interfaces,
  interfaceBuilder: (name: string, body: string) =>
    DEFAULT_OPTIONS.exportFunction(
      DEFAULT_OPTIONS.interfaceBuilder(name, body)
    ),
  enumTypeBuilder: (name: string, values: string) =>
    `export enum ${name} ${values}`,
  typeBuilder: (name: string, body: string) =>
    `export ${DEFAULT_OPTIONS.typeBuilder(name, body)}`,
  wrapList: (type: string) => `${type}[]`,
};

const namespace = generateNamespace('', schema, overrides, transformOptions);

fs.writeFileSync('./src/index.ts', namespace);
