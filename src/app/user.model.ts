export interface UserModel {
  id: number,
  firstName: string,
  lastName: string
}

export class User implements UserModel {
  id: number;
  firstName: string;
  lastName: string;
}
