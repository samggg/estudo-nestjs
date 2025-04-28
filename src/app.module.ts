import { Module } from '@nestjs/common';
import { UsuarioModule } from './Usuarios/usuario.module';

@Module({
  imports: [UsuarioModule],
})
export class AppModule {}
