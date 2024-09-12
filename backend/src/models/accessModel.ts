export type User = {
  id: string
  name: string
  email: string
  password_hash: string
};


export type _UserTokenValidation = { [token: string]: { user_id: string, valid_untill: Date } };
export const UsersTokensValidation: _UserTokenValidation = {};
