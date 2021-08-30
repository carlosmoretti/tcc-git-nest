/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'interno' })
export class Interno extends Pessoa {
    @Column({ name: 'inte_tx_matricula' })
    matricula: string;
}
