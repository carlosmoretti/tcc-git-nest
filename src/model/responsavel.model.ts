/* eslint-disable prettier/prettier */
import { Aluno } from './aluno.model';
import { Entity, Column, ManyToMany, JoinColumn, OneToMany } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'responsavel' })
export class Responsavel extends Pessoa {
    @Column({ name: 'resp_tx_matricula' })
    matricula: string;

    @OneToMany(() => Aluno, alunos => alunos.responsavel, { eager: true })
    alunos: Aluno[];
}
