export type User = {
  id: string
  name: string
  email: string
  password_hash: string
};


export type _UserTokenValidation = { [token: string]: { userId: string, validUntill: Date } };
export const UsersTokensValidation: _UserTokenValidation = {};
