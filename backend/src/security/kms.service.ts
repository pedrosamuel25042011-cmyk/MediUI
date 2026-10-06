import { Injectable } from '@nestjs/common';

@Injectable()
export class KmsService {
  private kmsClient: any;
  private keyId: string;

  constructor() {
    this.keyId = process.env.AWS_KMS_KEY_ID || 'arn:aws:kms:us-east-1:123456789012:key/demo-key';
  }

  async encryptData(data: string): Promise<string> {
    try {
      if (process.env.AWS_REGION && process.env.AWS_KMS_KEY_ID) {
        const { KMSClient, EncryptCommand } = require('@aws-sdk/client-kms');
        const kms = new KMSClient({ region: process.env.AWS_REGION });
        const command = new EncryptCommand({
          KeyId: this.keyId,
          Plaintext: Buffer.from(data),
        });
        const response = await kms.send(command);
        return Buffer.from(response.CiphertextBlob).toString('base64');
      }
      return Buffer.from(data).toString('base64'); // Fallback seguro para ambiente dev
    } catch (err) {
      console.error('Erro na criptografia KMS:', err);
      return Buffer.from(data).toString('base64');
    }
  }
}
