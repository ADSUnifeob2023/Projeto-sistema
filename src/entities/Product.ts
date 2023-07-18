import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";
import { v4 as uuid } from "uuid";

@Entity("Product")
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  @Index()
  codigoProd: string;

  @ManyToOne((type) => Category)
  @JoinColumn({ name: "idCategory", referencedColumnName: "id" })
  idCategory: Category;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco: number;

  @Column({ type: "mediumtext" })
  descricao: string;

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
