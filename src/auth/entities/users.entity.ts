import { Column, Entity } from 'typeorm';

@Entity()
export class Users {
  @Column({ primary: true, type: 'varchar' })
  readonly email: string;

  @Column({ type: 'tinytext' })
  readonly username: string;

  @Column({ type: 'longtext' })
  readonly password: string;
}
