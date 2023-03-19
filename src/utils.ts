import {reactive} from "vue";
import {category, presetData} from "./presetData";

export const appData = reactive({
  category: category,
  tagList: Object.assign({}, presetData),
  form: {
    poji: ""
  }
});
