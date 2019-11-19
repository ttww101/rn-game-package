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
    if (count < maxTrySec * 1000 / 200) {
      setTimeout(foo, 200)
      console.log("calling")
      count++
    }
  }, 200)
}


repeat(function() {
  // cr_setSuspended(false)
       if (document.querySelector("#redfoc_logo")) {
          document.querySelector("#redfoc_logo").remove()
  }
  document.querySelectorAll("a[title='Hosted on free web hosting 000webhost.com. Host your own website for FREE.']")[0].parentElement.remove()
})


// setTimeout(function() {
  
//   let css = '#gdsdk__splash { display: none }'
//   let head = document.head || document.getElementsByTagName('head')[0]
//   let style = document.createElement('style');

//   head.appendChild(style);

//   style.type = 'text/css';
//   style.appendChild(document.createTextNode(css));

// }, 1000)
`



  let jsStr = [
//     jsCode
  ]

  jsStr.map((str) => {
    webview.injectJavaScript(str)
  })

}
