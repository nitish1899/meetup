import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, FilterQuery, wrap } from '@mikro-orm/postgresql';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO } from './user.ro';
import { AuthService } from 'src/auth/auth.service';
import { SuccessRO } from 'src/common/success.ro';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private authService: AuthService,

    private readonly em: EntityManager,
  ) { }

  async validateUser(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOneOrFail({ id });

    return new UserRO(user);
  }

  async updateUser(data: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    wrap(user).assign({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });

    await this.em.flush();

    return new SuccessRO('Updated Successfully ');
  }

  async removeUser(userId: number) {
    const user = await this.userRepository.findOneOrFail({ id: userId });

    await this.em.removeAndFlush(user);

    return new SuccessRO('User removed successfully');
  }

  async getUserList(pageNumber: number, pageSize: number, searchText?: string,) {
    const options: FilterQuery<User> = searchText ? {
      name: {
        $ilike: `%${searchText}%`
      }
    } : {};

    const offset = (pageNumber - 1) * pageSize;

    // Retrieve the list of users with pagination
    const [users, totalCount] = await this.em.findAndCount(User, options, {
      limit: pageSize,
      offset: offset,
      fields: ['id', 'name', 'email', 'phone']
    });

    return {
      users,
      totalCount,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
}
