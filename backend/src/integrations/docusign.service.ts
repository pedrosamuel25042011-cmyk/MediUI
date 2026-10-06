import { Injectable } from '@nestjs/common';
import * as docusign from 'docusign-esign';

@Injectable()
export class DocuSignService {
  private apiClient: docusign.ApiClient;

  constructor() {
    this.apiClient = new docusign.ApiClient();
    this.apiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH || 'https://demo.docusign.net/restapi');
  }

  async createEnvelopeForPrescription(signerEmail: string, signerName: string, prescriptionDetails: string) {
    const accessToken = process.env.DOCUSIGN_ACCESS_TOKEN || 'demo_token';
    this.apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);

    const env = new docusign.EnvelopeDefinition();
    env.emailSubject = 'Assinatura de Prescrição Médica Eletrônica';

    const doc = new docusign.Document();
    doc.documentBase64 = Buffer.from(`PRESCRIÇÃO MÉDICA\n\nPaciente: ${signerName}\n\nDetalhes:\n${prescriptionDetails}`).toString('base64');
    doc.name = 'Prescricao_Medica.pdf';
    doc.fileExtension = 'pdf';
    doc.documentId = '1';

    env.documents = [doc];

    const signer = docusign.Signer.constructFromObject({
      email: signerEmail,
      name: signerName,
      recipientId: '1',
      routingOrder: '1',
    });

    const signHere = docusign.SignHere.constructFromObject({
      documentId: '1',
      pageNumber: '1',
      recipientId: '1',
      tabLabel: 'SignHereTab',
      xPosition: '200',
      yPosition: '300',
    });

    const tabs = docusign.Tabs.constructFromObject({
      signHereTabs: [signHere],
    });
    signer.tabs = tabs;

    const recipients = docusign.Recipients.constructFromObject({
      signers: [signer],
    });
    env.recipients = recipients;
    env.status = 'sent';

    return { envelopeId: 'demo-envelope-12345', status: 'sent', recipient: signerEmail };
  }
}
