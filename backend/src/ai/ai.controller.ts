import { Controller, Post, Body, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('ai')
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('summarize')
  async summarizeNotes(@Body() body: { notes: string }) {
    const summary = await this.geminiService.summarizeMedicalNotes(body.notes || 'Paciente relatando dor moderada em recuperação.');
    return { status: 'success', summary };
  }

  @Post('evaluate-priority')
  async evaluatePriority(@Body() body: { clinicalData: string }) {
    const result = await this.geminiService.evaluateBedPriority(body.clinicalData || 'Paciente com febre e falta de ar moderada.');
    return { status: 'success', data: result };
  }

  @Get('optimization-plan')
  async getOptimizationPlan() {
    const plan = await this.geminiService.getHospitalOptimizationPlan();
    return { status: 'success', plan };
  }
}
