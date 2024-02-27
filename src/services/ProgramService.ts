import { ProgramToCreateDto } from "../dtos/program/ProgramToCreateDto";
import { Application, Questions } from "../entities/Application";
import { Program } from "../entities/Program";
import { Volunteer } from "../entities/Volunteer";

export default class ProgramService {
    async create(data: ProgramToCreateDto, id_org: string): Promise<Program> {
        const response = await fetch(
        `https://helpnet-api-1.onrender.com/programs/${id_org}/create`,
        {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        );
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 201) throw new Error(responseJSON.message);
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

    async fetchAllProgramsByVolId(id_vol: string): Promise<Program[]> {
        const response = await fetch(
        `https://helpnet-api-1.onrender.com/programs/applied/${id_vol}`
        );

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async fetchAllAplicationsByVolId(id_vol: string): Promise<Application[]> {
        const response = await fetch(
        `https://helpnet-api-1.onrender.com/programs/applied/${id_vol}`
        );

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async applyToProg(id_prog: string,id_vol: string,questions: Questions): Promise<Program> {
        const response = await fetch(
        `https://helpnet-api-1.onrender.com/programs/${id_prog}/${id_vol}/apply`,
        {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(questions),
        }
        );
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 201) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async fetchAllApplicationsByProgram(id_prog: string): Promise<Volunteer[]> {
        const response = await fetch(
            `https://helpnet-api-1.onrender.com/programs/${id_prog}/applications`
        );

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async startProg(id_prog: string): Promise<Program> {
        const response = await fetch(`https://helpnet-api-1.onrender.com/programs/${id_prog}/start`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async finishProg(id_prog: string): Promise<Program> {
        const response = await fetch(`https://helpnet-api-1.onrender.com/programs/${id_prog}/finish`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async deleteProg(id_prog: string): Promise<Program> {
        const response = await fetch(`https://helpnet-api-1.onrender.com/programs/${id_prog}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

}