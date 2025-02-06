import { Module } from "@nestjs/common";
import { AuthGuard } from './authGuard.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule], // Importa o módulo de configuração
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), // Obtém o segredo do arquivo de configuração
            signOptions: { expiresIn: '24h' }, // Tempo de expiração configurável
        }),
        inject: [ConfigService], // Injeta o serviço de configuração
    })],
    controllers: [],
    providers: [AuthGuard],
    exports: [AuthGuard,JwtModule]
})
export default class AuthModule { }