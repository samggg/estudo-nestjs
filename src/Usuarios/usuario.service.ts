import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
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
        id_user: uuidv4(),
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
      id_user: user.id_user ?? '',
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

  async update(id_user: string, atualizaDados: Partial<CriaUsuarioDTO>): Promise<UsuarioRespostaDTO> {
    if (!id_user) {
      throw new BadRequestException('id_user é obrigatório');
    }

    const possivelUsuario = await this.prisma.user.findUnique({
      where: { id_user },
    });

    if (!possivelUsuario) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const user = await this.prisma.user.update({
      where: { id_user },
      data: {
        name: atualizaDados.nome,
        email: atualizaDados.email,
        password: atualizaDados.senha ? await bcrypt.hash(atualizaDados.senha, 10) : undefined,
      },
    });

    return {
      id: user.id,
      id_user: user.id_user ?? '',
      nome: user.name,
      email: user.email,
    };
  }

  async delete(id_user: string): Promise<UsuarioRespostaDTO> {
    if (!id_user) {
      throw new BadRequestException('id_user é obrigatório');
    }

    const usuario = await this.prisma.user.findUnique({
      where: { id_user },
    });

    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado');
    }

    await this.prisma.user.delete({
      where: { id_user },
    });

    return {
      id: usuario.id,
      id_user: usuario.id_user ?? '',
      nome: usuario.name,
      email: usuario.email,
    };
  }

}
