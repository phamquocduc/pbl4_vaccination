import { IsEmail, IsString, MinLength } from "class-validator"
import { ERelationship } from "src/enums/relationship.enum";

export class VaccinationProfileBaseCreateDto{

    @IsString()
    fullName: string; 

    @IsString()
    relationship: ERelationship; 

    @IsEmail()
    email: string;
}