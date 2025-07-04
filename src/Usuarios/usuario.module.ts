import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { emailEhUnico } from './validacao/emailEnUnico.validator';

@Module({
  imports: [PrismaModule],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService, emailEhUnico],
})
export class UsuarioModule {}
