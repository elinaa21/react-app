export const required = (value: string): string|undefined => 
    value ? undefined : 'required!'

export const maxLength25 = (value: string): string|undefined => 
    value.length > 25 ? 'max length is 25 sybmols' : undefined

export const minLength4 = (value: string): string|undefined => 
    value.length < 4 ? 'min length is 4 sybmols' : undefined


export const alphaNumeric = (value: string): string|undefined =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only latin characters'
        : undefined

export const matchPassword = (value: string, allValues: Record<string,string>): string|undefined =>
    value !== allValues.password
        ? 'This field must match with your password field'
        : undefined;
      