import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vaccine } from "./vaccine.entity";
import { VaccineCreateDto } from "./dto/vaccinae-create.dto";
import { VaccineDescription } from "src/vaccine-descrpition/vaccine-descrpition.entity";
import { VaccineUpdateDto } from "./dto/vaccine-update.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";

@Injectable()
export class VaccineRepository{
    constructor(
        @InjectRepository(Vaccine)
        private vaccineRepository: Repository<Vaccine>
    ){}

    async findAll(): Promise<Vaccine[] | null>{
        return await this.vaccineRepository.find({
            relations: { description: true }
        })
    }

    async findOneById(id: number): Promise<Vaccine | null>{
        const vaccine = await this.vaccineRepository.findOne({
            where: {id: id},
            relations: { description: true }
        })

        if(!vaccine)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINE_NOT_EXIT), HttpStatus.BAD_REQUEST)

        return vaccine
    }

    async getVaccineDescriptionId(id: number): Promise<number | null>{
        const vaccine = await this.vaccineRepository.findOne({
            where: {id: id},
            relations: { description: true }
        })

        if(!vaccine)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINE_NOT_EXIT), HttpStatus.BAD_REQUEST)

        return vaccine.description.id
    }

    async create(createDto: VaccineCreateDto, vaccinaDescription: VaccineDescription): Promise<Vaccine>{
        const newVaccine = this.vaccineRepository.create({
            ...createDto,
            description: vaccinaDescription
        })

        return await this.vaccineRepository.save(newVaccine)
    }

    async update(id: number, updateDto: VaccineUpdateDto): Promise<Vaccine>{
        const vaccine = await this.vaccineRepository.findOne({
            where: { id: id }
        })

        if(!vaccine)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINE_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(vaccine, updateDto)

        return await this.vaccineRepository.save(vaccine)
    }

    async delete(id: number): Promise<any>{
        await this.vaccineRepository.delete(id)

        return {
            message: 'Delete suscessfully'
        }
    }
}