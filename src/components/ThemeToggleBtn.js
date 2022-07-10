import React, { useState, useEffect } from "react";
// import "../../src/App.css";
import { ReactComponent as MoonIcon } from "../assets/svg/moon.svg";
import { ReactComponent as SunIcon } from "../assets/svg/sun.svg";
import { useSelector, useDispatch } from 'react-redux' ;
import * as selectors from '../store/selectors' ;


const ThemeToggleBtn = (funcs ,colormodesettle) => {
  const [isEnabled, setIsEnabled] = useState(()=>{
    const saved = localStorage.getItem("settleThemeMode") ;
    const initialValue = JSON.parse(saved) ;
    return initialValue  ;
    // return saved ;
  }) ;
  useEffect(()=>{
    // console.log('togglebutton mode' ,isEnabled) ;
  },[]) ;
  const dispatch = useDispatch();
  const toggleState = () => {
    setIsEnabled(!isEnabled);
    // console.log(fucns,'colormode') ;
    // console.log(isEnabled , 'colormode') ;
    // 
    const ts = colormodesettle.ColorMode ;
    // console.log('this is fals' ,funcs.colormodesettle ,'dsfs', funcs.colormodesettle.ColorMode) ;
    funcs.funcs.setColorModeFunc(!funcs.colormodesettle.ColorMode) ;
    funcs.colormodesettle.ColorMode = ! funcs.colormodesettle.ColorMode ;

    localStorage.setItem("settleThemeMode" , JSON.stringify(!funcs.colormodesettle.ColorMode)) ;
    // localStorage.setItem("settleThemeMode" , true) ;
  };
  const isChanging=()=>{
    // console.log(isEnabled);
    // setIsEnabled(!isEnabled);
  }

  return (
   <>
    <label className="toggle-wrapper" htmlFor="toggle" >
      {/* {console.log(JSON.parse(localStorage.getItem("settleThemeMode")) , isEnabled)} */}
      <div className={`toggle ${(JSON.parse(localStorage.getItem("settleThemeMode"))) ? "enabled" : "disabled"}`} >
        {/* <span className="hidden"> */}
          {/* {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"} */}
        {/* </span> */}
        <div className="icons icon_color_svg" >
          <SunIcon />
          <MoonIcon />
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isEnabled}
          onClick={toggleState}
          onChange={isChanging}
        />
      </div>
    </label>
   </>
  );
}

export default ThemeToggleBtn ;