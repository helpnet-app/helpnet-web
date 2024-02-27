import { Certificate, VerificationRequest } from "../../entities/Cerfiticate";
import CertificateService from "../../services/CertificateService";

export default class VerifyUC {

   private certificateService: CertificateService;

   constructor(certificateService: CertificateService) {
      this.certificateService = certificateService
   }

   async execute(verificationRequest: VerificationRequest): Promise<Certificate> {

      const verifiedCertificate = await this.certificateService.verify(verificationRequest);

      return verifiedCertificate;
   }

}