import { HistoricotrocasenhaService } from './../../service/historicotrocasenha/historicotrocasenha.service';
import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
/* eslint-disable prettier/prettier */
import { InternoAuthService } from './../../service/auth/interno.auth.service';
import { ResponsavelAuthService } from './../../service/auth/responsavel.auth.service';
import { Get, Param, Put, Query, Req } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../../config/public.config';
import { RoleEnum } from '../../model/enums/roles.enum';
import { Request } from 'express';

@Controller('auth')
@Public()
export class AuthController {
    constructor(
        private responsavelAuthService: ResponsavelAuthService,
        private internoAuthService: InternoAuthService,
        private historicoTrocaSenhaService: HistoricotrocasenhaService
    ) {}

    @Post('interno')
    public async loginInterno(@Body() req) {
        return await this.internoAuthService.login(
            req.login,
            req.senha,
            RoleEnum.Interno,
        );
    }

    @Post('responsavel')
    public async login(@Body() req) {
        return await this.responsavelAuthService.login(
            req.login,
            req.senha,
            RoleEnum.Responsavel,
        );
    }

    @Put('refresh/interno')
    refreshTokenInterno(@Req() request: Request) {
        return this.internoAuthService.refresh(request);
    }

    @Put('refresh/responsavel')
    refreshTokenResponsavel(@Req() request: Request) {
        return this.responsavelAuthService.refresh(request);
    }

    @Post('trocarsenha')
    async trocaSenha(@Body() obj: any) {
        await this.historicoTrocaSenhaService.redefinicaoSenha(obj.email, obj.modulo);
    }

    @Get('trocasenha/:id')
    async trocaSenhaGet(@Param('id') id: number) {
        console.log(id);
        return await this.historicoTrocaSenhaService.get(id);
    }

    @Post('trocasenha/:id/confirmar')
    async confirmaTrocaSenha(@Param('id') id: number, @Body() item: any) {
        const modulo = await this.historicoTrocaSenhaService.defineSenha(id, item);

        return {
            modulo
        }
    }
}
