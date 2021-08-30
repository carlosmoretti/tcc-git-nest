/* eslint-disable prettier/prettier */
import { Entity, ChildEntity, Column, BaseEntity } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'aluno' })
export class Aluno extends Pessoa {
    @Column({ name: 'alun_tx_matricula' })
    matricula: string;
}
