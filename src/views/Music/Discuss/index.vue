<template>
  <div class="discuss"  ref="discuss" id="discuss_box">
    <!-- 精彩评论 -->
    <div class="title">精彩评论</div>
    <!-- 每一个评论 -->
    <div >
      <div class="discuss_item" v-for="data in renderList" :key="data.commentId">
      <div class="head_portrait">
        <img :src="data.user.avatarUrl" alt="" />
      </div>
      <div class="item_context">
        <div class="author_name">{{ data.user.nickname }}</div>
        <div class="comment">{{ data.content }}</div>
        <div class="item_context_bottom">
          <div class="time">{{ data.time }}</div>
          <div class="likes">
            <img src="../../../assets/img/like.png" alt="" />
            <div>{{ data.likedCount }}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, watch, onMounted, ref, onActivated } from "vue";
import { useStore } from "vuex";
import { getMusicDiscuss } from "@/api/index.js";
import {convertTime} from '@/utils/index.js';
export default {
  setup() {
    const state = reactive({
      renderList: [],
    });
    const store = useStore();
    let discuss = ref(null);

    onActivated(() => {
        // 获得评论
      getMusicDiscuss(store.state.Music.MusicMsg.id,document.getElementById("discuss_box")).then((res) => {
          res.forEach(item=>{
              item.time = convertTime(item.time)
          })
        state.renderList = res;
      });
    });

    const updateHeight = function (newData) {
      discuss.value.style.height = newData + "px";
    };

    onMounted(() => {
      updateHeight();
    });

    watch(
      () => store.state.Common.tableHeigh,
      (newData) => updateHeight(newData)
    );

    return {
      ...toRefs(state),
      discuss,
    };
  },
};
</script>
<style lang='less' scoped>
.discuss {
  width: 75%;
  font-size: 15px;
  padding: 20px;
  overflow: scroll;

  .title {
    color: white;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
    font-weight: bold;
  }

  //   每一个评论
  .discuss_item {
    padding-top: 10px;
    display: flex;

    .head_portrait {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      overflow: hidden;
      margin: 5px 20px 0 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .item_context {
      width: 100%;

      .author_name {
        color: white;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .comment {
        color: rgba(255, 255, 255, 0.6);
        font-weight: bold;
        margin-bottom: 15px;
      }

      .item_context_bottom {
        display: flex;
        width: 100%;
        color: rgba(255, 255, 255, 0.6);
        position: relative;

        .likes {
          display: flex;
          position: absolute;
          right: 0;

          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}

.discuss::-webkit-scrollbar {
  width: 2px;
}
.discuss::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: #eee;
}
</style>