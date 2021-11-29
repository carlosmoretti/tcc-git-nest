/* eslint-disable prettier/prettier */
import { Agenda } from './agenda.model';
import { Aluno } from './aluno.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'registro' })
export class Registro {
    @PrimaryGeneratedColumn({ name: 'regi_cd_id'})
    id: number;

    @ManyToOne(() => Aluno, aluno => aluno.id)
    @JoinColumn({ name: 'alun_cd_id'})
    aluno: Aluno;

    @ManyToOne(() => Agenda, agenda => agenda.id)
    @JoinColumn({ name: 'agen_cd_id'})
    agenda: Agenda;

    @Column({ name: 'regi_tx_conteudo', type: 'mediumtext'})
    conteudo: string;

    @Column({ name: 'regi_in_visualizado' })
    visualizado: boolean;

    @Column({ name: 'regi_dt_visualizacao', nullable: true })
    dataVisualizacao: Date;
}