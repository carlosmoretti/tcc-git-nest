/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Pessoa extends BaseEntity {
    
    @Column({ name: 'pess_tx_login' })
    login: string;

    @Column({ name: 'pess_tx_nome' })
    nome: string;

    @Column({ name: 'pess_tx_senha' })
    senha!: string;

    @Column({ name: 'pess_tx_sobrenome' })
    sobrenome: string;

    @Column({ name: 'pess_dt_inclusao'})
    dataInclusao: Date;

    @Column({ name: 'pess_tx_email'})
    email: string;
}
