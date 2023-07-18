import { Repository } from "typeorm";
import { MyDataSource } from "../config/dataSource";
import { User } from "../entities/user";
const { Not } = require("typeorm");

interface DataUser {
  id?: string;
  name: string;
  cpf: string;
  telefone: string;
  complemento: string;
  status: string;
}
export class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = MyDataSource.getRepository(User);
  }

  async create(dataUser: DataUser): Promise<Object | Error> {
    try {
      if (await this.repository.findOne({ where: { cpf: dataUser.cpf } })) {
        return new Error("CPF já existente");
      }

      const data = this.repository.create({
        name: dataUser.name,
        cpf: dataUser.cpf,
        telefone: dataUser.telefone,
        complemento: dataUser.complemento,
        status: dataUser.status,
      });

      return await this.repository.save(data);
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async list(): Promise<User | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("user")
        .select("id,name,cpf,status")
        .orderBy("user.registrationDate", "DESC");

      return query.execute();
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async listByOne(id): Promise<User | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async update(dataUser: DataUser): Promise<Object | Error> {
    try {
      if (
        await this.repository.findOne({
          where: {
            id: Not(dataUser.id),
            cpf: dataUser.cpf,
          },
        })
      ) {
        return new Error("CPF já existente");
      }

      const query = await this.repository
        .createQueryBuilder()
        .update(User)
        .set({
          name: dataUser.name,
          cpf: dataUser.cpf,
          telefone: dataUser.telefone,
          complemento: dataUser.complemento,
          status: dataUser.status,
        })
        .where("id = :id", { id: dataUser.id });

      return query.execute();
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async delete(id): Promise<Object | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id });

      return query.execute();
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}
