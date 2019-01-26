import { Global, Module, DynamicModule } from '@nestjs/common';
import { AppLogger } from './providers/app-logger.provider';
import { Env } from './providers/env.provider';

@Global()
@Module({})
export class CommonModule {
  public static forRoot(env: Env): DynamicModule {
    const LoggerProvider = ({
      provide: 'Logger',
      useFactory: () => {
        return AppLogger.getInstance({
          env
        });
      }
    });

    const EnvProvider = ({
      provide: 'Env',
      useFactory: () => {
        return env;
      }
    });

    return {
      module: CommonModule,
      providers: [
        LoggerProvider,
        EnvProvider
      ],
      exports: [
        LoggerProvider,
        EnvProvider
      ]
    }
  }
}
