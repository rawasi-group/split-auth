export class CreateAuthDto {}
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
export interface Token {
  id: number;
  username: string;
}
