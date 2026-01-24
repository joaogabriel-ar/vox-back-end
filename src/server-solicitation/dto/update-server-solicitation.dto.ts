import { PartialType } from '@nestjs/mapped-types';
import { CreateServerSolicitationDto } from './create-server-solicitation.dto';

export class UpdateServerSolicitationDto extends PartialType(
  CreateServerSolicitationDto,
) {}