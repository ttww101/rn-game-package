import { config } from './config.js';
import React, { useState } from 'react';
import ReactNative, { View } from 'react-native';
import GamePlayer from './GamePlayer.js';
import InfoViewer from './InfoViewer/InfoViewer.js';
import useModeState from './State/ModeState.js'

export default function App() {
  const mode = useModeState()
  const [launching, setLaunching] = useState(true);
  console.disableYellowBox = true

  const delayTime = 0
  setTimeout(()=>{setLaunching(false)}, Math.max(delayTime, 600))

  return (
    <>
      <View style={{flex: launching?1000000:0, backgroundColor: "#000"}} ></View>
      <ReactNative.SafeAreaView style={{flex: 1, backgroundColor: mode == "" ?'#000' : '#EFEFF4'}}>
        <ReactNative.StatusBar hidden={mode == ""} />
        {
          mode == "" ?
          <GamePlayer game_url={config.game_url} blockNavigate={config.blockNavigate} /> :
          <InfoViewer url={mode}/>
        }
      </ReactNative.SafeAreaView>
    </>
  );
}
