import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UsuarioModule } from './Usuarios/usuario.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuarioModule, PrismaModule, AuthModule],
})
export class AppModule {}
