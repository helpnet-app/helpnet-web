import { Volunteer } from "../entities/Volunteer";


export default class VolunteerService {

    async create(data: Volunteer): Promise<Volunteer> {
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/volunteers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

}