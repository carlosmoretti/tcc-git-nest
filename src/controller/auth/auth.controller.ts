/* eslint-disable prettier/prettier */
import { InternoAuthService } from './../../service/auth/interno.auth.service';
import { ResponsavelAuthService } from './../../service/auth/responsavel.auth.service';
import { Put, Req } from '@nestjs/common';
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
    ) {}

    @Post('interno')
    loginInterno(@Body() req) {
        return this.internoAuthService.login(
            req.login,
            req.senha,
            RoleEnum.Interno,
        );
    }

    @Post('responsavel')
    login(@Body() req) {
        return this.responsavelAuthService.login(
            req.login,
            req.senha,
            RoleEnum.Responsavel,
        );
    }

    @Put('refresh')
    refreshToken(@Req() request: Request) {
        return this.responsavelAuthService.refresh(request);
    }

    @Post('trocasenha')
    async trocaSenha() {
        await this.internoAuthService.redefinicaoSenha('carlosmoretti2019@gmail.com', 'Carlos Moretti');
    }
}
