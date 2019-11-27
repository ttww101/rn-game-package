import { TouchableOpacity, Image, View, Alert } from 'react-native'
import React from 'react';

function BarButton(prop) {
  return <TouchableOpacity onPress={prop.onPress}>
    <Image source={prop.source} style={{ width: 40, height: 40 }} />
  </TouchableOpacity>
}
  
export function ToolBar(prop) {

    let arr = prop.url.split("~")
  let url = arr[0]
  let tbl = arr[1]
  let action1 = () => infoWebview.injectJavaScript("location.href='" + infoWebview.props.source.uri + "'")
  let action2 = () => this.infoWebview.goBack()
  let action3 = () => this.infoWebview.goForward()
  let action4 = () => this.infoWebview.reload()
  let action5 = () => {
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

  let actions = [
    action1,
    action2,
    action3,
    action4,
    action5
  ]


  let json = JSON.parse(tbl)
  let btns = []
  console.log(json)
  for (let i=0; i<json.trigger.length; ++i) {
    let actionIndex = json.action[i]
    let triggerBase64 = json.trigger[i]
    let action = actions[actionIndex]

    let btn = (
      <BarButton onPress= { action }
        source={{ uri: triggerBase64}}
      />
    )

    btns.push(btn)
  }


  return <View style={{
    height: 50, 
    justifyContent: "space-around", 
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: "#EFEFF4"
  }}>
    {btns}
  </View>
}