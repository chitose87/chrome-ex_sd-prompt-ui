(() => {
  // console.log(this, "v0.1")
  let rootElement = document.querySelector("gradio-app");

  if (rootElement) rootElement = rootElement.shadowRoot;
  else rootElement = document.querySelector("#tab_txt2img");

  if (!rootElement) return;

  // set up dom
  const div = document.createElement("div")
  // div.innerHTML = `<textarea style='width: 20px; border: 0;resize: vertical'></textarea>`;
  div.setAttribute("style", `
    position: fixed;
    left:0;
    top:0
    width: 300px;
    height: 100%;
`)
  const iframe = document.createElement("iframe");
  iframe.setAttribute("style", `
  width:100%;
  height:100%;
  `);
  iframe.src = chrome.runtime.getURL("index.html");
  const style=document.createElement("style");
  style.innerText=`
  body{
    padding-left: 300px !important;
    box-sizing: border-box;
  }`;
  div.prepend(style)
  div.prepend(iframe)

  document.body.prepend(div);

  // methods
  try {
    rootElement.querySelector("#txt2img_style_apply")
      .addEventListener("click", sendData);
  } catch (e) {
  }

  window.addEventListener("skb_batch", (e) => {
    //console.log(rootElement.querySelector("#txt2img_skip").style.display)

    if (rootElement.querySelector("#txt2img_skip").style.display != "block") {
      let prompt = rootElement.querySelector("#txt2img_prompt textarea").value;
      let obj = e.detail;
      for (let i in obj) {
        switch (i) {
          case "prompt":
            compute("txt2img_prompt textarea", prompt + obj.prompt, "input")
            break;
          case "steps":
            compute("txt2img_steps input[type='range']", parseFloat(obj.steps), "input");
            break;
          case "sampling":
            compute("txt2img_sampling select", obj.sampling);
            break;
          case "cfg":
            compute("txt2img_cfg_scale input[type='range']", parseFloat(obj.cfg), "input");
            break;
          case "seed":
            compute("txt2img_seed input", parseFloat(obj.seed));
            break;
        }
      }

      //todo 実行
      rootElement.querySelector("#txt2img_generate").dispatchEvent(new Event("click"));
      window.dispatchEvent(new Event("skb_batch_r"));
      requestAnimationFrame(() => {
        compute("txt2img_prompt textarea", prompt, "input")
      })
    }
  });

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
          rootElement.querySelector("#txt2img_prompt textarea").dispatchEvent(new Event("input"));
          break;
        case "setOption":
          console.log("-----", event.data.option)
          let option = JSON.parse(event.data.option);
          console.log(option)
          compute("txt2img_neg_prompt textarea", option.nega, "input");
          compute("txt2img_steps input[type='range']", parseFloat(option.steps), "input");
          compute("txt2img_sampling select", option.sampling);
          compute("txt2img_width input[type='range']", parseFloat(option.width), "input");
          compute("txt2img_height input[type='range']", parseFloat(option.height), "input");
          compute("txt2img_cfg_scale input[type='range']", parseFloat(option.cfg), "input");
          compute("txt2img_seed input", parseFloat(option.seed));
          compute("setting_outdir_txt2img_samples textarea",option.t2i, "input")
          compute("setting_outdir_img2img_samples textarea",option.i2i, "input")
          compute("setting_outdir_extras_samples textarea",option.ex, "input")
          break;

        case "batch":
//           if (__skb.batch) {
//             let prompt = rootElement.querySelector("#txt2img_prompt textarea").value;
//
//             let loop = (count) => {
//               let obj = __skb.batch.run();
//               for (let i in obj) {
//                 switch (i) {
//                   case "prompt":
//                     compute("txt2img_prompt textarea", prompt + obj.prompt, "input")
//                     break;
//                   case "steps":
//                     compute("txt2img_steps input[type='range']", parseFloat(option.steps), "input");
//                     break;
//                   case "sampling":
//                     compute("txt2img_sampling select", option.sampling);
//                     break;
//                   case "cfg":
//                     compute("txt2img_cfg_scale input[type='range']", parseFloat(option.cfg), "input");
//                     break;
//                   case "seed":
//                     compute("txt2img_seed input", parseFloat(option.seed));
//                     break;
//                 }
//               }
//
//               //todo 実行
//               rootElement.querySelector("#txt2img_generate").dispatchEvent(new Event("click"));
//               let id = setInterval(() => {
//                 if (rootElement.querySelector("#txt2img_skip").style.display != "display") {
//                   clearInterval(id);
//                   if (count--) loop(count);
//                   else {
//                     console.log("batch end")
//                   }
//                 }
//               }, 10000)
//             }
//             loop(__skb.batch.count || 10);
//           }else{
//
//             console.log(`
//             let count=10;
// let hoge=()=>{count--}
// window.addEventListener("skb_batch_r",hoge)
// let id=setInterval(()=>{
// if(!count){
//     clearInterval(id);
//     window.removeEventListener("skb_batch_r",hoge);
// }
//   let prompt="Melancholy,Mysterious,kawaii";
//   let arr=[];
//   prompt.split(",").forEach((item)=>{
//     if(Math.random()<0.5)arr.push(item);
//   });
//   let detail={
//     prompt:arr.join(","),
//     // steps:27,
//     // sampling:"",
//     // cfg:1,
//     // seed:-1,
//   }
//   window.dispatchEvent(new CustomEvent("skb_batch",{detail:detail}))
//     console.log(detail)
// },1000)
// `)
//           }

          break;
      }
    }
  });

  // 拡張機能にデータ送る
  const sendData = () => {
    console.log({
      nega: compute("txt2img_neg_prompt textarea"),
      steps: compute("txt2img_steps input"),
      sampling: compute("txt2img_sampling select"),
      width: compute("txt2img_width input"),
      height: compute("txt2img_height input"),
      cfg: compute("txt2img_cfg_scale input"),
      seed: compute("txt2img_seed input"),
    })

    iframe.contentWindow.postMessage(
      {
        source: "parent",
        method: "getData",
        poji: rootElement.querySelector("#txt2img_prompt textarea").value,
        option: JSON.stringify({
          nega: compute("txt2img_neg_prompt textarea"),
          steps: compute("txt2img_steps input"),
          sampling: compute("txt2img_sampling select"),
          width: compute("txt2img_width input"),
          height: compute("txt2img_height input"),
          cfg: compute("txt2img_cfg_scale input"),
          seed: compute("txt2img_seed input"),
          t2i: compute("setting_outdir_txt2img_samples textarea"),
          i2i: compute("setting_outdir_img2img_samples textarea"),
          ex: compute("setting_outdir_extras_samples textarea"),
        })
      },
      "*"
    );
  }

  const compute = (selectors, value, type) => {
    console.log(selectors, value)
    try {
      let target = rootElement.querySelector("#" + selectors);
      if (value) {
        target.value = value;
        target.dispatchEvent(new Event(type || "change"));
      } else {
        return target.value;
      }
    } catch (e) {
      console.log(e, selectors, value);
      return "";
    }
  }
})();
