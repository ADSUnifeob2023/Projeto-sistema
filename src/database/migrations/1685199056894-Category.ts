import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Category1685199056894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Category",
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Category");
  }
}
