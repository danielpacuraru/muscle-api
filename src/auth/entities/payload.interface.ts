import { Roles } from './roles.enum';

export interface Payload {
  sub: string;
  role: Roles;
}
