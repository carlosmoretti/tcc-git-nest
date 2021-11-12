/* eslint-disable prettier/prettier */
import { Nivel } from './nivel.model';
import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'interno' })
export class Interno extends Pessoa {

    @PrimaryGeneratedColumn({ name: 'inte_cd_id' })
    id: number;

    @Column({ name: 'inte_tx_matricula' })
    matricula: string;

    @ManyToOne(type => Nivel, nivel => nivel.id, { eager: true})
    @JoinColumn({ name: 'nive_cd_id'})
    nivel: Nivel;
}
