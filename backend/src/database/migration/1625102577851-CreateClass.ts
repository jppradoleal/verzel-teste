import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClass1625102577851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "classes",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "moduleId",
                    type: "module",
                    isNullable: false,
                },
                {
                    name: "start_date",
                    type: "timestamp",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["moduleId"],
                    referencedTableName: "modules",
                    referencedColumnNames: ["id"],
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("classes");
    }

}
