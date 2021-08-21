<template>
  <div ref="mvVideo" class="mvVideo">
    <video ref="Video" controls autoplay :src="renderData.url"></video>
  </div>
</template>

<script>
import { toRefs, reactive, watch, ref, onMounted } from "vue";
import { useStore, mapState } from "vuex";
import { getMvUrl } from "@/api/index.js";
export default {
  setup() {
    const state = reactive({
      renderData: [],
    });
    const store = useStore();
    let mvVideo = ref(null),
      Video = ref(null);

    onMounted(() => {
      mvVideo.value.style.height = store.state.Common.tableHeigh + "px";
      Video.value.style.height = store.state.Common.tableHeigh + "px";

      getMvUrl(store.state.Mv.currentID).then((res) => {
        state.renderData = res;
      });
    });

    watch(
      () => store.state.Common.tableHeigh,
      (newData) => {
        mvVideo.value.style.height = newData + "px";
        Video.value.style.height = newData + "px";
      }
    );

    // 监听Mv ID变化
    watch(
      () => store.state.Mv.currentID,
      (newData) => {
        getMvUrl(newData).then((res) => {
          state.renderData = res;
        });
      }
    );

    return {
      ...toRefs(state),
      mvVideo,
      Video,
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    tableHeigh: (state) => state.Common.tableHeigh,
  }),
};
</script>
<style lang='less' scoped>
.mvVideo {
  width: 100%;

  video {
    width: 100%;
    // object-fit: cover;
    outline: none;
    border: none;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>