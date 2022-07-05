import React from 'react'
import { AppContext } from "../context";
import RadioButtonInput from './radioButtonInput';
import { ORIENTATION } from '../conts/enums';
import { Types } from "../reducers";

const SettingUI: React.FC = () => {
    const { state, dispatch  } = React.useContext(AppContext);

    let orientations = [
        ORIENTATION.BOTTOM,
        ORIENTATION.RIGHT
    ]
    let onChangeRadioF = (changed:string)=>{
        dispatch({
            type:Types.CHANGE_LAYOUT_ORIENTATION, 
            payload:ORIENTATION.RIGHT
        });
    }

    let mapData = orientations.map((orientation)=>{
        let checked = state.pageProps.orientation === orientation;
        return <RadioButtonInput key={orientation} forInput={orientation} checked={checked} name="orientation" onChange={onChangeRadioF} classNameButton="" hideInput={false}></RadioButtonInput>
    });

    return (
        <div id="PopUpUiContainer">
            <span id="closeSettings">x</span>
            <h2>Settings</h2>
            <div>
                {mapData}
            </div>
            <hr></hr>
        </div>
    );
};

export default SettingUI;