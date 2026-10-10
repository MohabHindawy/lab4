function LogClass(constructor: Function) {
  console.log('decorator called for:', constructor.name);
}

function Readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, { writable: false });
}

function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Method "${propertyKey}" called with:`, args);
    return original.apply(this, args);
  };
}

function LogParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number,
) {
  console.log(`decorator for "${propertyKey}" at index ${parameterIndex}`);
}

@LogClass // calls the log class when the example class is created
class Example {
  @Readonly // turns the appName to readonly once its initialized
  appName: string = 'MyApp';

  @LogMethod // calls LogMethod wwhen the great function is called
  greet(@LogParameter name: string) {
    console.log(`Hello, ${name}!`);
  }
}

const e = new Example();
e.greet('Donia');
e.appName = 'Updated';


