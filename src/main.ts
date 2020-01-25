import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './shared/config/config.service';
import passport = require('passport');
import session = require('express-session');
import { MysqlStoreProvider } from './shared/auth/session/mysql-store.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  let config;
  if (process.env.NODE_ENV == 'development') {
    config = app.get<ConfigService>(ConfigService).config;
    console.log('config 1', config);
  } else {
    config = {
      SECRET: process.env.SECRET,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      STORAGE_FOLDER: process.env.STORAGE_FOLDER,
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_PASS: process.env.MYSQL_PASS,
      APP_NAME: process.env.APP_NAME,
      APP_VERSION: process.env.APP_VERSION,
      PORT: parseInt(process.env.PORT),
      HOST: process.env.HOST,
    };
    console.log('config 2', config);
  }
  app.use(session({
    secret: config.SECRET,
    store: app.get<MysqlStoreProvider>(MysqlStoreProvider),
    saveUninitialized: false,
    resave: false,
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(config.PORT);
}
bootstrap();