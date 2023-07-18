import { Repository } from "typeorm";
import { MyDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";

export class SalesService {
  private repository: Repository<Product>;

  constructor() {
    this.repository = MyDataSource.getRepository(Product);
  }

  async listByOne(codigoProd): Promise<Product | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("product")
        .select(["product.name", "product.codigoProd", "product.preco"])
        .where("product.codigoProd = :codigoProd", { codigoProd: codigoProd })
        .getOne();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
  async listComplete(nameProduct): Promise<Object | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("product")
        .select([
          "product.id",
          "product.name",
          "product.codigoProd",
          "product.preco",
        ])
        .where("product.name LIKE :productname", {
          productname: `%${nameProduct}%`,
        })
        .getMany();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async listByOneProduct(codigoProd): Promise<Product | Error> {
    try {
      const query = await this.repository
        .createQueryBuilder("product")
        .select([
          "product.id",
          "product.name",
          "product.codigoProd",
          "product.preco",
        ])
        .where("product.codigoProd  = :productcodigo", {
          productcodigo: `${codigoProd}`,
        })
        .getOne();

      return query;
    } catch (error) {
      return new Error(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}
