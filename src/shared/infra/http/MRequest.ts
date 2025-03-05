import { Role } from 'src/modules/users/enums/role.enum';

export class MRequest extends Request {
  user?: { id: number; name: string, role:Role }; // Adicionando um usuário autenticado
}