import { ElLoading } from 'element-plus'
import instance from '@/utils/http.js'
import store from '@/store/index.js'
//登录
const login = function () {
    instance.get(`/api/login/cellphone?phone=19884687266&password=yzl197543`)
}
login()

// 正在播放
export const playingData = function (DOM) {
    let i = 1;
    let loadingInstance = ElLoading.service({
        target: DOM,
        lock: true,
        text: '玩命加载中',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    return instance.get("/api/recommend/songs").then((res) => {
        loadingInstance.close()
        res.data.dailySongs.index = i++;
        res.data.dailySongs.forEach((item, index) => {
            item.singerss = "";
            item.index = index;
            item.ar.forEach((item2) => {
                item.singerss += item2.name + "/";
            });
            item.singerss = item.singerss.slice(0, item.singerss.length - 1);
        });
        // 存一份到vuex 
        store.commit("Music/setallMusic", res.data.dailySongs);
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
                time: 60 * hour + Number(minute)
            })
        })
        return lyricArr
    })
}

// 热搜列表
export const gethotSelect = function () {
    return instance.get('/api/search/hot/detail').then((res) => {
        return res.data.slice(0, 5)
    })
}

// 搜索歌曲
export const getMusic = function (msg, DOM) {
    let loadingInstance = ElLoading.service({
        target: DOM,
        lock: true,
        text: '玩命加载中',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    return instance.get(`/api/cloudsearch?keywords=${msg}`).then((res) => {
        loadingInstance.close()
        if (res.result) {
            res.result.songs.forEach((item, index) => {
                item.index = index;
                item.singerss = "";
                item.ar.forEach((item2) => {
                    item.singerss += item2.name + "/";
                });
                item.singerss = item.singerss.slice(0, item.singerss.length - 1);
            })
            return res.result.songs
        }
        return []
    })
}

// 获得Mv url 
export const getMvUrl = function (msg) {
    return instance.get(`api/mv/url?id=${msg}&r=1080`).then(res => {
        return res.data
    })
}

// 获得歌曲评论
export const getMusicDiscuss = function (id,DOM) {
    let loadingInstance = ElLoading.service({
        target: DOM,
        lock: true,
        text: '玩命加载中',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    return instance.get(`api/comment/new?type=0&id=${id}`).then(res => {
        loadingInstance.close()
        return res.data.comments
    })
}

// 获得榜单
export const getHotlist = function () {
    return instance.get(`/api/toplist`).then(res => {
        return res
    })
}

// 获取热门歌单
export const getHotsongList = function () {
    return instance.get(`/api/top/playlist/highquality?before=1503639064232&limit=100`).then(res => {
        return res.playlists
    })
}

// 获得歌单的详细
export const getListDetail = function (id, DOM) {
    let loadingInstance = ElLoading.service({
        target: DOM,
        lock: true,
        text: '玩命加载中',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    return instance.get(`/api/playlist/detail?id=${id}`).then(res => {
        loadingInstance.close()
        res.playlist.tracks.forEach((item, index) => {
            item.singerss = "";
            item.index = index;
            item.ar.forEach((item2) => {
                item.singerss += item2.name + "/";
            });
            item.singerss = item.singerss.slice(0, item.singerss.length - 1);
        });
        return res.playlist.tracks
    })
}

// 获取音乐Src
export const getMusicSrc = function (id){
    return instance.get(`/api/song/url?id=${id}`).then(res => {
        return res.data[0]
    })
}