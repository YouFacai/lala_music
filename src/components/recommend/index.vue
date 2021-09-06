<template>
  <div >
    <div class="artistToplist_box">
      <!-- 云音乐歌手榜 -->
      <div class="artistToplist_title">
        {{ artistToplist.artistToplist && artistToplist.artistToplist.name }}
      </div>
      <div class="artistToplist">
        <div
          class="artistToplist_item"
          v-for="(data, index) in artistToplist.list"
          :key="index"
          @click="selectList(data)"
        >
          <img :src="data.coverImgUrl" alt="" />
          <div>{{ data.name }}</div>
        </div>
      </div>
    </div>
    <!-- 热门歌单 -->
    <div class="HotsongList_box">
      <div class="HotsongList_title">热门歌单</div>
      <div class="artistToplist">
        <div
          class="artistToplist_item"
          v-for="(data, index) in HotsongList"
          :key="index"
          @click="selectList(data)"
        >
          <img :src="data.creator.avatarUrl" alt="" />
          <div>{{ data.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";
import { getHotlist, getHotsongList } from "@/api/index.js";
import {useStore} from 'vuex';
export default {
  setup(_,content) {
    const store = useStore();

    const state = reactive({
      // 云音乐歌手榜单
      artistToplist: [],
      //   热门歌单
      HotsongList: [],
    });

    // 所有榜单
    getHotlist().then((res) => {
      state.artistToplist = res;
    });

    // 热门歌单
    getHotsongList().then((res) => {
      state.HotsongList = res;
    });

    // 选择歌单
    const selectList = function (item) {
      store.commit('Music/setSelectListID',item.id);
      content.emit('updateIsData',true)
    };

    return {
      ...toRefs(state),
      selectList,
    };
  },
};
</script>
<style lang='less' scoped>
.recommend {
  padding: 20px;
  font-size: 18px;
  // overflow: scroll;
  position: relative;
  display: flex;
  flex-direction: column;

  .artistToplist_box {
    position: relative;
    height: 25%;

    .artistToplist_title {
      color: white;
    }

    .artistToplist {
      height: 100%;

      .artistToplist_item {
        width: 20%;
        margin: 20px 15px;
        float: left;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }

        div {
          text-align: center;
          font-size: 15px;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .HotsongList_box {
    position: relative;

    .HotsongList_title {
      color: white;
      width: 20%;
      text-align: left;
    }

    .artistToplist {
      height: 350px;
      position: relative;

      .artistToplist_item {
        width: 20%;
        width: 20%;
        margin: 20px 15px;
        float: left;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }

        div {
          text-align: center;
          font-size: 15px;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
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