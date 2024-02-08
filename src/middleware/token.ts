import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
     console.log(authHeader)
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' from the token
      try {
        const decodedToken = this.jwtService.decode(token);
        console.log(decodedToken)
        // Extract userID from the decoded token and attach it to the request object
        req['userId'] = decodedToken.sub;
        console.log(req['userId']) // Assuming 'sub' holds userID
      } catch (error) {
        // Token is invalid or expired
        console.error('Invalid token:', error.message);
      }
    }
    next();
  }
}
