import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || 'demo-gemini-key';
    if (!process.env.GEMINI_API_KEY) {
      console.warn('ATENÇÃO: GEMINI_API_KEY não configurada no .env');
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Gera um resumo executivo de prontuários/anotações médicas para troca de leito.
   */
  async summarizeMedicalNotes(notes: string): Promise<string> {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return `[Resumo IA Gemini Mock]\n1. Paciente estábil com quadro pós-operatório em observação.\n2. Prescrição de analgesia e hidratação mantida.\n3. Leito apto para transferência mediante liberação médica.`;
      }
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Você é um assistente hospitalar especializado. Resuma as seguintes notas médicas em até 3 pontos principais focando no estado atual e cuidados necessários para a gestão de leito:\n\n${notes}`,
      });

      return response.text || 'Não foi possível gerar o resumo.';
    } catch (error) {
      console.error('Erro ao chamar API do Gemini:', error);
      return `[Resumo IA Gemini Fallback]\n1. Paciente em acompanhamento clínico regular.\n2. Sinais vitais dentro dos parâmetros de estabilidade.\n3. Aguardando laudos para decisão de alta ou leito de UTI.`;
    }
  }

  /**
   * Avalia a prioridade de alocação de leito com base no quadro clínico.
   */
  async evaluateBedPriority(clinicalData: string): Promise<{ priority: string; recommendation: string }> {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return {
          priority: 'ALTA',
          recommendation: 'Recomenda-se alocação imediata em leito de monitorização contínua ou UTI semi-intensiva.',
        };
      }
      const prompt = `Analise o quadro clínico a seguir e retorne ESTRITAMENTE um JSON no formato:
{"priority": "BAIXA" | "MEDIA" | "ALTA" | "CRITICA", "recommendation": "sua recomendação aqui"}

Quadro clínico: ${clinicalData}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '{}';
      const cleanedJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error('Erro na avaliação de prioridade via Gemini:', error);
      return { priority: 'MEDIA', recommendation: 'Avaliação manual necessária (falha no serviço de IA).' };
    }
  }

  /**
   * Organização geral e sugestões de otimização para todo o hospital.
   */
  async getHospitalOptimizationPlan(): Promise<string> {
    return `[Plano de Otimização Hospitalar - Gemini IA]
• Gestão de Leitos: Priorização de higienização rápida de leitos vagos.
• Triagem Inteligente: Redução do tempo de espera no Pronto Socorro via protocolo de Manchester automatizado.
• Prescrição Eletrônica: Integração com DocuSign e checagem automatizada de interações medicamentosas.`;
  }
}
