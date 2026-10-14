import { Role } from '../../../../core/enums/role.enum.js';
import { Gender } from '../../enums/gender.enum.js';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: Gender;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: Role;
}
