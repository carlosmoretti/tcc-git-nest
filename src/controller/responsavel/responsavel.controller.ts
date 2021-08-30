import { ResponsavelService } from './../../service/responsavel/responsavel.service';
import { Controller } from '@nestjs/common';
import { Responsavel } from 'src/model/responsavel.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';

@Controller('responsavel')
@Roles(RoleEnum.Interno)
export class ResponsavelController extends ControllerBase<Responsavel> {
    constructor(public service: ResponsavelService) {
        super(service);
    }
}
