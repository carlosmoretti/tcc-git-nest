/* eslint-disable prettier/prettier */
import { Column, Entity, Long, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "configuracao" })
export class Configuracao {
    @PrimaryGeneratedColumn({ name: 'conf_cd_id'})
    public id: number;

    @Column({ name: 'conf_tx_nome'})
    public nome: string;

    @Column({ name: 'conf_tx_valor', type: 'mediumtext'})
    public valor: string;
}