import React from 'react';
interface RadioButtonProps {
    forInput: string;
    checked: boolean;
    name: string;
    classNameButton: string;
    onChange: (a: string) => void;
}
declare const RadioButtonInput: React.FC<RadioButtonProps>;
export default RadioButtonInput;
