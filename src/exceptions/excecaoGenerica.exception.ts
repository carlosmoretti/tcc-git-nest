/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export class ExcecaoGenerica extends HttpException {
    constructor(mensagem: string, status: HttpStatus) {
        super(mensagem, status);
    }
}
