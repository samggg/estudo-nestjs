/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuariosRepository: UsuarioRepository) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' }) // Descrição da operação
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição mal formada.' })
  criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    this.usuariosRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários retornados com sucesso.',
    type: [CriaUsuarioDTO],
  })
  listUsuarios() {
    return this.usuariosRepository.listar();
  }
}
