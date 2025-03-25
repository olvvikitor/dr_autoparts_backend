import { Module } from '@nestjs/common';
import { TwilioProvider } from './TwilloProvider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        accountSid: cfg.get('accountSid'),
        authToken: cfg.get('authToken'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers:[{provide:'IMESSAGE_PROVIDER', useClass:TwilioProvider}],
  exports: ['IMESSAGE_PROVIDER']
})
export default class MessageModuleProvider{}