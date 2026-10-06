import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { GoogleService } from './google.service';
import { DocuSignService } from './docusign.service';
import { DailyService } from './daily.service';
import { EventsGateway } from './events.gateway';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly googleService: GoogleService,
    private readonly docuSignService: DocuSignService,
    private readonly dailyService: DailyService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get('status')
  getIntegrationsStatus() {
    return {
      supabase: 'CONNECTED',
      webSockets: 'ACTIVE',
      dailyCo: 'ACTIVE',
      googleApi: 'ACTIVE',
      docuSign: 'ACTIVE',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('telemedicina/room')
  async createRoom(@Body() body: { roomName: string }) {
    return this.dailyService.createTelemedicineRoom(body.roomName || `consulta-${Date.now()}`);
  }

  @Post('docusign/sign-prescription')
  async signPrescription(@Body() body: { email: string; name: string; details: string }) {
    return this.docuSignService.createEnvelopeForPrescription(
      body.email,
      body.name,
      body.details,
    );
  }

  @Get('google/auth-url')
  getGoogleAuthUrl() {
    return { url: this.googleService.getAuthUrl() };
  }

  @Post('notifications/broadcast')
  broadcastEvent(@Body() body: { title: string; message: string; channel: string }) {
    this.eventsGateway.handleNotification(body);
    return { success: true };
  }
}
