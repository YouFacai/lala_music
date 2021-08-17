<template>
    <div class="musicMsg">
        <!-- 图片 -->
        <div class="musicMsg_img">
            <img id="smallIMG" src="" alt="" />
        </div>
        <!-- 歌词内容 -->
        <div class="lyric" v-if="lyric && lyric.length==0">
            <div>lala 音乐播放器</div>
            <a
                target="__black"
                href="https://github.com/YouFacai"
                class="iconfont icon-github"
            >
                YouFacai</a
            >
            <!-- 暂无歌曲 -->
            <div class="nolyric">暂无歌曲</div>
        </div>
        <Lyric v-else></Lyric>
    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import { useStore, mapState } from "vuex";
export default {
    components: {
        Lyric: defineAsyncComponent(() =>
            import("@/components/lyric/index.vue")
        ),
    },
    setup() {
        let store = useStore();
        return {};
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        MusicMsg: (state) => state.Music.MusicMsg,
        lyric: (state) => state.Music.lyric,
    }),
};
</script>

<style lang="less" scoped>
.musicMsg {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    width: 24%;
    overflow: hidden;

    .musicMsg_img {
        position: relative;
        background: url("../../assets/img/player_cover.png") no-repeat;
        background-size: 100% 100%;
        width: 190px;
        height: 190px;

        img {
            width: 90%;
            height: 100%;
        }

        &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: url("../../assets/img/album_cover_player.png") no-repeat;
            background-size: 100% 100%;
        }
    }

    .lyric {
        position: relative;
        color: rgba(255, 255, 255, 0.6);
        padding: 10px 0;
        height: 50%;

        .icon-github {
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            font-size: 15px;

            &:hover {
                color: white;
            }
        }

        .nolyric {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 0;
        }
    }
}
</style>
