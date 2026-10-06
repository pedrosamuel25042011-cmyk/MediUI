import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyService {
  private apiKey: string;
  private baseUrl = 'https://api.daily.co/v1';

  constructor() {
    this.apiKey = process.env.DAILY_API_KEY || 'demo_daily_key';
  }

  async createTelemedicineRoom(roomName: string) {
    // Retorna URL de sala de vídeo chamada Daily.co para telemedicina
    const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hora
    return {
      name: roomName,
      url: `https://erp-hospitalar.daily.co/${roomName}`,
      privacy: 'public',
      created_at: new Date().toISOString(),
      config: { exp },
    };
  }
}
