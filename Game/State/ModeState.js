import { config } from '../config.js';
import React, { useState, useEffect } from 'react';
import ReactNative, { AsyncStorage } from 'react-native';
import requestLeanCloud from '../InfoTrigger.js';
import Orientation from 'react-native-orientation';

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

export default function useModeState() {
  const [state, setState] = useState("");

  const locale = ReactNative.NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
  if (locale == "zh_CN") {
    requestLeanCloud((value) => {
      setState(value)
      save(value)
    }, () => {
      getFlag(function(value) {
        if (value) {
          setState(value)
        } else {
          setState("")
        }
        
      })
    })
  }

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

  return state
}