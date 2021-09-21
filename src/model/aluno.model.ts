/* eslint-disable prettier/prettier */
import { Responsavel } from './responsavel.model';
import { Entity, ChildEntity, Column, BaseEntity, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'aluno' })
export class Aluno extends Pessoa {
    @Column({ name: 'alun_tx_matricula' })
    matricula: string;

    @ManyToOne(type => Responsavel, responsavel => responsavel.alunos)
    @JoinColumn({name: 'resp_cd_id'})
    responsavel: Responsavel;

    
}
