import {Module} from "./Module";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({name: "classes"})
class Class {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(type => Module, module => module.id)
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