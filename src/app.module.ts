import { Module } from '@nestjs/common';
import { UsuarioModule } from './Usuarios/usuario.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuarioModule, PrismaModule],
})
export class AppModule {}
