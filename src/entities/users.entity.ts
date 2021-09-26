import * as bcrypt from 'bcryptjs'; // TODO change to bcrypt
import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

const saltRounds = 10;

@Entity('user')
@Unique(['login'])
export class User {
  @PrimaryColumn()
  public login: string;

  @Column()
  public password: string;

  @BeforeInsert()
  private async encryptPassword() {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
