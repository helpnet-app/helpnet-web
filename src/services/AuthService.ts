import { Auth } from "../entities/Auth";

export default class AuthService {

    async login(username: string, password: string): Promise<Auth> {
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 201) throw new Error(responseJSON.message);
        return responseJSON;
    }

}