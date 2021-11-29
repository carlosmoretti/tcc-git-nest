/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ConfiguracaoService } from './../configuracao/configuracao.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService  {

    constructor(public configuracaoService: ConfiguracaoService) {
    }

    async init() {
        const sendgridConfig = await this.configuracaoService.getByNome('sendgrid_api');
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(sendgridConfig.valor);
        return sgMail;
    }

    async enviar(titulo: string, corpoHtml: string, destino: string) {
        return this.enviarMultiploRecipiente(titulo, corpoHtml, [destino]);
    }

    async enviarMultiploRecipiente(titulo: string, corpoHtml: string, destino: string[]) {
        const sgMail = await this.init();
        const origemEmail = await this.configuracaoService.getByNome('email_aplicacao');

        const message = {
            to: destino,
            from: origemEmail.valor,
            subject: titulo,
            html: corpoHtml,
            isMultiple: true
        };

        await sgMail.send(message)
            .then(() => {
                console.log("enviado");
            }).catch((error) => {
                console.log(error);
            })
    }
}
