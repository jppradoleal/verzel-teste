import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddClassImageUrl1625375906618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("classes", new TableColumn({
            name: "thumbnail_url",
            type: "string"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("classes", "thumbnail_url");
    }

}
