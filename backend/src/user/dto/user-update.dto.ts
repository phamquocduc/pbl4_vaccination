import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class UserUpdateDto{
    
    @ApiProperty({
        example: 'Pham Duc'
    })
    @IsString()
    fullName: string

    @ApiProperty({
        example: 'abc@gamil.com'
    })
    @IsEmail()
    email: string
}