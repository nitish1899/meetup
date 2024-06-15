import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
      if (token) {
        const decoded: string | jwt.JwtPayload = jwt.verify(
          token,
          jwtConstants.secret,
        );
        req.headers.userId =
          typeof decoded === 'string' ? decoded : decoded.userId;
      }
      next();
    } catch (err) {
      next();
    }
  }
}
