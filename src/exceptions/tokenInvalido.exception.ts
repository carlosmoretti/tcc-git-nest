/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenInvalidoException extends HttpException {
    constructor() {
        super('Sessão inválida para esta requisição.', HttpStatus.FORBIDDEN);
    }
}
