import { gameJob } from './GameJob.js';
import React from 'react';
import { NativeModules } from 'react-native'
import { WebView } from 'react-native-webview';

export default function GamePlayer(prop) {
  return <WebView
    ref={ref => (webview = ref)}
    useWebKit={true}
    scrollEnabled={false}
    mediaPlaybackRequiresUserAction={false}
    allowsInlineMediaPlayback={true}
    originWhitelist={["*"]}
    source={{ uri: prop.game_url }}
    onShouldStartLoadWithRequest={
      (request) => {
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
    }
    onLoad={window.gameJob.bind(this.webview)}
  />
}