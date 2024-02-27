import { ProgramToCreateDto } from "../dtos/program/ProgramToCreateDto";
import { Questions } from "../entities/Application";
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

    async fetchAllByOrgId(id_org: string): Promise<Program[]> {
        const response = await fetch(
            `https://helpnet-api-1.onrender.com/programs/organization/${id_org}`
        );

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async fetchAllByVolId(id_vol: string): Promise<Program[]> {
        const response = await fetch(
            `https://helpnet-api-1.onrender.com/programs/applied/${id_vol}`
        );

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async applyToProg(id_prog: string, id_vol: string, questions: Questions): Promise<Program> {
        
        console.log(questions);
        console.log(id_vol);
        console.log(id_prog);
        const response = await fetch(`https://helpnet-api-1.onrender.com/programs/${id_prog}/${id_vol}/apply`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questions)
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

}