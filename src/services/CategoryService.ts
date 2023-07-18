import { Repository } from "typeorm";
import { MyDataSource } from "../config/dataSource";
import { Category } from "../entities/Category";

interface DataCategory {
  id?: string;
  name: string;
  status: string;
}

export class CategoryService {
  private repository: Repository<Category>;

  constructor() {
    this.repository = MyDataSource.getRepository(Category);
  }

  async create(dataCategory: DataCategory): Promise<Object | Error> {
    try {
      const data = this.repository.create({
        name: dataCategory.name,
        status: dataCategory.status,
      });

      return await this.repository.save(data);
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
  async list(fields = ["id", "name", "status"]): Promise<Category | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("category")
        .select(fields)
        .orderBy("category.registrationDate", "DESC");

      return query.execute();
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async listByOne(dataCategory: DataCategory): Promise<Category | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("category")
        .where("category.id = :id", { id: dataCategory.id })
        .getOne();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async update(dataCategory: DataCategory): Promise<Object | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder()
        .update(Category)
        .set({ name: dataCategory.name, status: dataCategory.status })
        .where("id = :id", { id: dataCategory.id });

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
        .from(Category)
        .where("id = :id", { id: id });

      return query.execute();
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}
