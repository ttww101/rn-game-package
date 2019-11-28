export default gameJob = function (syntheticEvent) {
  let jsCode = `
function until(domStr, callback, condition) {
  let count = 0, maxTrySec = 30
  let intervalId = setInterval(function() {
    doIfExist()
  }, 100)
  let doIfExist = function() {
    console.log("interval #" + intervalId + " callback " + count + " " + condition)
    if (count > maxTrySec * 1000 / 500) {
      clearInterval(intervalId)
    }
    count++;
    let dom = document.querySelectorAll(domStr);
      if (dom.length > 0 && (condition == undefined || condition())) {
        callback(dom[0])
        clearInterval(intervalId)
      }
  }
  doIfExist()
}

function repeat(callback) {
  let count = 0, maxTrySec = 30
  callback()
  setTimeout(function foo() {
    // console.log("interval #" + "0" + " callback " + count)
    callback()
    if (count < maxTrySec * 1000 / 500) {
      setTimeout(foo, 500)
      count++
    }
  }, 500)
}

let flag = false

// chrome pointerup
// safari desktop click
// webkit touchend
until(".fg-click2play", function(dom) {
  let event = new Event("touchend");
  dom.dispatchEvent(event);
}, ()=>{return flag})


until("#fg-clip", function(dom) {
  dom.remove()
})

repeat(function() {
  if (typeof(fg_api) != "undefined") {
    fg_api.prototype.getMoreGamesButtonImage = function(forceAbsolute) {return '/html5games/branding/default/More_Games600x253_transparent.png'}
    flag = true
  }
})

setInterval(function() {
  famobi.modal.close()
  
  let domStr = ".fg-click2play"
  let dom = document.querySelectorAll(domStr);
  if (dom.length > 0) {
    let event = new Event("touchend");
    dom[0].dispatchEvent(event);
  }
  playState.game.stage.children[2].children[0].alpha = 0
}, 100)
`
  let jsStr = [
    jsCode
  ]

  jsStr.map((str) => {
    webview.injectJavaScript(str)
  })

}
