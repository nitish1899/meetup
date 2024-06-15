import { Logger, NotFoundException } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Migrator } from '@mikro-orm/migrations';
import dotenv from 'dotenv';
dotenv.config();

const logger = new Logger('MikroORM');
const config: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  clientUrl: process.env['DATABASE_URL'] as string,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  allowGlobalContext: true,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    // @ts-expect-error we should not use any
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: false, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
  findOneOrFailHandler: (entityName: string) => {
    throw new NotFoundException(`${entityName} not found`);
  },
  extensions: [Migrator],
};

export default config;
