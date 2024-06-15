import { User } from './entities/user.entity';

export class UserRO {
  id: number;
  name: string;
  email: string | null;
  phone: number | null;
  profileImage: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
  }
}
