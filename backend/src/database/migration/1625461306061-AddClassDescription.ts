import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AddClassDescription1625461306061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("classes", new TableColumn({
            name: 'description',
            type: 'string',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("classes", "description");
    }

}
