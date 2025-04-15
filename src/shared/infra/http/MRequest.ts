import { Role } from '@prisma/client';
import { Request } from 'express';

export class MRequest extends Request {
  user?: { id: number; name: string, role:Role }; // Adicionando um usuário autenticado
}