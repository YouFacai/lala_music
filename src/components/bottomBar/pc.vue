<template>
  <div class="bottombar">
    <div class="addbottombar">
      <!-- 播放控件 -->
      <div class="playBtn">
        <span
          class="iconfont icon-shangyishou control_btn"
          @click="preMusic"
        ></span>
        <span
          @click="playMusic"
          ref="psDOM"
          id="playBtn_PS"
          class="iconfont icon-bofang control_btn"
        ></span>
        <span
          class="iconfont icon-xiayishou control_btn"
          @click="nextMusic"
        ></span>
      </div>
      <!-- 进度条 -->
      <div class="MusicMSG">
        <div class="MusicMSG_top">
          <div class="MusicMSG_top_name">
            <!-- 虽然废除了但是还是生效 -->
            <marquee direction="right" scrolldelay="90" width="150px">{{
              MusicMsg && MusicMsg.name || "暂无歌曲"
            }}</marquee>
          </div>
          <div class="MusicMSG_top_time">
            {{ currentTime }}/{{
              (lyric.length != 0 && lyric[lyric.length - 1].minute) || "00"
            }}:{{
              (lyric.length != 0 && lyric[lyric.length - 1].second) || "00"
            }}
          </div>
        </div>
        <!-- 进度条 -->
        <div class="progress">
          <div class="progress_clone" ref="progress_clone"></div>
          <div class="progress_circle" ref="progress_circle"></div>
        </div>
      </div>
      <!-- 调节控件 -->
      <div class="adjustBtn">
        <div class="control_btn">
          <span class="iconfont icon-shunxubofang"></span>
        </div>
        <div class="control_btn" @click="pushDiscuss">
          <span class="iconfont icon-pinglun"></span>
        </div>
        <div class="control_btn">
          <span class="iconfont icon-laba"></span>
        </div>
        <!-- 进度条 -->
        <div class="progress" @click="adjustVoice">
          <div class="progress_circleVoice" ref="progress_circleVoice"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./common.less";
import { reactive, toRefs, ref, watch } from "vue";
import { useStore, mapState } from "vuex";
import { useRouter } from "vue-router";
import { secondTO, isEmptyObject } from "@/utils/index.js";
// import { PS } from "@/utils/index.js";
export default {
  setup() {
    let state = reactive({});
    let store = useStore();
    let router = useRouter();
    let psDOM = ref(null);
    // 圆的dom
    let progress_circle = ref(null);
    // 克隆的进度条宽度
    let progress_clone = ref(null);
    // 声音的球
    let progress_circleVoice = ref(null);
    let allMusic = store.state.Music.allMusic || null;


    // 上一首
    const preMusic = function () {
      console.log(store.state.Music.currentPlay)
      store.commit("Music/updateCurrentPlay", -1)
     /*  
      PS(allMusic[store.state.Music.currentPlay])(); */
    };

    // 下一首
    const nextMusic = function () {
      store.commit("Music/updateCurrentPlay", 1);
     /*  PS(allMusic[store.state.Music.currentPlay])(); */
    };

    const playMusic = function () {
      let playBtn_PS = Array.from(psDOM.value.classList).indexOf(
        "icon-zanting"
      );
      if (playBtn_PS == -1) {
        // 播放
        psDOM.value.classList.remove("icon-bofang");
        psDOM.value.classList.add("icon-zanting");
        store.commit("Music/updatecurrentTime", { type: true, value: null });
        coreAudio.play();
      } else {
        // 暂停
        psDOM.value.classList.remove("icon-zanting");
        psDOM.value.classList.add("icon-bofang");
        store.commit("Music/updatecurrentTime", { type: false, value: null });
        coreAudio.pause();
      }
    };
    // 监听vuex
    watch(
      () => store.state.Music.currentTime,
      (count) => {
        let allTime =
          store.state.Music.lyric[store.state.Music.lyric.length - 1] &&
          store.state.Music.lyric[store.state.Music.lyric.length - 1].time;
        // 百分比
        let percent = (count / allTime) * 100;
        progress_circle.value.style.left = percent + "%";
        progress_clone.value.style.width = percent + "%";
      }
    );

    // 调节声音
    const adjustVoice = function (e) {
      progress_circleVoice.value.style.left = e.layerX + "px";
      coreAudio.volume = (e.layerX / e.target.clientWidth).toFixed(1);
    };

    // 跳转到评论区
    const pushDiscuss = function () {
      if (!isEmptyObject(store.state.Music.MusicMsg)) {
        router.push("/discuss");
      }
    };

    // 播放 / 暂停
    return {
      ...toRefs(state),
      playMusic,
      psDOM,
      progress_circle,
      progress_clone,
      adjustVoice,
      progress_circleVoice,
      preMusic,
      nextMusic,
      pushDiscuss,
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    MusicMsg: (state) => state.Music.MusicMsg,
    lyric: (state) => state.Music.lyric,
    currentTime: (state) => secondTO(state.Music.currentTime),
  }),
};
</script>

<style scoped lang="less">
.addbottombar {
  display: flex;
  align-items: center;

  .playBtn {
    flex: 1;
    display: flex;
    align-items: center;

    .control_btn {
      flex: 1;
      text-align: center;
      font-size: 40px;
      color: white;
    }
  }

  .MusicMSG {
    position: relative;
    flex: 3;
    margin-bottom: 10px;
    padding: 0 13px;

    .MusicMSG_top {
      display: flex;
      position: relative;
      align-items: center;
      color: white;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);

      .MusicMSG_top_name {
        flex: 1;
        text-align: left;
      }

      .MusicMSG_top_time {
        flex: 1;
        text-align: right;
      }
    }

    // 进度条
    .progress {
      position: relative;
      margin-top: 4px;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.4);

      .progress_circle {
        position: absolute;
        top: -4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: white;
      }
    }
  }

  // 调节控件
  .adjustBtn {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;

    // 进度条
    .progress {
      position: relative;
      flex: 2;
      height: 2px;
      top: 5px;
      background-color: rgba(255, 255, 255, 0.4);

      .progress_circleVoice {
        position: absolute;
        left: 90%;
        top: -4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: white;
      }

      .progress_cloneVoice {
        height: 2px;
        background-color: white;
        width: 90%;
      }
    }

    .control_btn {
      flex: 1;
      text-align: center;
      font-size: 30px;
      color: white;
    }
  }
}
</style>
