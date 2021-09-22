/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn } from 'typeorm';
import { Responsavel } from './responsavel.model';
import { Entity, ChildEntity, Column, BaseEntity, ManyToMany, JoinColumn, ManyToOne, JoinTable } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'aluno' })
export class Aluno extends Pessoa {

    @PrimaryGeneratedColumn({ name: 'alun_cd_id' })
    id: number;

    @Column({ name: 'alun_tx_matricula' })
    matricula: string;

    @ManyToMany(() => Responsavel, (resp) => resp.alunos)
    responsavel: Responsavel[];
}