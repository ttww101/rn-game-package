import { View, Linking } from 'react-native'
import React from 'react';
import { WebView } from 'react-native-webview';
import { ToolBar } from './ToolBar'

export default function InfoViewer(prop) {
  return <View style={{
    flex: 1,
  }}>
    <WebView
      ref={ref => (infoWebview = ref)}
      useWebKit={true}
      scrollEnabled={true}
      mediaPlaybackRequiresUserAction = {false}
      originWhitelist={["*"]}
      source={{ uri: prop.url }}
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