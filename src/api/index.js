import instance from '@/utils/http.js'
import store from '@/store/index.js'
//登录
const login = function () {
    instance.get(`/api/login/cellphone?phone=19884687266&password=yzl197543`)
}
login()

// 正在播放
export const playingData = function () {
    let i = 1;
    return instance.get("/api/recommend/songs").then((res) => {
        res.data.dailySongs.index = i++;
        // 存一份到vuex 
        store.commit("Music/setallMusic",res.data.dailySongs);
        return res.data.dailySongs
    })
}

// 获得歌词
export const getLyric = function (id) {
    return instance.get(`/api/lyric?id=${id}`).then((res) => {
        let i = 0, lyricArr = [];
        res.lrc.lyric.replace(/\[(\d{2}):(\d{2})\.(?:\d+)\](.*)/g, (_, hour, minute, content) => {
            lyricArr.push({
                index: `${i++}`,
                minute: hour,
                second: minute,
                content,
                // 一共多少秒
                time:60 * hour + Number(minute)
            })
        })
        return lyricArr
    })
}