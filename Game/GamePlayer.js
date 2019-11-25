import { gameJob } from './GameJob.js';
import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native'
import { WebView } from 'react-native-webview';
import LoadingPage from './LoadingPage.js';

// 


function isAllow(request, prop) {
  // Only allow navigating within this website
  console.log(request)
  if (prop.blockNavigate) {
    window.request = request
    function getLocation(href) {
      var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
      return match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
      }
    }
    window.test = request
    let location = getLocation(prop.game_url)
    let protocol = location["protocol"]
    let host = location["host"]
    let prefiex = protocol + "//" + host
    // console.log(prefiex)
    // if (!request.url.startsWith(prefiex))
    //   NativeTool.open("https://apps.apple.com/us/app/tangram-blocks/id1487427064?l=zh&ls=1")
    return request.url.startsWith(prefiex);
  } else {
    // if (request.mainDocumentURL != prop.game_url) return false
    return true
  }
}

function onError(syntheticEvent, webview) {
  const { nativeEvent } = syntheticEvent;
// if (syntheticEvent.code == -1009) {
  // setState("fail")
  Alert.alert(
    '连线错误', 
    '无法连接服务器，请检查你的网路连线并再试一次。', 
    [
      {text: '请重试', onPress: () => webview.reload(), style: 'cancel' },
    ]
  );
// }
}

export default function GamePlayer(prop) {

  const [state, setState] = useState("loading");

  // useEffect(() => {
  //   Alert.alert(state)
  // });

  return <View style={{flex: 1}}>
    <View style={{flex: state=="fail"?10000:0, display: state=="fail"?"flex":"none"}}>
    <LoadingPage style={{flex: 0, flexGrow: 0, justifyContent: "center"}} /> 
    </View>
    
    <WebView
      style={{flex: 1, flexGrow: 1}}

      // source of game
      source={{ uri: prop.game_url }}

      // allow get local bundle game
      originWhitelist={["*"]}
      

      // require use WebKit for iOS App
      useWebKit={true}

      // disable scroll
      scrollEnabled={false}

      // always play sound in the game
      allowsInlineMediaPlayback={true}

      // always play sound in the game
      mediaPlaybackRequiresUserAction={false}


      // expose this reference of this node
      ref={ref => (webview = ref)}


      // confirm the url is valid
      onShouldStartLoadWithRequest={
        request => { return isAllow(request, prop) }
      }

      // webview javascript injector
      onLoad={
        window.gameJob.bind(this.webview)
      }

      // check the Internet is on
      onError={ 
        syntheticEvent => { onError(syntheticEvent, this.webview); setState("fail") }
      }

      onLoadEnd={
        syntheticEvent => { setState("end") }
      }

    />
  </View>
}