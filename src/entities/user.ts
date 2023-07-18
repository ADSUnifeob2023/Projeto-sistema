import {
  Column,
  Index,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("User")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  @Index()
  cpf: string;

  @Column()
  telefone: string;

  @Column()
  complemento: string;

  @Column()
  status: string;

  @CreateDateColumn()
  registrationDate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
