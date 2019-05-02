import { join, resolve, dirname } from 'path';
import { DynamicModule, Module } from '@nestjs/common';
import { ErrorCode } from '@mantissa/error-codes';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { RateModule } from '../rate/rate.module';
import { GraphQLDateTime } from 'graphql-iso-date';
import { Env } from '../common/providers/env.provider';
import { CommonModule } from '../common/common.module';
import { IGraphQLErrorCode } from '../common/interfaces/graphql-error.interface';

@Module({
  imports: [
    UserModule,
    RateModule
  ]
})
export class AppModule {
  public static forRoot(env: Env): DynamicModule {
    const cwd = process.cwd();
    const typesPath = resolve(join(dirname(require.resolve('@mantissa/gql-types')), '..', 'types'));

    return {
      imports: [
        CommonModule.forRoot(env),
        GraphQLModule.forRoot({
          debug: env.isDevelopment(),
          playground: env.isDevelopment(),
          typePaths: [`${typesPath}/*.graphql`],
          resolvers: { DateTime: GraphQLDateTime },
          context: ({ req }) => ({ req }),
          installSubscriptionHandlers: true,
          formatError: (err) => {
            const formattedError: IGraphQLErrorCode = err;
            formattedError.code = ErrorCode[err.message] ? err.message : ErrorCode[ErrorCode.UNKNOWN];
            return formattedError;
          }
        }),
        TypeOrmModule.forRoot({
          database: env.getDatabaseName(),
          entities: [join(cwd, 'src/**/*.entity.ts')],
          host: env.getDatabaseHost(),
          password: env.getDatabasePassword(),
          port: env.getDatabasePort(),
          synchronize: true,
          type: 'postgres',
          username: env.getDatabaseUser(),
          logging: true,
        })
      ],
      module: AppModule,
      exports: [
        AppModule
      ]
    }
  }
}
