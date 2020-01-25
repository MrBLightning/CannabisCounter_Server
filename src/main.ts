import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './shared/config/config.service';
import passport = require('passport');
import session = require('express-session');
import { MysqlStoreProvider } from './shared/auth/session/mysql-store.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const config = app.get<ConfigService>(ConfigService).config;
  console.log('main.ts SECRET',config.SECRET);
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