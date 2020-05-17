export class Ultis { }

export function isRealValue(value: string | number | object): boolean {

  if (typeof value === 'string') {
    return value && value.trim() === '';
  }
  if (typeof value === 'number') {
    return (value == 0) || !isNaN(value);
  }
  if (typeof value === "object") {
    if (!isArray(value)) {
      return value !== null || value !== undefined;
    }
    else return isArrayHasValue(value);
  }
}


export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isArrayHasValue(value: any): boolean {
  return isArray && value.length > 0;
}
