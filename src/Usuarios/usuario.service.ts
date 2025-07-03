import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';


@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: CriaUsuarioDTO): Promise<any> {
    const hash = await bcrypt.hash(user.senha, 10);
    return this.prisma.user.create({
      data: {
        name: user.nome,
        email: user.email,
        password: hash,
      },
    });
  }

  async FindAll(): Promise<Omit<CriaUsuarioDTO, 'senha'>[]> {

    const users = await this.prisma.user.findMany();
    return users.map(user => ({
      nome: user.name,
      email: user.email,
    }));
  }

  async existecomEmail(email: string): Promise<boolean> {
    const possivelUsuario = await this.prisma.user.findUnique({
      where: { email },
    });
    return !!possivelUsuario;
  }
}
