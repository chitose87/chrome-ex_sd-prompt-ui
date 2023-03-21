import {reactive, watchEffect} from "vue";
import {category, presetData} from "./presetData";

export const appData = reactive({
  timestamp: 0,
  category: category,
  tagList: Object.assign({}, presetData),
  form: {
    poji: "",
    option: <any>{}
  },
  selectList: <any>{},
});

export const storage = reactive({
  tagList: <any>{},
  presets: <{
    [key: string]: {
      selects: { [key: string]: boolean },
      option: string
    }
  }>{},
  currentPreset: "",
});

// init
let obj = <any>{};
try {
  obj = JSON.parse(localStorage.getItem("system") || "");
} catch (e) {
}
for (let i in obj) {
  // @ts-ignore
  storage[i] = obj[i];
}
storage.tagList = Object.assign(presetData, storage.tagList);

//
watchEffect(() => {
  localStorage.setItem("system", JSON.stringify(storage))
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
