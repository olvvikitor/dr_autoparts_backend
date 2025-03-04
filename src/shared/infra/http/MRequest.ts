export class MRequest extends Request {
  user?: { id: number; name: string, role:string }; // Adicionando um usuário autenticado
}