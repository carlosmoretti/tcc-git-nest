import { HistoricotrocasenhaService } from 'src/service/historicotrocasenha/historicotrocasenha.service';
import { EmailService } from './../../service/email/email.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [EmailService, HistoricotrocasenhaService],
    exports: [EmailService, HistoricotrocasenhaService],
})
export class SharedModule {}
