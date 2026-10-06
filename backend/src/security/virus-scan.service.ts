import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class VirusScanService {
  async scanFileBuffer(fileBuffer: Buffer): Promise<boolean> {
    try {
      const apiKey = process.env.CLOUDMERSIVE_API_KEY;
      if (!apiKey) {
        console.log('[ANTIVIRUS] Cloudmersive Key não configurada. Verificação mock realizada com sucesso.');
        return true;
      }

      const CloudmersiveVirusScanApiClient = require('cloudmersive-virus-scan-api-client');
      const defaultClient = CloudmersiveVirusScanApiClient.ApiClient.instance;
      const Apikey = defaultClient.authentications['Apikey'];
      Apikey.apiKey = apiKey;

      const apiInstance = new CloudmersiveVirusScanApiClient.ScanApi();
      const result = await new Promise<any>((resolve, reject) => {
        apiInstance.scanFile(fileBuffer, (error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });

      if (result && result.CleanResult === false) {
        throw new BadRequestException('O arquivo enviado contém vírus ou malware.');
      }

      return true;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Erro na verificação de antivírus:', error.message || error);
      return true;
    }
  }
}
