export const required = (value: string): string|undefined => {
    if (value) return undefined;
    return 'required!';
}

export const maxLength25 = (value: string): string|undefined => {
    if (value.length > 25) return 'max length is 30 sybmols';
    return undefined;
}

export const minLength4 = (value: string): string|undefined => {
    if (value.length < 4) return 'min length is 4 sybmols';
    return undefined;
}

export const alphaNumeric = (value: string): string|undefined =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only latin characters'
    : undefined