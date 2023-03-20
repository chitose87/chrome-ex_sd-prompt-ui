import {reactive} from "vue";
import {category, presetData} from "./presetData";

export const appData = reactive({
  timestamp: 0,
  category: category,
  tagList: Object.assign({}, presetData),
  form: {
    poji: "",
    option: <any>{}
  },
});

export const asyncPostMsg = (method: string) => {
  return new Promise((resolve) => {
    let listner = (e: MessageEvent) => {
      if (e.data.source === "parent" && e.data.method == method) {
        window.removeEventListener("message", listner);
        resolve(e.data);
      }
    }
    window.addEventListener("message", listner);
    window.parent.postMessage({source: "iframe", method: method}, "*");
  });
}
