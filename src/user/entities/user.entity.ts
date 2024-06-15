import {
  Property,
  Entity,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  name: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  @Unique()
  phone: number;

  @Property()
  password: string;

  constructor({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    phone: number;
    password: string;
  }) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
