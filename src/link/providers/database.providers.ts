import { Sequelize } from 'sequelize-typescript';
import { Link } from '../entities/link.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequalize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '',
        database: 'shortener',
      });
      sequalize.addModels([Link]);
      await sequalize.sync();
      return sequalize;
    },
  },
];
