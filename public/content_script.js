(() => {
  // console.log(this, "v0.1")
  let rootElement = document.querySelector("gradio-app");

  if (rootElement) rootElement = rootElement.shadowRoot;
  else rootElement = document.querySelector("#tab_txt2img");

  if (!rootElement) return;
  //
  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   console.log("chrome.runtime.onMessage", request)
  //   switch (request.action) {
  //     case "getData":
  //       sendResponse({
  //         poji: rootElement.querySelector("#txt2img_prompt textarea").value
  //       })
  //       break;
  //     case "setData":
  //       rootElement.querySelector("#txt2img_prompt textarea").value = request.poji;
  //       sendResponse({success: true});
  //       break;
  //   }
  // });

  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   if (request.action === "insert_iframe") {
  const div = document.createElement("div")
  div.innerHTML = `<textarea style='width: 20px; border: 0px'></textarea>`;
  div.setAttribute("style", `
    display: flex;
`)
  const iframe = document.createElement("iframe");
  iframe.setAttribute("style", `
  width:100%;
  `);
  iframe.src = chrome.runtime.getURL("index.html");
  div.prepend(iframe)

  document.body.prepend(div);

  //
  iframe.addEventListener("load", () => {
    //子へ
    iframe.contentWindow.postMessage(
      {
        source: "parent",
        message: "Hello from Parent!",
      },
      "*"
    );
  });

  //子から
  window.addEventListener("message", (event) => {
    if (event.data.source === "iframe") {
      console.log("Received message from iframe:", event.data.message);

      switch (event.data.method) {
        case "getData":
          iframe.contentWindow.postMessage(
            {
              source: "parent",
              method: event.data.method,
              poji: rootElement.querySelector("#txt2img_prompt textarea").value,
            },
            "*"
          );
          break;
        case "setData":
          rootElement.querySelector("#txt2img_prompt textarea").value = event.data.poji;
          break;
      }
      //
      // rootElement.querySelector("#txt2img_prompt textarea").value = event.data.message;
      // let rootElement = document.querySelector("gradio-app");
      // if (rootElement) rootElement = rootElement.shadowRoot;
      // else rootElement = document.querySelector("#tab_txt2img");
      // rootElement.querySelector("#txt2img_prompt textarea").value
      // iframe.contentWindow.postMessage(
      //   {
      //     source: "parent",
      //     message: "run ",
      //   },
      //   "*"
      // );
    }
  });
  // }
  // });
})();
