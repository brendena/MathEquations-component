export enum ORIENTATION {
    BOTTOM = 'r',
    RIGHT = 'w'
}

export enum MathTypes {
    LaTEX = "LaTEX",
    MathML = "MathML",
    AsciiMath = "AsciiMath"
}


//don't really like this
export const ListMathTypes : Array<MathTypes> = [MathTypes.LaTEX, MathTypes.MathML, MathTypes.AsciiMath]