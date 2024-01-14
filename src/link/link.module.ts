import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { linkProviders } from './providers/link.providers';
import { databaseProviders } from './providers/database.providers';

@Module({
  controllers: [LinkController],
  providers: [LinkService, ...linkProviders, ...databaseProviders],
})
export class LinkModule {}
