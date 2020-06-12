export const cn = (block: string, elem = '', mod?: Record<string, string | boolean>): string => {
    let result = block;

    if (elem.length) {
        result += '__' + elem;
    }

    if (mod) {
        return Object.keys(mod).reduce((final, key) => {
            if (typeof(mod[key]) === 'boolean' && mod[key]) {
                return final + ' ' + result + '_' + key;
            }

            return final + ' ' + result + '_' + key + '_' + mod[key];
        }, result)
    }

    return result;
}
