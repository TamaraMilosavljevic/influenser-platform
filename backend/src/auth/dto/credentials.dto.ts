export interface Credentials {
  email: string;
  password: string;
}



export const jwtConstants = {
  secret: process.env.JWT_SECRET || '',
};
