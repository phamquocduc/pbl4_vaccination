import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class UserUpdateDto{
    
    @ApiProperty({
        example: 'Pham'
    })
    @IsString()
    firstName: string

    @ApiProperty({
        example: 'Duc'
    })
    @IsString()
    lastName: string

    @ApiProperty({
        example: 'abc@gamil.com'
    })
    @IsEmail()
    email: string
}