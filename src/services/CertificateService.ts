import { Certificate, VerificationRequest } from "../entities/Cerfiticate";

export default class CertificateService {

    async verify(verificationCode: VerificationRequest): Promise<Boolean> {
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/certificate/verify`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(verificationCode)
        })
        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 201) throw new Error(responseJSON.message);
        return responseJSON;
    }

    async generateCertificate(id_prog: string, id_vol:string): Promise<Uint8Array> {
        
        const response = await fetch(`https://helpnet-api-1.onrender.com/certificate/${id_prog}/${id_vol}/generate`)

        const responseJSON = await response.json();
        const responseStatus = response.status;
        if (responseStatus !== 201) throw new Error(responseJSON.message);
        return responseJSON;
    }

}