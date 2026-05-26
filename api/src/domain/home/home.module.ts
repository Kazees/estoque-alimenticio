import { Module } from '@nestjs/common';

import { HomeController } from '@app/domain/home/home.controller';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [],
})
export class HomeModule {}
