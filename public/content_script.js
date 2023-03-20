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
          compute("txt2img_neg_prompt textarea", event.data.option.nega);
          compute("txt2img_steps input", event.data.option.steps);
          compute("txt2img_sampling select", event.data.option.sampling);
          compute("txt2img_width input", event.data.option.width);
          compute("txt2img_height input", event.data.option.height);
          compute("txt2img_cfg_scale input", event.data.option.cfg);
          compute("txt2img_seed input", event.data.option.seed);
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
        option: {
          nega: compute("txt2img_neg_prompt textarea"),
          steps: compute("txt2img_steps input"),
          sampling: compute("txt2img_sampling select"),
          width: compute("txt2img_width input"),
          height: compute("txt2img_height input"),
          cfg: compute("txt2img_cfg_scale input"),
          seed: compute("txt2img_seed input"),
        },
      },
      "*"
    );
  }

  const compute = (selectors, value) => {
    try {
      let target = rootElement.querySelector(selectors);
      if (value) {
        target.value = value;
      } else {
        return target.value;
      }
    } catch (e) {
      return "";
    }
  }
})();
