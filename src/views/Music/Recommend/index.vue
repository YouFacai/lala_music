<template>
  <div class="recommend" ref="recommend">
    <recommend v-if="!isData" @updateIsData="updateIsData"></recommend>
    <!-- 数据列表:id="" -->
    <publicList v-else></publicList>
  </div>
</template>

<script>
import {
  toRefs,
  reactive,
  defineAsyncComponent,
  watch,
  ref,
  onActivated,
} from "vue";
import { useStore, mapState } from "vuex";

export default {
  components: {
    recommend: defineAsyncComponent(() =>
      import("@/components/recommend/index.vue")
    ),
    publicList: defineAsyncComponent(() =>
      import("@/components/publicList/index.vue")
    ),
  },
  setup() {
    const store = useStore();

    const recommend = ref(null);

    const updateIsData = function (data) {
      store.commit("Music/setisData", data);
    };

    /* watch(
      () => store.state.Music.isData,
      (oldData) => {
        console.log(oldData);
      }
    ); */

    return {
      updateIsData,
      recommend,
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    isData: (state) => state.Music.isData,
  }),
};
</script>
<style lang='less' scoped>
.recommend {
  width: 75%;
  padding: 20px;
  font-size: 18px;
  overflow: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
}

.recommend::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 2px;
}
.recommend::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: #eee;
}
</style>