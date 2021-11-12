/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'nivel' })
export class Nivel {
    @PrimaryGeneratedColumn({ name: 'nive_cd_id' })
    id: number;

    @Column({ name: 'nive_tx_nome'})
    nome: string;

    @Column({ name: 'nive_tx_sigla'})    
    sigla: string;
}