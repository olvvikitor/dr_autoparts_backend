import { Role } from 'src/modules/users/entities/enums/role.enum';

export class MRequest extends Request {
  user?: { id: number; name: string, role:Role }; // Adicionando um usuário autenticado
}