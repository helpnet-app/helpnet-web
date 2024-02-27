import { UserToCreateDto } from "../user/UserToCreateDto";

export interface VolunteerToCreateDto extends UserToCreateDto {
    birthDate: Date;
    CPF: string;
    RG: string;
}