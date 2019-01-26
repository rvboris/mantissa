import { Module, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from '../common/providers/app-logger.provider';
import { RateEntity } from './rate.entity';
import { RateService } from './rate.service';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [CurrencyModule, TypeOrmModule.forFeature([RateEntity])],
  providers: [RateService],
  exports: [RateService]
})
export class RateModule {
  constructor(
    private readonly service: RateService,
    @Inject('Logger') private readonly logger: AppLogger
    ) {
    this.service.loadFixtures()
      .then(() => {
        this.logger.log('rates fixtures load successful');
      })
      .catch((e) => {
        this.logger.error(e);
      });
  }
}
