/* eslint-disable prettier/prettier */
import { Aluno } from 'src/model/aluno.model';
import { Responsavel } from 'src/model/responsavel.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'recado'})
export class Recado {
    @PrimaryGeneratedColumn({ name: 'reca_cd_id'})
    id: number;

    @Column({ name: 'reca_tx_texto'})
    mensagem: string;

    @ManyToOne(type => Responsavel, resp => resp.id, { eager: true })
    @JoinColumn({ name: 'resp_cd_id' })
    responsavel: Responsavel;

    @ManyToOne(alun => Aluno, alun => alun.id, { eager: true })
    @JoinColumn({ name: 'alun_cd_id' })
    aluno: Aluno;

    @Column({ name: 'reca_dt_data'})
    data: Date;

    @Column({ name: 'reca_in_visualizado'})
    visualizado: boolean;
}