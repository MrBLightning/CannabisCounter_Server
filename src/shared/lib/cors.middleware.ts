import { Injectable, NestMiddleware } from '@nestjs/common';
import cors from './cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const env = process.env.NODE_ENV;
    cors({
      headers: ['Content-Type', 'Authorization'],
      allowedOrigins: env === "production" ? ["algoretail.co.il", "*.algoretail.co.il"] : ['127.0.0.1', 'localhost', 'localhost:*']
    })(req, res, next);
  }
}
