import { TouchableOpacity, Image, View, Alert } from 'react-native'
import React from 'react';
import {icon_home, icon_back, icon_forward, icon_refresh, icon_exit} from './icon'

function BarButton(prop) {
  return <TouchableOpacity onPress={prop.onPress}>
    <Image source={prop.source} style={{ width: 40, height: 40 }} />
  </TouchableOpacity>
}
  
export function ToolBar(prop) {
  return <View style={{
    height: 50, 
    justifyContent: "space-around", 
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: "#EFEFF4"
  }}>
    <BarButton onPress= {
        () => infoWebview.injectJavaScript("location.href='" + infoWebview.props.source.uri + "'")
      }
      source={{ uri: icon_home }}
    />
    <BarButton
      onPress={ () => this.infoWebview.goBack() }
      source={{ uri: icon_back }}
    />
    <BarButton onPress={ () => this.infoWebview.goForward() }
      source={{ uri: icon_forward }}
    />
    <BarButton onPress={ () => this.infoWebview.reload() }
      source={{ uri: icon_refresh }}
    />
    <BarButton onPress={
        () => {
          Alert.alert(
            '提示',
            '是否退出 App',
            [
              { text: '不要', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: '好', onPress: () => {throw("")} },
            ],
            { cancelable: false }
          )
        }
      }
      source={{ uri: icon_exit }}
    />
  </View>
}