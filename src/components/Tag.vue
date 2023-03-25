<template lang="pug">
.tag(:title="storage.tagList[uid].value"
  :class="setting?'d-flex flex-wrap':''"
)
  button.btn.btn-sm(
    :class="getSelect(uid).active?'btn-primary':'btn-outline-dark'"
    @click="getSelect(uid).active=!getSelect(uid).active;update()"
    @click.right.prevent="setting=!setting"
    style="user-select: none"
  )
    span(v-if="getSelect(uid).kagi") &lt
    span(v-else-if="getSelect(uid).pow!=1") (
    | {{ storage.tagList[uid].label }}
    span(v-if="getSelect(uid).pow!=1") :{{ getSelect(uid).pow }}
    span(v-if="getSelect(uid).kagi") &gt
    span(v-else-if="getSelect(uid).pow!=1") )
    span(v-if="getSelect(uid).rate!=0") ↑{{ getSelect(uid).rate }}

  span.input-group.flex-1(v-if="setting")
    span.ml-1.mr-1 :
    input.form-control.form-control-sm(v-model="getSelect(uid).pow" type="number" placeholder="1" style="width: 2.5em" @change="update")
    span.ml-1.mr-1 ↑
    input.form-control.form-control-sm(v-model="getSelect(uid).rate" type="number" placeholder="0" style="width: 2.5em" @change="update")

  span.input-group.mt-1.mb-2(v-if="setting")
    input.form-control.form-control-sm(v-model="storage.tagList[uid].label")
    input.form-control.form-control-sm(v-model="storage.tagList[uid].value")

</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {appData, storage} from "../utils";

defineProps<{
  uid: string | number,
}>();

const selected = ref(false);
const setting = ref(false);

const getSelect = (id: string | number) => {
  if (!appData.selects[id]) appData.selects[id] = {active: false, pow: 1, rate: 0};
  return appData.selects[id];
}

const update = () => {
  //@ts-ignore reactiveを反応させるためだけ
  appData.selects.time = +new Date();
}

onMounted(() => {
  // const url = new URL(location.href);
  // robj.poji = url.searchParams.get("poji");
  // robj.nega = url.searchParams.get("nega");
})
</script>

<style scoped lang="scss">
button {
}
</style>
