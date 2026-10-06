import { Controller, Get, Patch, Param, Body } from '@nestjs/common';

@Controller('beds')
export class BedsController {

  @Get()
  async getBedMap() {
    // Busca todos os leitos no Prisma e faz um JOIN (include) com Encounter e Patient
    // para descobrir quem está ocupando.
    // Essa rota seria chamada pelo Next.js Server Component na tela de Mapa de Leitos.
    return { status: 'success', data: [] }; // Mock
  }

  @Patch(':id/status')
  async updateBedStatus(@Param('id') bedId: string, @Body() data: { status: string }) {
    // Atualiza o status do leito (ex: OCCUPIED -> CLEANING após uma alta).
    // Dispara via RabbitMQ / WebSockets para atualizar todos os monitores do hospital em tempo real.
    return { status: 'success', message: 'Status do leito atualizado para limpeza.' };
  }
}
