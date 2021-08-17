<template>
  <!-- 显示窗口 -->
  <div class="showBox" >
    <!-- 全部歌词 -->
    <div id="allLyrics" class="allLyric" ref="allLyric">
      <li
        v-for="(data, index) in lyric"
        :class="index == currentIndex ? 'active' : 'common'"
        :key="index"
      >
        {{ data.content }}
      </li>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
export default {
  setup() {
    // 歌词上移
    const store = useStore();
    const state = reactive({
      currentIndex: 0,
    });

    let allLyric = ref(null);

    // 监听vuex  时间变化
    watch(
      () => store.state.Music.currentTime,
      (newdata) => {
        store.state.Music.lyric.forEach((item, index) => {
          if (item.time == newdata) {
            let diifHeight =
              document.getElementsByClassName("common")[index - 1] &&
              document.getElementsByClassName("common")[index - 1]
                .offsetHeight + 4;
            state.currentIndex = item.index;
            allLyric.value.style.top =
              parseInt(window.getComputedStyle(allLyric.value)["top"]) -
              diifHeight +
              "px";
          }
        });
      }
    );

    
    return {
      ...toRefs(state),
      allLyric,
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    lyric: (state) => state.Music.lyric,
    currentTime: (state) => state.Music.currentTime,
  }),
};
</script>

<style scoped="scoped" lang='less'>
.showBox {
  width: 90%;
  overflow: hidden;
  margin-top: 5px;

  .allLyric {
    position: relative;
    text-align: center;
    list-style: none;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    transition: 0.7s;
    top: 10px;

    li {
      margin-bottom: 4px;
    }

    .active {
      color: #40ce8f;
    }
  }
}
</style>

