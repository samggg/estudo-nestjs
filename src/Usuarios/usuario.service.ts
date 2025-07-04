import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRespostaDTO } from './dto/UsuarioResposta.dto';


@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) { }
  async create(user: CriaUsuarioDTO): Promise<any> {
    const userExists = await this.findByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('Usuário já existe com este email');
    }
    const hash = await bcrypt.hash(user.senha, 10);
    return this.prisma.user.create({
      data: {
        name: user.nome,
        email: user.email,
        password: hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async FindAll(): Promise<UsuarioRespostaDTO[]> {

    const users = await this.prisma.user.findMany();
    return users.map(user => ({
      id: user.id,
      nome: user.name,
      email: user.email,
    }));
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

}
