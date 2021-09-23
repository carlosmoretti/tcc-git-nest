/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn } from 'typeorm';
import { Responsavel } from './responsavel.model';
import { Entity, ChildEntity, Column, BaseEntity, ManyToMany, JoinColumn, ManyToOne, JoinTable } from 'typeorm';
import { Pessoa } from './pessoa.model';

@Entity({ name: 'aluno' })
export class Aluno {

    @PrimaryGeneratedColumn({ name: 'alun_cd_id' })
    id: number;

    @Column({ name: 'alun_tx_matricula' })
    matricula: string;

    @ManyToMany(() => Responsavel, (resp) => resp.alunos)
    responsavel: Responsavel[];

    @Column({ name: 'alun_dt_nascimento'})
    dataNascimento!: Date;

    @Column({ name: 'alun_tx_nome' })
    nome: string;

    @Column({ name: 'alun_tx_sobrenome' })
    sobrenome: string;

    @Column({ name: 'alun_dt_inclusao'})
    dataInclusao: Date;
}