export enum ORIENTATION {
    BOTTOM = 'bottom',
    RIGHT = 'right'
}

export enum MathTypes {
    LaTEX = "LaTEX",
    MathML = "MathML",
    AsciiMath = "AsciiMath"
}


//don't really like this
export const ListMathTypes : Array<MathTypes> = [MathTypes.LaTEX, MathTypes.MathML, MathTypes.AsciiMath]