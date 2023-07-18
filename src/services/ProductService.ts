import { Repository } from "typeorm";
import { MyDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";

interface DataProduct {
  id?: string;
  name: string;
  codigoProd: string;
  idCategory: any;
  preco: number;
  descricao: string;
  status: string;
}

export class ProductService {
  private repository: Repository<Product>;

  constructor() {
    this.repository = MyDataSource.getRepository(Product);
  }

  async create(dataProduct: DataProduct): Promise<Object | Error> {
    try {
      if (
        await this.repository.findOne({
          where: { codigoProd: dataProduct.codigoProd },
        })
      ) {
        return new Error("Código Produto já existente");
      }

      const data = this.repository.create({
        name: dataProduct.name,
        codigoProd: dataProduct.codigoProd,
        idCategory: dataProduct.idCategory,
        preco: dataProduct.preco,
        descricao: dataProduct.descricao,
        status: dataProduct.status,
      });

      return await this.repository.save(data);
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
  async list(): Promise<Object | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("product")
        .innerJoinAndSelect("product.idCategory", "category")
        .select([
          "product.id AS id",
          "product.idCategory AS idCategoria",
          "product.name AS nomeProduto",
          "category.name as categoria",
          "product.status as status",
        ])
        .orderBy("category.registrationDate", "DESC");

      return query.execute();
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async listByOne(id): Promise<Product | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("product")
        .innerJoinAndSelect("product.idCategory", "category")
        .select([
          "product.id",
          "product.name",
          "product.codigoProd",
          "product.idCategory",
          "category.id",
          "product.preco",
          "product.descricao",
          "product.status",
        ])
        .where("product.id = :id", { id: id })
        .getOne();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async update(dataProduct: DataProduct): Promise<Object | Error> {
    try {
      const preco = dataProduct.preco.toString().replace(",", ".");

      const query = await this.repository
        .createQueryBuilder()
        .update(Product)
        .set({
          name: dataProduct.name,
          codigoProd: dataProduct.codigoProd,
          idCategory: dataProduct.idCategory,
          preco: Number(preco),
          descricao: dataProduct.descricao,
          status: dataProduct.status,
        })
        .where("id = :id", { id: dataProduct.id });

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
        .from(Product)
        .where("id = :id", { id: id })
        .execute();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}
