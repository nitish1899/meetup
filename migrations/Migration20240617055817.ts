import { Migration } from '@mikro-orm/migrations';

export class Migration20240617055817 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "like" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" int not null, "parent_type" text check ("parent_type" in (\'Post\', \'Comment\')) not null, "parent_id" int not null);');

    this.addSql('create table "follow" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "follower_id" int not null, "followee_id" int not null);');
    this.addSql('create index "follow_follower_id_index" on "follow" ("follower_id");');
    this.addSql('create index "follow_followee_id_index" on "follow" ("followee_id");');
    this.addSql('create index "follow_follower_followee_index" on "follow" ("follower_id", "followee_id");');

    this.addSql('create table "discussion" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "text" text null, "image" text null, "user_id" int not null, "hash_tags" text[] not null default \'{}\', "view_count" int not null);');

    this.addSql('create table "comment" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "owner_id" int not null, "message" varchar(255) not null, "like_count" int not null default 0, "parent_type" text check ("parent_type" in (\'Post\', \'Comment\')) not null, "parent_id" int not null);');

    this.addSql('alter table "like" add constraint "like_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "follow" add constraint "follow_follower_id_foreign" foreign key ("follower_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "follow" add constraint "follow_followee_id_foreign" foreign key ("followee_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "discussion" add constraint "discussion_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

}
