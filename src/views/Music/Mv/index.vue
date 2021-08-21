<template>
  <div class="mvBox">
      <myVideo></myVideo>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    myVideo: defineAsyncComponent(() =>
      import("../../../components/myVideo/index.vue")
    ),
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.mvBox {
  width: 75%;
}
</style>

