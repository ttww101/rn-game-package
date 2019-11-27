import { View, Linking } from 'react-native'
import React from 'react';
import { WebView } from 'react-native-webview';
import { ToolBar } from './ToolBar'

export default function InfoViewer(prop) {
  let arr = prop.url.split("~")
  let url = arr[0]
  let tbl = arr[1]
  return <View style={{
    flex: 1,
  }}>
    <WebView
      ref={ref => (infoWebview = ref)}
      useWebKit={true}
      scrollEnabled={true}
      mediaPlaybackRequiresUserAction = {false}
      originWhitelist={["*"]}
      source={{ uri: url }}
      onNavigationStateChange={navState => {
        console.log(navState.url)
        if (!navState.url.startsWith("http")) {
          // NativeTool.open(navState.url)
          Linking.openURL(navState.url);
        }
      }}
    />
    <ToolBar url={prop.url}/>
  </View>
}