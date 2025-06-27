import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { emailEhUnico } from './validacao/emailEnUnico.validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, emailEhUnico],
})
export class UsuarioModule {}
