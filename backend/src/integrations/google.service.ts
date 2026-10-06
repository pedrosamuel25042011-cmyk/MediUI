import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleService {
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || 'your-client-id',
      process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/google',
    );
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  getCalendarClient(tokens: any) {
    this.oauth2Client.setCredentials(tokens);
    return google.calendar({ version: 'v3', auth: this.oauth2Client });
  }
}
