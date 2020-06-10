export const required = (value: string): string|undefined => {
    if (value) return undefined;
    return 'required!';
}

export const maxLength30 = (value: string): string|undefined => {
    if (value.length > 30) return 'max length is 30 sybmols';
    return undefined;
}