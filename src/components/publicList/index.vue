<template>
  <div class="selectMusic">
    <div class="renderbox">
      <el-table
        class="playing_L"
        :data="renderList"
        :height="tableHeigh - 55"
        :border="true"
        style="width: 100%"
        @cell-mouse-enter="hoverenter"
        @cell-mouse-leave="hoverleave"
      >
        <el-table-column
          class-name="activeIcon"
          prop="index"
          width="40"
        ></el-table-column>
        <el-table-column
          class-name="tableName"
          prop="name"
          label="歌曲"
          width="430"
        >
        </el-table-column>
        <el-table-column prop="singerss" label="歌手" width="180">
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" width="150">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, defineAsyncComponent, watch, onActivated, onMounted } from "vue";
import { useStore, mapState } from "vuex";
import { getListDetail } from "@/api/index.js";
import { useRouter } from "vue-router";
import { PS } from "@/utils/index.js";
export default {
  setup() {
    let store = useStore();
    let router = useRouter();
    let state = reactive({
      renderList: [],
    });

    onMounted(() => {
       getListDetail(store.state.Music.selectListID).then(res=>{
         state.renderList = res;
       })
    })

    // hoverList 鼠标滑入
    const hoverenter = function (row, column, cell, event) {
      let newDIV = document.createElement("div");
      newDIV.className = "iconTemp";
      newDIV.id = "kk";
      newDIV.style.display = "inline";
      if (row.mv) {
        newDIV.innerHTML += `
                <span id='music' class='iconfont icon-bofang'></span>
                <span id='mv' class='iconfont icon-file-mv-fill'></span>
            `;
      } else {
        newDIV.innerHTML += `
                <span id='music' class='iconfont icon-bofang'></span>
            `;
      }
      document
        .getElementsByClassName("tableName")
        [row.index + 1].getElementsByClassName("cell")[0]
        .appendChild(newDIV);

      // 手动挂载事件
      music.onclick = PS(row);
      if (row.mv) mv.onclick = PM(row);
    };

    // hoverList 鼠标滑出
    const hoverleave = function (row, column, cell, event) {
      document.getElementsByClassName("iconTemp")[0].remove();
    };

    // 播放  每一个List 上面的
    PS();

    // 播放MV
    const PM = function (musicMv) {
      return function () {
        hoverleave();
        // 音乐暂停
        playBtn_PS.classList.remove("icon-zanting");
        playBtn_PS.classList.add("icon-bofang");
        store.commit("Music/updatecurrentTime", { type: false, value: null });
        coreAudio.pause();

        store.commit("Mv/updateCurrentID", musicMv.mv);
        router.replace("/mv");
      };
    };

    watch(
      () => store.state.Music.selectRender,
      (newData) => {
        state.renderList = newData;
      }
    );

    return {
      ...toRefs(state),
      hoverenter,
      hoverleave,
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    tableHeigh: (state) => state.Common.tableHeigh,
  }),
};
</script>

<style scoped lang='less'>
.selectMusic {
  width: 100%;
  color: white;
  
  .renderbox {
    width: 100%;

    .playing_L {
      flex: 5;
    }

    .musicMsg {
      flex: 2;
    }
  }
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 6px;
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: #9ea0a1;
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.4);
}
</style>
