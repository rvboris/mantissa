import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
