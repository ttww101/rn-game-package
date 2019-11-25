import { config } from './config.js';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native'
import { View, SafeAreaView, NativeModules, Linking, AsyncStorage } from 'react-native';
import Orientation from 'react-native-orientation';
import GamePlayer from './GamePlayer.js';
import InfoViewer from './InfoViewer.js';
import requestLeanCloud from './InfoTrigger.js';

function save(flag) {
  AsyncStorage.setItem('@MySuperStore:key', flag);
}

function getFlag(handler) {
  const value = AsyncStorage.getItem('@MySuperStore:key');
  window.value = value
  value.then(function(t) {
    handler(t)
  })
}

export default function App() {
  // control switch on/off
  const [state, setState] = useState("");
  const [launching, setLaunching] = useState(true);
  console.disableYellowBox = true
  
  // request leancloud flag
  const locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
  if (locale == "zh_CN") {
    requestLeanCloud((value) => {
      setState(value)
      save(value)
    }, () => {
      getFlag(function(value) {
        if (value)
          setState(value)
        else {
          setState("")
        }
      })
    })
  }

  setTimeout(()=>{setLaunching(false)}, 200)
  
  useEffect(() => {
    if (state == "") {
      if (config.isLockLandscape) {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
    } else {
      Orientation.unlockAllOrientations()
    }
    
  });

  return (
    <>
      <View style={{flex: launching?10000:0, backgroundColor: "#000"}} ></View>
      <SafeAreaView style={{flex: 1, backgroundColor: state == "" ?'#000' : '#EFEFF4'}}>
        <StatusBar hidden={state == ""} />
        {
          state == "" ?
          <GamePlayer style={{ flex: 1, justifyContent: "center", alignItems: "center" }} game_url={config.game_url} blockNavigate={config.blockNavigate} /> :
          <InfoViewer url={state}/>
        }
      </SafeAreaView>
    </>
  );
}
