import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CryptService } from './crypt.service';
import { UserService } from '../user/user.service';
import { ConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';
import { MysqlModule } from '../mysql/mysql.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';
import { RbacModule } from '../rbac/rbac.module';
import { AppJwtService } from './jwt.service';
import { NestApplicationContext } from '@nestjs/core';
import { SessionAuthGuard } from './session/session-auth.guard';
import { SessionGuard } from './session/session.guard';
import { MysqlStoreProvider } from './session/mysql-store.provider';
import { CookieSerializer } from './session/cookie-serializer';
import { DataRbacService } from '../../app/data/data-rbac/data-rbac.service';

// for testing
// const TOKEN_EXPIRE_IN = '1h';
// for regular use
const TOKEN_EXPIRE_IN = '1d';

@Module({
  imports: [
    MysqlModule,
    UserModule,
    ConfigModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.secret,
        signOptions: { expiresIn: TOKEN_EXPIRE_IN },
      })
    }),
  ],
  providers: [AuthService, CryptService, LocalStrategy, JwtStrategy, AppJwtService,
    SessionAuthGuard, SessionGuard, MysqlStoreProvider, CookieSerializer, DataRbacService],
  exports: [AuthService],
})
export class AuthModule { }
