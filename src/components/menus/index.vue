<template>
  <div class="menus">
    <el-button v-for="(item) in renderMenus" :key="item.to" class="elbutton" >
        <router-link
          :to="item.to"
          :custom="true"
          v-slot="{ href, navigate, isActive }"
        >
          <div
            :class="isActive==true?'router-link-active':''"
            :active="true"
            :href="href"
            @click="navigate"
          >
            {{ item.content }}
          </div>
        </router-link>
      </el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    let state = reactive({
      // 渲染的菜单
      renderMenus: [
        {
          to: "/playing",
          content: "正在播放",
        },
        {
          to: "/select",
          content: "搜索",
        },
        {
          to: "/mv",
          content: "视频",
        },
      ],
      // 当前焦点
      activeIndx: 0,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang='less' scoped>
.menus {
  display: flex;
  overflow: auto;
  padding: 20px;
  margin-right: 10px;
  align-items: center;
  position: relative;

  .elbutton {
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  .router-link-active {
    color: white;
  }
}
</style>
