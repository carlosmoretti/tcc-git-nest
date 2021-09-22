/* eslint-disable prettier/prettier */
import { WhatsAppConst } from './../../whatsapp.constant';
import { Injectable } from "@nestjs/common";

@Injectable()
export class WhatsAppService {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    client = require('twilio')(WhatsAppConst.accountSid, WhatsAppConst.authToken);

    enviar(numero, mensagem): void {    
        return this.client.messages.create({
            body: mensagem,
            from: 'whatsapp:' + WhatsAppConst.from,
            to: 'whatsapp:' + numero
        });
    }
}