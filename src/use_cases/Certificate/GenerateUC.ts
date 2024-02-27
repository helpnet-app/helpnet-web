import { ProgramToCreateDto } from "../../dtos/program/ProgramToCreateDto";
import { Certificate } from "../../entities/Cerfiticate";
import CertificateService from "../../services/CertificateService";

export default class GenerateUC {

   private certificateService: CertificateService;

   constructor(certificateService: CertificateService) {
      this.certificateService = certificateService
   }

   async execute(id_prog: string, id_vol:string): Promise<Uint8Array> {

      const generatedCertificate = await this.certificateService.generateCertificate(id_prog, id_vol);

      return generatedCertificate;
   }

}