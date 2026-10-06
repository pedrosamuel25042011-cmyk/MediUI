import { Injectable } from '@nestjs/common';

@Injectable()
export class DlpService {
  async maskSensitiveData(text: string): Promise<string> {
    try {
      const projectId = process.env.GOOGLE_PROJECT_ID;
      if (!projectId) {
        // Fallback para mascarar CPF, telefone ou dados sensíveis (Máscara LGPD)
        return text.replace(/(\d{3})\.\d{3}\.\d{3}-(\d{2})/g, '$1.***.***-$2');
      }

      // Google Cloud DLP Client
      const { DlpServiceClient } = require('@google-cloud/dlp');
      const dlpClient = new DlpServiceClient();

      const request = {
        parent: `projects/${projectId}`,
        deidentifyConfig: {
          infoTypeTransformations: {
            transformations: [
              {
                primitiveTransformation: {
                  characterMaskConfig: {
                    maskingCharacter: '*',
                    numberToMask: 0,
                  },
                },
              },
            ],
          },
        },
        item: { value: text },
      };

      const [response] = await dlpClient.deidentifyContent(request);
      return response.item?.value || text;
    } catch (error) {
      console.error('Erro na anonimização LGPD:', error);
      return text;
    }
  }
}
