import {Module} from "./Module";
import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({name: "classes"})
class Class {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne(() => Module, module => module.id)
  module: Module;

  @Column()
  start_date: Date;
  
  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export {Class};