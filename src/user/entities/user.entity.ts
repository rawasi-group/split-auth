import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true }) phone: string;
  @Column() name: string;
  @Column() gender: string;
  @Column() nationality: string;
  @Column() client_id: string;
  @Column() password: string;
  @Column({ nullable: true }) email: string;
  @Column({ nullable: true })
  user_name: string;
  @Column()
  session_token: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
