import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição mal formada.' })
  @ApiBody({
    type: CriaUsuarioDTO,
    description: 'Dados do usuário a ser criado',
  })
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioCriado = await this.usuariosService.create(dadosDoUsuario);
    return usuarioCriado;
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários retornados com sucesso.',
    type: [CriaUsuarioDTO],
  })
  async listUsuarios() {
    return await this.usuariosService.FindAll();
  }
}
