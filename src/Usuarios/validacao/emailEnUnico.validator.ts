import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint } from "class-validator";
import { ValidatorConstraintInterface } from "class-validator/types/validation/ValidatorConstraintInterface";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint({ name: 'emailEhUnico', async: true })
export class emailEhUnico implements ValidatorConstraintInterface {

    constructor(private readonly usuarioService: UsuarioService) { }

    async validate(value: any, validateArgs: any): Promise<boolean> {
        const usuarioExist = await this.usuarioService.findByEmail(value);
        if (usuarioExist) {
            return false;
        }
        return true;
    }
}

export const emailEhUnicoValidator = (opcoesDeValidacao: ValidationOptions) => {
    return (obj: Object, propriedade: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: emailEhUnico
        })
    }
}