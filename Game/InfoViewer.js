import { TouchableOpacity, Image, View, Alert, Linking } from 'react-native'
import React from 'react';
import { WebView } from 'react-native-webview';

function BarButton(prop) {
  return <TouchableOpacity onPress={prop.onPress}>
    <Image source={prop.source} style={{ width: 40, height: 40 }} />
  </TouchableOpacity>
}

function ToolBar(prop) {
  var icon_home = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAqFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADFB06jAAAAN3RSTlMA7c7yJ/rfM2b+0w8YDPQ1OkQUgKmEb9sCB0oBXYu5/K5lCEuTHKfqBr8KviO4oyIb6Yr7ZJL9YmRKugAAAVlJREFUaN7tmHtXgjAchq3EzcosEkvsfs/K7u37f7MQBmcMPLDtt86h8z7/KA7flzP2MI+9HgAAAAC6SBz7zT8Jzi995k+HQgwPvcXPT0XKzbGf/Ic7Ibm48pE/OhMFjzv0+bubQmH7ljq/P8iSgyB7HfRp88f3We5efLCVvdvYp8xXU8fvsuuaUi91Xl6PsiM65VZ6pXf2rXy/iZTL9RJPxdocvQg65Qq9VLtqP3TU67t0sfMPIuXWT/f0h0K5Z7lgPr+alparXk1yuOtV2++oXPMcuCmn62W2Bmz0ql3FtsrNJvKLkxnRiet2L9Z0KrPZ5ZTdq32BgXK5XoYFrZXL9TIuaKlcrpdFgZly3KSAW4j2xwUh0wiJC7jQ4Cj4pwURT4g8FrBqJApQgIIOFKQPh4SlXrCUA5FjQRlW2ea1Rx8KulVQ+aGSsFgNLGoGQvxdCgAAAADP/AJVt96RX7QzvwAAAABJRU5ErkJggg==';
  var icon_back = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAVFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACn9Kj9AAAAG3RSTlMAUgKcS/j6M2aZnRSuUfvCye1WVTrK7hU5k5LvK55oAAAA7ElEQVRo3u2Y2Q6CMBQFUdzqvm/9//8UkaX4YnvNJJCceeBxBiS0t2aZEEIIIYToFSvYP3nA/qmD/d7BfjTw9pOB0g8GPn4uMJp5NFD7qUDjhwKtnwkEfiQQ+onApvLn5XW3+MXxZrv/fOwjuZ5t/iw24C82f3xgm+5fFv74gLf5gUD4+xTMI1inBLr3H4dLCFj8SYFqA+ACpoLr1Uv+fgbgO+gWiAC+VNgWuz28XB/u7IZzSp7w6zfNbfphgRlbggI0eLUFanRsCtjwWxeGO77zBxD+CMUfAvljLH8QLwrPof8ZIoQQQggh/uUFQYhRWwVVfNkAAAAASUVORK5CYII=';
  var icon_forward = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAVFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACn9Kj9AAAAG3RSTlMAnFhSmVH8M2b6AgGWFK77wpRWzFU7y+867hUoUSGfAAAA7klEQVRo3u2Yxw4CMQwFA4TO0nv+/z+BoF32hm1pEIc358ijNMdOSkIIIYQQ4r9paMFuDAvyHDbkAhtygQ1PAWt4CVBDFZCGt6BMhrCAM7QCzNAJKMNHABl6goDhvp99Y1tDD0rotJ4uxciiNYxcgoM1fkkxw8YuiBmKQ5CWK/9OuwQRQx2/nhqow/2rVIdn+4zdc/AK3IawwHrhoktkvtC/2WT3MXUkpNBF8yQ8PFWc6WR3vcHpOjVH9sHxPplI+ZXh+D0BVD5mOH4nwMrfDMf/UflONyB0C0U3gXQbSzfi+FcC/hkihBBCCCF8PABbE1H6rH5r1QAAAABJRU5ErkJggg==';
  var icon_refresh = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABjFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiInzhAAAAg3RSTlMAAt4Hra4SM2YFAwT5D5UU7NKU2xz+5AbuKfziii0iLLIx1saSVG2RfOMfye3ObPfYud17PSPIKLNRPOFBhOuJCJP6O1/lIcvvKwxPNXgWu2gLEPh3v2IKry7Tdh5hhWsJDvbX+9y9Wx1gx0sNUFrB6ohK0LHVOl6CxWPpTi/UUznEtEwmttgAAAKXSURBVGje7Zjne9owEMZFIE7NCmGUQFhZQGibvXeavXe699577+of78NJjDhYDz7jth/0frRO70/WOPlMiJSUlJSUlJTU35cnEU/mPNZ4Kz/8w80UdPaF/9labd1dnanz9Jjco09sNbMP79TRCqpbKEeo+JmbbKM6ahov+TsakPaz3hDVVXTGXvCnSEDuXMnO19dxcCM9MHe/ufSsfYv7IwGrpwtOLddbi1Nu+/nqS3ElRpg/DrDq4zZtD1zHW+zXWnjT4hD4owA5Pv7bV9STjTc/3uXvkKJIwCyf/95Lldvfd5UvOALg5euo6AUEm0wBJtn+bN8V5I/vJgBhdr56FVFQwo0H7EC3nlZRjFqPfwMXyz8HQn+HiTXohF531CrHbxwwCr2eV+1vFKBA/p9wVu1vFMBmaKp6f6MAdsgEWyhySqNGY4BhuHxrdyueEKT8Puv8FZihDusASwDYtA4QB0D3f/K9l4bRJK0DDADgqnUAPwA81gG28/7T1vk74cz8MtapUZsIIvqxG5gz06DJZL/t+rExiFg3BagX3DsqfDy598wAHKJ77REbAjEBEI2f2AMQM2YCIBw/yUJMwIkHiP2/9UDQZ4IGuBPC7dzPSh0XHkDfCT7t1s5ASGiQmADQy0Hd8TN/miGmALRrXCfoHmtfDmMBKV6+RqcuVNif2X1eXAUJEuBQhxYLL3GkyRXqQoA3TUcIEpDfnyPFEvxlbL64150bsWJxOIHyzwPY/t96XFqLlUN/Nt296d1eKT1bDhIkoHC+7DNR/UI8lAkTJKDs/M6/0f2VMEiw8pTnB9uH/kr2gSMXqZVsr9/ua37nXBxzkppq9+vcIa/7fZ8y63vEEt16mIwvPZW/FqWkpKSkpKT+gf4Ai3GrUP5bGkMAAAAASUVORK5CYII=';
  var icon_exit = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAAAAmJLR0QA/4ePzL8AAAFkSURBVHja7ZpBTsJQFEXv0JnOBFdgdFRYgyNGEgJxA92LITG6BlZjdCR24NQYgzswTr4DFEupiTF9lRvPefPfe0pb3vutBAAAAAAAAADgRFc99RusnrrthT9ToRRQhSZtxL8ICf9Z0/izn4JrHCtQhAvMI+MfhMdPSurECWSlw8yUN1iz0spZnEC/dJi80ZXz0sp9BBBAYNsFdrwFhnrSsa/AUG9KWlQUbASW8dOGgonAySp+UtKzDt0EdnW91vV8/Qo2l1BV4eVDwegmrleweozWKZj9kW0qXLm1Enu6+Xag+VOBU93+sB62UyBvYKREAAFnAfub2P4x+tum7tK5lVh4tRL1LbVtO73waqftBxr7kVIa6HV19o88t1WWCuvxzSaygR4r8dlaZHMXAQT+iYD9a9au+4tu6T48/p1CmYQLjBTMNDT+uVpgrHnQxTNSa3SUNfrJWaZ9AQAAAAAAAAAY8Q5e6+t8lptQfgAAAABJRU5ErkJggg==';

  return <View style={{ height: 50, justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
    <BarButton onPress= {
        () => {
          infoWebview.injectJavaScript("location.href='" + infoWebview.props.source.uri + "'")
        }
      }
      source={{ uri: icon_home }}
    />
    <BarButton
      onPress={
        () => {
          this.infoWebview.goBack()
        }
      }
      source={{ uri: icon_back }}
    />
    <BarButton onPress={
      () => {
          this.infoWebview.goForward()
        }
      }
      source={{ uri: icon_forward }}
    />
    <BarButton onPress={
      () => {
          this.infoWebview.reload()
        }
      }
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

export default function InfoViewer(prop) {
  return <View style={{
    flex: 1,
    marginTop: 0,
    backgroundColor: "#EFEFF4"
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
        Linking.canOpenURL("https://apple.com")
        if (!navState.url.startsWith("http")) {
          // NativeTool.open(navState.url)
          Linking.openURL(navState.url);
        }
      }}
    />
    <ToolBar url={prop.url}/>
  </View>
  
}