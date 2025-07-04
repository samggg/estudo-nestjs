import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsuarioService } from "../Usuarios/usuario.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, senha } = loginDto;

        const usuario = await this.usuarioService.findByEmail(email);
        if (!usuario) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha inválida');
        }

        const payload = { email: usuario.email, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}