import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) { }

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
    return {
      usuario: new ListaUsuarioDTO(usuarioCriado.id_user, usuarioCriado.name),
      message: 'Usuário criado com sucesso',
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários retornados com sucesso.',
    type: [CriaUsuarioDTO],
  })
  async listUsuarios() {
    const usuariosSalvos = await this.usuariosService.FindAll();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(usuario.id_user, usuario.nome)
    );
    return {
      message: 'Lista de usuários',
      usuarios: usuariosLista,
    }
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  async atualizaUsuario(@Param('id') id: string, @Body() dadosDoUsuario: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuariosService.update(id, dadosDoUsuario);

    return {
      usuario: new ListaUsuarioDTO(usuarioAtualizado.id_user, usuarioAtualizado.nome),
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete(':id')
  async deletaUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuariosService.delete(id);
    return {
      usuario: usuarioDeletado,
      message: `Usuário deletado com sucesso`,
    };
  }
}
