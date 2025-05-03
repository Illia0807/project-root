// types/jwt.d.ts
import { JwtPayload as OriginalJwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload extends OriginalJwtPayload {
    userId: string; // или number, если userId это число
  }
}
