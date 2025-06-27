import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 409, description: 'Usuário já existe.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 422, description: 'Erro de validação.' })
  @ApiResponse({ status: 503, description: 'Serviço indisponível.' })
  @ApiResponse({ status: 408, description: 'Tempo limite da requisição excedido.' })
  @ApiResponse({ status: 429, description: 'Muitas requisições.' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição mal formada.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: CriaUsuarioDTO,
  })
  criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    this.usuariosService.create(dadosDoUsuario);
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
    return this.usuariosService.FindAll();
  }
}
