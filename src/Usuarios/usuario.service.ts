import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}
  private users: CriaUsuarioDTO[] = [];

  async create(user: CriaUsuarioDTO): Promise<void> {
    return this.prisma.user.create({
      data: {
        name: user.nome,
        email: user.email,
        password: user.senha,
      },
    });
  }

  async FindAll(): Promise<CriaUsuarioDTO[]> {
    return this.prisma.user.findMany();
  }

  async existecomEmail(email: string) {
    const possivelUsuario = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (possivelUsuario) {
      return true;
    }
    return false;
  }
}
