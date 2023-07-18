import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("category")
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

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
