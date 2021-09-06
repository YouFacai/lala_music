<template>
  <div>
    <!-- 顶部导航栏 -->
    <topbar></topbar>
    <!-- 菜单 -->
    <menus></menus>
    <!-- 一边路由一边歌曲信息 -->
    <div id="contents" ref="content" class="content" v-if="this.$env == 'pc'">
      <router-view v-slot="{ Component, route }">
        <keep-alive exclude="playing">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view>
      <smallMsg></smallMsg>
    </div>
    <!-- 底部控件 -->
    <bottomBarPC  v-if="this.$env == 'pc'"></bottomBarPC>
    <bottomBarPhone v-else></bottomBarPhone>

    <audio id="coreAudio" autoplay src=""></audio>
  </div>
</template>

<script>
import {
  toRefs,
  reactive,
  defineAsyncComponent,
  watch,
  ref,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router';
export default {
  components: {
    topbar: defineAsyncComponent(() => import("@/components/topbar/index.vue")),
    bottomBarPC: defineAsyncComponent(() =>
      import(`@/components/bottomBar/pc.vue`)
    ),
    bottomBarPhone: defineAsyncComponent(() =>
      import(`@/components/bottomBar/phone.vue`)
    ),
    // 菜单
    menus: defineAsyncComponent(() => import(`@/components/menus/index.vue`)),
    // 歌曲信息
    smallMsg: defineAsyncComponent(() =>
      import(`@/components/smallMsg/index.vue`)
    ),
  },
  setup() {
    let state = reactive({
      
    });

    let store = useStore();

    let content = ref(null);

   const router = useRouter();


    // 歌词高度
    watch(
      () => store.state.Common.tableHeigh,
      (newdata) => {
        content.value.style.height = newdata + "px";
      }
    );
    onMounted(() => {
      if (typeof contents != "undefined") {
        contents.style.height = store.state.Common.tableHeigh + "px";
      }
    });

    return {
      ...toRefs(state),
      content
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
}
</style>


