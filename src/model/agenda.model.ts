/* eslint-disable prettier/prettier */
import { Registro } from './registro.model';
import { Interno } from './interno.model';
import { PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, Entity, OneToMany } from 'typeorm';
import { Turma } from './turma.model';

@Entity({ name: 'agenda' })
export class Agenda {
    
    @PrimaryGeneratedColumn({ name: 'agen_cd_id' })
    id: number;

    @ManyToOne((e) => Turma, turma => turma.id, { eager: true })
    @JoinColumn({ name: 'turm_cd_id' })
    turma: Turma;

    @ManyToOne((e) => Interno, interno => interno.id, { eager: true })
    @JoinColumn({ name: 'inte_cd_id'})
    professor: Interno;

    @Column({ name: 'agen_dt_inclusao'})
    dataEscrita: Date;

    @OneToMany(() => Registro, registro => registro.agenda, { cascade: true, eager: false })
    registros: Registro[];
}