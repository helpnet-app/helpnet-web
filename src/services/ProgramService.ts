import { ProgramToCreateDto } from "../dtos/program/ProgramToCreateDto";
import { Program } from "../entities/Program";


export default class ProgramService {

    async create(data: ProgramToCreateDto, id_org: string): Promise<Program> {
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/programs/${id_org}/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async fetchAll(): Promise<Program[]> {
        const response = await fetch(
            `https://helpnet-api-1.onrender.com/programs/`
        );

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

}