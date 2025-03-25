import { Inject, Injectable } from '@nestjs/common';
import { IMessage } from './IMessage';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class TwilioProvider implements IMessage {
  constructor(@Inject() private configService: ConfigService, private twilioService:TwilioService) {

  }

  async sendMessage(message: string, para: string): Promise<any> {
    return await this.twilioService.client.messages.create({
      to: `whatsapp:${+5575983633860}`, // Use o parâmetro dinâmico
      body: message,
      from: 'whatsapp:+14155238886',
    }).then(message => console.log(message.sid));
  }
}
