/* eslint-disable prettier/prettier */
import { TurmaService } from './../../service/turma/turma.service';
import { Controller, Get, Head, Req, UseGuards, Headers } from '@nestjs/common';
import { Turma } from 'src/model/turma.model';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/service/auth/auth.service';
import { Interno } from 'src/model/interno.model';
import { InternoAuthService } from 'src/service/auth/interno.auth.service';

@Controller('turma')
@Public()
export class TurmaController extends ControllerBase<Turma> {
    constructor(public service: TurmaService, public authService: InternoAuthService) {
        super(service);
    }
    
    @Get('/professor')
    public async getTurmaPorSession(@Headers('Authorization') token: string) {
        const usuario = await this.authService.getByToken(token.split(' ')[1]);
        return await this.service.getTurmaByProfessor(usuario.id);
    }
}
