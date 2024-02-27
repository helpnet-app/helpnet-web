import { VolunteerToCreateDto } from "../dtos/volunteer/VolunteerToCreateDto";
import { Volunteer } from "../entities/Volunteer";


export default class VolunteerService {

    async create(data: VolunteerToCreateDto): Promise<Volunteer> {
        console.log(data);
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/volunteers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
<<<<<<< Updated upstream
            body: JSON.stringify({data})
=======
            body: JSON.stringify(data)
>>>>>>> Stashed changes
        })
        const responseJSON = await response.json();
        console.log(responseJSON.status);
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

}