declare class LCrypt {
    constructor(key: string);
    encode(value: string): string;
    decode(payload: string): string;
}

export default LCrypt;