(() => {
  console.log(this, "v0.1")
  let rootElement = document.querySelector("gradio-app");

  if (rootElement) rootElement = rootElement.shadowRoot;
  else rootElement = document.querySelector("#tab_txt2img");

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("chrome.runtime.onMessage", request)
    switch (request.action) {
      case "getData":
        sendResponse({
          poji: rootElement.querySelector("#txt2img_prompt textarea").value
        })
        break;
      case "setData":
        rootElement.querySelector("#txt2img_prompt textarea").value = request.poji;
        sendResponse({success: true});
        break;
    }
  });
})();
