import { Program } from "../entities/Program";


export default class ProgramService {

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