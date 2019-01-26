import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { formatError } from './common/helpers/pretty-error';
import { AppLogger } from './common/providers/app-logger.provider';
import { Env } from './common/providers/env.provider';

Error.stackTraceLimit = Infinity;

process.on('uncaughtException', (err) => {
  console.log(formatError(err)); // tslint:disable-line no-console
});

process.on('unhandledRejection', (err) => {
  console.log(formatError(err)); // tslint:disable-line no-console
});

export async function bootstrap(module?: any) {
  const env = Env.getInstance();
  const app = await NestFactory.create(AppModule.forRoot(env), {
    logger: AppLogger.getInstance({env})
  });

  if (module && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
