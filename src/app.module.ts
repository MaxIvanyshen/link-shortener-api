import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module';
import { Link } from './link/link.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'shortener',
      entities: [Link],
      synchronize: true,
      logging: false,
    }),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
