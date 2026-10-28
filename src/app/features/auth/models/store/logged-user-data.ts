import { Role } from '../../../../core/enums/role.enum.js';

export interface LoggedUserData {
  username: string;
  email: string;
  role: Role;
  userId: string;
}
