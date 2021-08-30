/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'responsavel' })
export class Responsavel extends Pessoa {
    @Column({ name: 'resp_tx_matricula' })
    matricula: string;
}
