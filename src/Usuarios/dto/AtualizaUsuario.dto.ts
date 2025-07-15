import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { emailEhUnicoValidator } from '../validacao/emailEnUnico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  @IsOptional()
  nome: string;

  @IsEmail(undefined, {message: 'O email informado é inválido'})
  @emailEhUnicoValidator({message: 'Já existe um usuário cadastrado com este email'})
  @IsOptional()
  email: string;

  @MinLength(6, {message: 'A senha precisa ter pelo menos 6 caracteres'})
  @IsOptional()
  senha: string;
}