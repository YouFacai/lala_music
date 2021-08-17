import { clearsetInterval } from "@/utils/index.js";
let timer = null;
export const Music = {
    namespaced: true,
    state: () => ({
        // 全部歌曲,
        allMusic: [],
        // 当前播放的歌曲索引,
        currentPlay: 0,
        // 歌曲信息
        MusicMsg: {},
        // 歌词
        lyric: [],
        // 已经播放了多少秒
        currentTime: 0,
    }),
    mutations: {
        // 正在播放的全部歌曲
        setallMusic(state, value) {
            state.allMusic = value
        },

        // 当前播放的歌曲索引
        updateCurrentPlay(state, value) {
            if (value == -1) {
                state.currentPlay = state.currentPlay - 1;
                if (state.currentPlay == -1) {
                    state.currentPlay = state.allMusic.length - 1
                    console.log(state.currentPlay)
                }
            } else{
                state.currentPlay = state.currentPlay + 1;
                if (state.currentPlay == state.allMusic.length) {
                    state.currentPlay = 0
                }
            }
        },

        // 修改歌曲信息
        updateMusicMsg(state, value) {
            state.MusicMsg = value
        },

        // 修改歌词
        updateLyric(state, value) {
            state.lyric = value
        },

        // 修改播放时间 {type:"开不开定时器",value:'传不传初始值'}
        updatecurrentTime(state, action) {
            timer = clearsetInterval(timer)
            if (action.type) {
                // 开启定时器
                timer = setInterval(() => {
                    // 唱完了定时器也清了
                    state.currentTime = Math.floor(coreAudio.currentTime)
                    if (state.lyric[state.lyric.length - 1].time == state.currentTime) {
                        timer = clearsetInterval(timer)
                    }
                }, 1000);
            } else {
                timer = clearsetInterval(timer)
            }
        }
    },
    actions: {},
    getters: {}
}