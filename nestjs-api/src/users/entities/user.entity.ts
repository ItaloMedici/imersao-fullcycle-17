import { HashUtils } from 'src/util/hash';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createAt: Date;

  static async create(input: Pick<User, 'username' | 'password'>) {
    const user = new User();
    user.username = input.username;

    const hashedPassword = await HashUtils.hash(input.password);

    user.password = hashedPassword;

    return user;
  }
}
