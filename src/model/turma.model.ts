/* eslint-disable prettier/prettier */
import { JoinColumn } from 'typeorm';
import { Interno } from './interno.model';
import { Aluno } from './aluno.model';
import { Column, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from "typeorm";

@Entity({ name: 'turma'})
export class Turma {

    @PrimaryGeneratedColumn({ name: 'turm_cd_id'})
    id: number;

    @Column({ name: 'turm_tx_matricula' })
    matricula: string;

    @Column({ name: 'turm_tx_nome'})
    nome: string;

    @ManyToOne(() => Interno, interno => interno.id, { eager: true })
    @JoinColumn({ name: 'inte_cd_id'})
    professorResponsavel: Interno;

    @ManyToMany(() => Aluno, (alun) => alun.turmas, { eager: true, cascade: true })
    @JoinTable({
        name: 'turma_aluno',
        joinColumn: { name: 'turm_cd_id'},
        inverseJoinColumn: { name: 'alun_cd_id'}
    })
    alunos: Aluno[];
}