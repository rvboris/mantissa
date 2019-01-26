import { Module, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from '../common/providers/app-logger.provider';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  providers: [CurrencyService],
  exports: [CurrencyService]
})
export class CurrencyModule {
  constructor(
    private readonly service: CurrencyService,
    @Inject('Logger') private readonly logger: AppLogger
  ) {
    this.service.loadFixtures()
      .then(() => {
        this.logger.log('currency fixtures load successful');
      })
      .catch((e) => {
        this.logger.error(e);
      });
  }
}
