import { Role } from '../../enums/role.enum';

export class CreateUserDto {
  username: string;
  nickname: string;
  email: string;
  roles: Role[];
  password: string;
}
