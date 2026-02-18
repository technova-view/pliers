import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function AtLeastOneField(
  fields: string[],
  validationOptions?: ValidationOptions,
): ClassDecorator {
  return function (constructor: Function) {
    registerDecorator({
      name: 'AtLeastOneField',
      target: constructor,
      propertyName: '_atLeastOneField', // <- dummy property to satisfy typing
      constraints: [fields],
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const [fields] = args.constraints;
          const obj = args.object as any;

          return fields.some((field: string) => {
            const value = obj[field];
            return value !== undefined && value !== null && value !== '';
          });
        },
        defaultMessage(args: ValidationArguments) {
          const [fields] = args.constraints;
          return `At least one of the following fields must be provided: ${fields.join(', ')}`;
        },
      },
    });
  };
}
