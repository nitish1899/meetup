import {
  Property,
  Entity,
  Unique,
  // OneToMany,
  // Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
// import { Book } from 'src/book/entities/book.entity';

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

  @Property({ type: 'text', nullable: true })
  profileImage: string | null;

  @Property()
  password: string;

  // @OneToMany({ entity: () => Book, mappedBy: 'author', nullable: true })
  // books = new Collection<Book>(this);

  constructor({
    name,
    email,
    phone,
    password,
    profileImage,
  }: {
    name: string;
    email: string;
    phone: number;
    password: string;
    profileImage: string | null;
  }) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.profileImage = profileImage;
  }
}
