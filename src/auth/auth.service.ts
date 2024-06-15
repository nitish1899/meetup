import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { SuccessRO } from 'src/common/success.ro';
import { SignupDto } from './dto/signup.dto';
import { AuthRO } from './auth.ro';
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private em: EntityManager,
  ) { }

  getJwtToken(id: number, email: string) {
    const payload = {
      userId: id,
      email: email,
    };
    return this.jwtService.sign(payload);
  }

  async signup(dto: SignupDto) {
    const existingUser = await this.userRepository.findOneOrFail({ $or: [{ phone: dto.phone }, { email: dto.email }] });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    if (dto.pin !== dto.confirmPin) {
      throw new BadRequestException('Please enter same confirm pin');
    }

    const hashPin = await bcrypt.hash(dto.pin.toString(), 10);

    const newUser = new User({ name: dto.name, email: dto.email, phone: dto.phone, password: hashPin, profileImage: dto.profileImage });

    await this.em.persistAndFlush(newUser);

    return new SuccessRO('Registered Successfully');
  }

  async login({ email, password }: { email: string, password: string }) {
    try {
      const existingUser = await this.userRepository.findOneOrFail({ email });

      const isPinCorrect = await bcrypt.compare(password.toString(), existingUser.password);

      if (!isPinCorrect) {
        throw new BadRequestException('Please enter the valid pin');
      }

      return new AuthRO(this.getJwtToken(existingUser.id, email));
    } catch (error) {
      return { error: error?.message }
    }
  }
}
