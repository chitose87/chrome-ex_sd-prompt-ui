// window.alert('アプリ開いたね！');
console.log(this, "v0.1")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("chrome.runtime.onMessage")
  switch (request.action) {
    case "getData":
      sendResponse({
        poji: document.querySelector("#txt2img_prompt textarea").value
      })
      break;
    case "setData":
      document.querySelector("#txt2img_prompt textarea").value = request.poji;
      break;
  }
  // if (request.action === "changeDom") {
  //   const element = document.querySelector(request.selector);
  //   if (element) {
  //     element.innerHTML = request.newContent;
  //     sendResponse({success: true});
  //   } else {
  //     sendResponse({success: false, error: "Element not found."});
  //   }
  // }
});
