import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class User1685754899032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "User",
        columns: [
          {
            name: "id",
            type: "varchar(50)",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(50)",
          },
          {
            name: "cpf",
            type: "varchar(14)",
          },
          {
            name: "telefone",
            type: "varchar(14)",
          },
          {
            name: "complemento",
            type: "varchar(250)",
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
      "User",
      new TableIndex({
        name: "IDX_QUESTION_CPF",
        columnNames: ["cpf"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("User", "IDX_QUESTION_CPF");
    await queryRunner.dropTable("User");
  }
}
