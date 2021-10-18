/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { SENDGRID_API, ORIGEM_EMAIL_API } from './../../config/sendgrid.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService  {

    init() {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(SENDGRID_API);
        return sgMail;
    }

    enviar(titulo: string, corpoHtml: string, destino: string) {
        const sgMail = this.init();

        const message = {
            to: destino,
            from: ORIGEM_EMAIL_API,
            subject: titulo,
            html: corpoHtml
        };

        sgMail.send(message)
            .then(() => {
                console.log("enviado");
            }).catch((error) => {
                console.log(error);
            })
    }
}
