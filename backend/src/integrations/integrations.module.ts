import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { GoogleService } from './google.service';
import { DocuSignService } from './docusign.service';
import { DailyService } from './daily.service';
import { EventsGateway } from './events.gateway';
import { IntegrationsController } from './integrations.controller';

@Module({
  controllers: [IntegrationsController],
  providers: [
    SupabaseService,
    GoogleService,
    DocuSignService,
    DailyService,
    EventsGateway,
  ],
  exports: [
    SupabaseService,
    GoogleService,
    DocuSignService,
    DailyService,
    EventsGateway,
  ],
})
export class IntegrationsModule {}
