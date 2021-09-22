import { Responsavel } from './../../model/responsavel.model';
import { MensagensConst } from './../../mensagem.const';
import { jwtConstants } from './../../constants';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { ServiceBase } from '../service';
import { WhatsAppService } from '../whatsapp/whatsapp.service';

@Injectable()
export class ResponsavelService extends ServiceBase<Responsavel> {
    constructor(
        private whatsappService: WhatsAppService,
        @InjectRepository(Responsavel)
        public repository: Repository<Responsavel>,
    ) {
        super(repository);
    }

    async create(resp: Responsavel) {
        resp.senha = await bcrypt.hash(resp.senha, jwtConstants.bcrypt_salts);
        await this.whatsappService.enviar("+5521969416765", MensagensConst.confirmacaoCriacaoContaWhatsApp);
        super.create(resp);
    }

    async update(obj: Responsavel) {
        obj.senha = await bcrypt.hash(obj.senha, jwtConstants.bcrypt_salts);
        super.update(obj);
    }
}
