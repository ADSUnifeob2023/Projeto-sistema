import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from "typeorm";

export class Product1685931299511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Product",
        columns: [
          {
            name: "id",
            type: "varchar(50)",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(120)",
          },
          {
            name: "codigoProd",
            type: "varchar(50)",
          },
          {
            name: "idCategory",
            type: "varchar(50)",
          },
          {
            name: "preco",
            type: "float(10,2)",
          },
          {
            name: "descricao",
            type: "mediumtext",
          },
          {
            name: "status",
            type: "varchar(8)",
          },
          {
            name: "registrationDate",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      "Product",
      new TableIndex({
        name: "IDX_QUESTION_CodProd",
        columnNames: ["codigoProd"],
      })
    );

    await queryRunner.createForeignKey(
      "Product",
      new TableForeignKey({
        columnNames: ["idCategory"],
        referencedColumnNames: ["id"],
        referencedTableName: "Category",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("Product");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("idCategory") !== -1
    );
    await queryRunner.dropForeignKey("Product", foreignKey);
    await queryRunner.dropTable("Product");
  }
}
