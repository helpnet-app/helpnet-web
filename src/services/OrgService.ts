import { Org } from "../entities/Org"


export default class OrgService {

    async create(data: Org): Promise<Org> {
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/companies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
                phone: data.phone,
                whatsapp: data.whatsapp,
                cep: data.cep,
                city: data.city,
                country: data.country,
                district: data.district,
                houseNumber: data.houseNumber,
                state: data.state,
                tra
                
            })
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 200) throw new Error(responseJSON.message);
        return responseJSON;
    }

}