import { UserToCreateDto } from '../user/UserToCreateDto';

export interface OrganizationToCreateDto extends UserToCreateDto {
  tradeName: string;
  CNPJ: string;
}
