import React, { FC, ReactNode } from "react";
import type { MathJax3Config, MathJax3Object, OptionList } from "../MathJax3";
export declare type TypesettingFunction = "tex2chtml" | "tex2chtmlPromise" | "tex2svg" | "tex2svgPromise" | "tex2mml" | "tex2mmlPromise" | "mathml2chtml" | "mathml2chtmlPromise" | "mathml2svg" | "mathml2svgPromise" | "mathml2mml" | "mathml2mmlPromise" | "asciimath2chtml" | "asciimath2chtmlPromise" | "asciimath2svg" | "asciimath2svgPromise" | "asciimath2mml" | "asciimath2mmlPromise";
export interface MathJaxOverrideableProps {
    hideUntilTypeset?: "first" | "every";
    typesettingOptions?: {
        fn: TypesettingFunction;
        options?: Omit<OptionList, "display">;
    };
    renderMode?: "pre" | "post";
}
export declare type MathJaxSubscriberProps = ({
    version: 3;
    promise: Promise<MathJax3Object>;
}) & MathJaxOverrideableProps;
export declare const MathJaxBaseContext: React.Context<MathJaxSubscriberProps | undefined>;
interface MathJaxContextStaticProps extends MathJaxOverrideableProps {
    onLoad?: () => void;
    onError?: (error: any) => void;
    children?: ReactNode;
}
export declare type MathJaxContextProps = ({
    config?: MathJax3Config;
    version?: 3;
    onStartup?: (mathJax: MathJax3Object) => void;
}) & MathJaxContextStaticProps;
declare const MathJaxContext: FC<MathJaxContextProps>;
export default MathJaxContext;
