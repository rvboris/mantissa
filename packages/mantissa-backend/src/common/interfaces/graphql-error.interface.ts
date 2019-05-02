import { GraphQLError } from 'graphql';

export interface IGraphQLErrorCode extends GraphQLError {
  code?: string;
}
