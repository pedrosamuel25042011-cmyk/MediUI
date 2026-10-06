import { Module } from '@nestjs/common';
import { DlpService } from './dlp.service';
import { AuditLoggerService } from './audit-logger.service';
import { VirusScanService } from './virus-scan.service';
import { KmsService } from './kms.service';

@Module({
  providers: [DlpService, AuditLoggerService, VirusScanService, KmsService],
  exports: [DlpService, AuditLoggerService, VirusScanService, KmsService],
})
export class SecurityModule {}
