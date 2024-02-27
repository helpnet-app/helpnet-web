export interface VerificationRequest {
  verificationCode: string;
}

export interface Certificate {
  verificationCode: string;
  program: string;
  volunteer: string;
}
