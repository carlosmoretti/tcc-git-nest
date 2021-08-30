/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/model/enums/roles.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
