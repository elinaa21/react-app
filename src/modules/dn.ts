export const dn = (from: string, to: string): string => {
    return from < to ? `${from}-${to}` : `${to}-${from}`;
}
