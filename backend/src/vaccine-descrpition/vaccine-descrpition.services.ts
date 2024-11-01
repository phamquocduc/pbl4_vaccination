import { Injectable } from "@nestjs/common";
import { VaccinedescrpitionRepository } from "./vaccine-descrpition.repository";
import { VaccineCreateDto } from "src/vaccine/dto/vaccinae-create.dto";
import { VaccineDescription } from "./vaccine-descrpition.entity";
import { VaccineDescriptionUpdateDto } from "./dto/vaccine-description-update.dto";

@Injectable()
export class VaccinedescrpitionServices{
    constructor(
        private vaccinedescrpitionRepository: VaccinedescrpitionRepository
    ){}

    async create(): Promise<VaccineDescription>{

        return await this.vaccinedescrpitionRepository.create()
    }

    async update(id: number, updateDto: VaccineDescriptionUpdateDto): Promise<VaccineDescription>{

        return await this.vaccinedescrpitionRepository.update(id, updateDto)
    }

    async delete(id: number){
        await this.vaccinedescrpitionRepository.delete(id)
    }
}
