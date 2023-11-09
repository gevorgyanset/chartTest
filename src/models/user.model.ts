export interface User {
  sub: string;
  name: string;
  roles: string[];
  exp: number;
}

export interface Login  {
  userName: string;
  password: string;
}

export const PossibleRoles = ['viewer', 'chartCreator'];
