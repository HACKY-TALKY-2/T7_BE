export interface User {
  id: number;
}

export interface JwtPayload extends User {
  signedAt: string;
  admin: boolean;
}
