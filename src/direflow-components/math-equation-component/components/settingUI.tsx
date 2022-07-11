import React, { useContext } from 'react'
import { EventContext } from 'direflow-component';
import { AppContext } from "../context";
import RadioButtonInput from './radioButtonInput';
import { ORIENTATION } from '../conts/enums';
import { Types } from "../reducers";

const SettingUI: React.FC = () => {
    const { state, dispatch  } = React.useContext(AppContext);
    const webComponentDispatch = useContext(EventContext);

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

    let mapOrientationData = orientations.map((orientation)=>{
        let checked = state.pageProps.orientation === orientation;

        console.log(checked)
        console.log(state.pageProps.orientation)
        console.log("-----------------------" + orientation)

        return <RadioButtonInput key={orientation} forInput={orientation} checked={checked} name="orientation" onChange={()=>{onChangeRadioF(orientation)}} classNameButton="" hideInput={false}></RadioButtonInput>
    });

    console.log(mapOrientationData)



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

    
    let changeSettings = ()=>{
        const event = new CustomEvent('math-equation-gen-save', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail : {
                "orientation":state.pageProps.orientation
            }
        });
        webComponentDispatch(event);
    }

    return (
        <div id="PopUpUiContainer" style={hideStyles}>
            <span id="closeSettings" onClick={closeSettings}>x</span>
            <h2>Settings <button id="saveSettingsButton" onClick={changeSettings}>Save</button> </h2>
            <div>
                <span>UI orientation: </span>
                {mapOrientationData}
            </div>
            <hr></hr>
        </div>
    );
};

export default SettingUI;