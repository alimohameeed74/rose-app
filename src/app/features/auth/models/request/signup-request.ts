import { Gender } from '../../enums/gender.enum.js';

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
