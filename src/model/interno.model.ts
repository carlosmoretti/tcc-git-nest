/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'interno' })
export class Interno extends Pessoa {

    @PrimaryGeneratedColumn({ name: 'inte_cd_id' })
    id: number;

    @Column({ name: 'inte_tx_matricula' })
    matricula: string;
}
