/* eslint-disable prettier/prettier */
import { JoinTable } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm'
import { Aluno } from './aluno.model';
import { Entity, Column, ManyToMany, JoinColumn, OneToMany } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'responsavel' })
export class Responsavel extends Pessoa {

    @PrimaryGeneratedColumn({ name: 'resp_cd_id' })
    id: number;

    @Column({ name: 'resp_tx_matricula' })
    matricula: string;

    @Column({name: "resp_tx_telefone"})
    telefone: string;

    @ManyToMany(() => Aluno, (user) => user.responsavel, { eager: true, cascade: true })
    @JoinTable({
        name: "responsavel_aluno",
        joinColumn: { name: "resp_cd_id" },
        inverseJoinColumn: { name: "alun_cd_id" }
    })
    alunos: Aluno[];
}
