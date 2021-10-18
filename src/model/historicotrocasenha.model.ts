/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from "typeorm";

@Entity({ name: 'historico_troca_senha' })
export class HistoricoTrocaSenha {
    
    @PrimaryGeneratedColumn({ name: 'hits_cd_id' })
    id: number;
    
    @Column({ name: 'hits_tx_email'})
    email: string;

    @Column({ name: 'hits_tx_perfil'})
    perfil: string;

    @Column({ name: 'hits_tx_token'})
    token: string;

    @Column({ name: 'hits_dt_validade' })
    validade: Date;

    @Column({ name: 'hits_in_ativo'})
    ativo: boolean;
}