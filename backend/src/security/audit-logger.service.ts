import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLoggerService {
  private logtailClient: any;

  constructor() {
    const token = process.env.LOGTAIL_SOURCE_TOKEN;
    if (token) {
      const { Logtail } = require('@logtail/node');
      this.logtailClient = new Logtail(token);
    }
  }

  async logAudit(action: string, userId: string, details: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      userId,
      details,
    };

    console.log('[AUDIT_LOG]', JSON.stringify(logEntry));

    if (this.logtailClient) {
      await this.logtailClient.info(`[AUDIT] ${action}`, logEntry);
    }
  }
}
