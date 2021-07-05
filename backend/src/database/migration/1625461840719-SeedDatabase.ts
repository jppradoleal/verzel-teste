import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Class } from "../../entity/Class";
import { Module } from "../../entity/Module";

export class SeedDatabase1625461840719 implements MigrationInterface {

    moduleId = "032c0184-26b7-4b03-85bd-3031e81bfbba";
    classId = "574576ac-2ecb-4645-93d0-b9b9fcf94082";

    public async up(queryRunner: QueryRunner): Promise<void> {

        const moduleRegistry: Module = {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: this.moduleId,
            name: "ReactJS",
            description: "O React é uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. É mantido pelo Facebook, Instagram, outras empresas e uma comunidade de desenvolvedores individuais.",
        }

        const moduleRepository = getRepository("modules");

        await moduleRepository.save(moduleRegistry);

        const classRegistry: Class = {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: this.classId,
            imageUrl: "public/uploads/thumbnail-123.png",
            name: "State",
            start_date: new Date(),
            description: 'Stateful components and useState hook',
            module: moduleRegistry
        }

        const classesRepository = getRepository("classes");

        await classesRepository.save(classRegistry);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
