import { AlunoService } from './../../service/aluno/aluno.service';
import { Controller } from '@nestjs/common';
import { Aluno } from '../../model/aluno.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';

@Controller('aluno')
@Roles(RoleEnum.Responsavel)
export class AlunoController extends ControllerBase<Aluno> {
    constructor(public service: AlunoService) {
        super(service);
    }
}
