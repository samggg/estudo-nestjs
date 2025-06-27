import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { emailEhUnicoValidator } from '../validacao/emailEnUnico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({message: 'O nome não pode ser vazio'})
  nome: string;

  @IsEmail(undefined, {message: 'O email informado é inválido'})
  @emailEhUnicoValidator({message: 'Já existe um usuário cadastrado com este email'})
  email: string;

  @MinLength(6, {message: 'A senha precisa ter pelo menos 6 caracteres'})
  senha: string;
}