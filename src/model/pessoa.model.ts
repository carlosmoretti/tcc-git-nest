/* eslint-disable prettier/prettier */
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Pessoa extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'pess_cd_id' })
    id: number;

    @Column({ name: 'pess_tx_login' })
    login: string;

    @Column({ name: 'pess_tx_nome' })
    nome: string;

    @Column({ name: 'pess_tx_senha' })
    senha: string;

    @Column({ name: 'pess_tx_sobrenome' })
    sobrenome: string;
}
