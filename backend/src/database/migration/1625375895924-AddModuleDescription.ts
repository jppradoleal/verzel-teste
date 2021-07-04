import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddModuleDescription1625375895924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("modules", new TableColumn({
            name: "description",
            type: "string",
            length: "250",
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("modules", "description");
    }

}
