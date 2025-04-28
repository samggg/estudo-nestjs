import { Injectable } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioRepository {
  private users: CriaUsuarioDTO[] = [];

  salvar(user: CriaUsuarioDTO): void {
    this.users.push(user);
  }

  listar(): CriaUsuarioDTO[] {
    return this.users;
  }
}
