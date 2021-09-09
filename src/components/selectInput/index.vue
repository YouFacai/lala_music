<template>
  <div class="selectInput">
    <!-- 推荐的歌曲 -->
    <div
      class="recommend"
      v-for="(data, index) in selectHotRender"
      :key="index"
      @click="selectMusic(data.searchWord)"
    >
      {{ data.searchWord }}
    </div>
    <input
      @input="selectMusic"
      placeholder="音乐/视频"
      type="text"
      class="selectBtn"
      v-model="selectText"
    />
  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from "vue";
import { gethotSelect, getMusic } from "@/api/index.js";
import {useStore} from 'vuex';
import { debounce } from "@/utils/index.js";
export default {
  setup() {
    let store = useStore();

    const state = reactive({
      selectHotRender: [],
      //   搜索的关键词
      selectText: "",
    });

    // 热搜关键词
    gethotSelect().then((res) => {
      state.selectHotRender = res;
    });

    // 搜索歌曲
    let selectMusic = function (selectText) {
      if (typeof selectText != 'string') {
          selectText = state.selectText;
      }else {
         state.selectText = selectText
      }
      getMusic(selectText,document.getElementById("selectMusic_box")).then((res) => {;
        store.commit("Music/setSelectRender",res);
      });
    };

    selectMusic = debounce(selectMusic, 500, false);

    return {
      ...toRefs(state),
      selectMusic,
    };
  },
};
</script>
<style lang='less' scoped>
.selectInput {
  height: 50px;
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  margin: 0 20px;
  display: flex;
  align-items: center;
  font-size: 15px;

  .recommend {
    text-align: center;
    flex: 1;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  //   搜索控件
  .selectBtn {
    height: 75%;
    outline: none;
    flex: 7;
    margin: 10px;
    padding-left: 20px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>