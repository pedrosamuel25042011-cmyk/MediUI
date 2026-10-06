import { Module } from '@nestjs/common';
import { IntegrationsModule } from './integrations/integrations.module';
import { SecurityModule } from './security/security.module';
import { AiModule } from './ai/ai.module';
import { BedsController } from './beds/beds.controller';
import { EncountersController } from './encounters/encounters.controller';

@Module({
  imports: [IntegrationsModule, SecurityModule, AiModule],
  controllers: [BedsController, EncountersController],
  providers: [],
})
export class AppModule {}
