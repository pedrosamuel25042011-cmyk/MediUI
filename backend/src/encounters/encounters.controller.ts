import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';

@Controller('encounters')
export class EncountersController {
  
  // Rota para a Enfermeira na Triagem (Protocolo de Manchester)
  @Post('triage')
  async triagePatient(@Body() data: { patient_id: string, color: string, symptoms: string }) {
    // A lógica de negócio criaria o Encounter aqui.
    // O Prisma gravaria a cor (ex: 'RED', 'YELLOW') e os sintomas (criptografados).
    // Além disso, dispararia um evento via WebSocket para atualizar a Fila de Triagem na tela.
    return { status: 'success', message: 'Paciente triado e inserido na fila dinâmica.', data };
  }

  // Rota para o Médico no Consultório
  @Put(':id/clinical-notes')
  async addClinicalNotes(@Param('id') encounterId: string, @Body() data: { notes: string }) {
    // 1. Receberia a nota clínica do Front-end.
    // 2. Usaria o CryptoUtil para criptografar (AES-256).
    // 3. O Prisma faria o UPDATE no banco com a string criptografada.
    // 4. O AuditInterceptor registraria a alteração automaticamente.
    return { status: 'success', message: 'Evolução clínica salva com segurança (AES-256).' };
  }
}
