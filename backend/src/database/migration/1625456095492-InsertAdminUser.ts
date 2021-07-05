import {FindConditions, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../../entity/User";
import { hash } from "bcryptjs";

export class InsertAdminUser1625456095492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user: User = {
            id: "b6895893-40e6-4d44-8aa0-0d26a5f3ff34",
            email: "admin",
            isAdmin: true,
            name: "Admin",
            password: await hash("admin", 8),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await getRepository("users").save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const repository = await getRepository("users");
        await repository.delete({where: {id: "b6895893-40e6-4d44-8aa0-0d26a5f3ff34"}});
    }

}
