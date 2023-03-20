(() => {
  // console.log(this, "v0.1")
  let rootElement = document.querySelector("gradio-app");

  if (rootElement) rootElement = rootElement.shadowRoot;
  else rootElement = document.querySelector("#tab_txt2img");

  if (!rootElement) return;

  // set up dom
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

  // methods
  try {
    rootElement.querySelector("#txt2img_style_apply")
      .addEventListener("click", sendData);
  } catch (e) {
  }


  //子から
  window.addEventListener("message", (event) => {
    if (event.data.source === "iframe") {
      console.log("Received message from iframe:", event.data.message);

      switch (event.data.method) {
        case "getData":
          sendData();
          break;
        case "setData":
          rootElement.querySelector("#txt2img_prompt textarea").value = event.data.poji;
          break;
      }
    }
  });

  // 拡張機能にデータ送る
  const sendData = () => {
    iframe.contentWindow.postMessage(
      {
        source: "parent",
        method: event.data.method,
        poji: rootElement.querySelector("#txt2img_prompt textarea").value,
      },
      "*"
    );
  }
})();
