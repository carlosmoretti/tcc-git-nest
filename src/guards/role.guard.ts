/* eslint-disable prettier/prettier */
import { ExcecaoGenerica } from './../exceptions/excecaoGenerica.exception';
import { Logger, CanActivate, Injectable, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from '../model/enums/roles.enum';
import { IS_PUBLIC_KEY } from 'src/config/public.config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(public reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (this.isPublic(context)) return true;

        const usuarioAutenticado = this.isUsuarioAutenticado(context);

        if (!usuarioAutenticado)
            throw new ExcecaoGenerica(
                'Você não tem acesso a este recurso',
                HttpStatus.FORBIDDEN,
            );

        return usuarioAutenticado;
    }

    private isUsuarioAutenticado(context: ExecutionContext) {
        const roles = this.reflector
            .getAllAndOverride<RoleEnum[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ])
            .map((e) => e.toString());

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return roles.includes(user.role);
    }

    private isPublic(context: ExecutionContext) {
        const publicKey = IS_PUBLIC_KEY;
        const isPublic = this.reflector.getAllAndOverride<boolean>(publicKey, [
            context.getHandler(),
            context.getClass(),
        ]);

        return isPublic;
    }
}
