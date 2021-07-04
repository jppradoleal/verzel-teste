import {Module} from "./Module";
import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";
import { Transform } from "class-transformer";
import dayjs from "dayjs";

@Entity({name: "classes"})
class Class {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne(() => Module, module => module.id)
  module: Module;

  @Transform(value => `${process.env.URL}/${value.value}`)
  @Column({name: "thumbnail_url"})
  imageUrl: string;

  @Transform((value) => dayjs(value.value).toISOString())
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