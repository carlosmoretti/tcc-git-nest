/* eslint-disable prettier/prettier */
import { Aluno } from './aluno.model';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from "typeorm";

@Entity({ name: 'turma'})
export class Turma {
    @PrimaryGeneratedColumn({ name: 'turm_cd_id'})
    id: number;

    @Column({ name: 'turm_tx_matricula' })
    matricula: string;

    @ManyToMany(() => Aluno, (alun) => alun.turmas, { eager: true, cascade: true })
    @JoinTable({
        name: 'turma_aluno',
        joinColumn: { name: 'turm_cd_id'},
        inverseJoinColumn: { name: 'alun_cd_id'}
    })
    alunos: Aluno[];
}