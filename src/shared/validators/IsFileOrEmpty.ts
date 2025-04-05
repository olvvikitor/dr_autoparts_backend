import { registerDecorator, ValidationOptions ,ValidationArguments} from 'class-validator';

export function IsFileOrEmpty(validationoptions?:ValidationOptions){
  return function (object:Object, propertyName:string){
    registerDecorator({
      name: 'isFileOrEmpty',
      target: object.constructor,
      propertyName: propertyName,
      options:validationoptions,
      validator:{

        //se n existir arquivo, deixa passar
        validate(value: any, args: ValidationArguments){
          if(!value || value.size === 0){
            return true
          }
          //valida se é um arquivo inválido
           return value && typeof value === 'object' && 'originalname' in value
        },
        defaultMessage():string{
          return 'tipo de arquivo inválido'
        }
      }
    })
  }
  }
