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
    let onChangeRadioF = (changedOrientation:ORIENTATION)=>{
        dispatch({
            type:Types.CHANGE_LAYOUT_ORIENTATION, 
            payload:changedOrientation
        });
    }

    let mapData = orientations.map((orientation)=>{
        let checked = state.pageProps.orientation === orientation;
        return <RadioButtonInput key={orientation} forInput={orientation} checked={checked} name="orientation" onChange={()=>{onChangeRadioF(orientation)}} classNameButton="" hideInput={false}></RadioButtonInput>
    });



    let closeSettings = ()=>{
        dispatch({
            type:Types.CHANGE_SETTINGS_HIDE, 
            payload: true
        });
    }

    let hideStyles = {};
    if(state.pageProps.hideSettingsUI)
    {
        hideStyles={"bottom":"-100%","transition-timing-function":"ease-in"}
    }


    return (
        <div id="PopUpUiContainer" style={hideStyles}>
            <span id="closeSettings" onClick={closeSettings}>x</span>
            <h2>Settings</h2>
            <div>
                <span>UI orientation: </span>
                {mapData}
            </div>
            <hr></hr>
        </div>
    );
};

export default SettingUI;