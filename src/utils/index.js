import { getLyric } from "@/api/index.js";
import store from '@/store/index.js'
// 清除定时器
export const clearsetInterval = function (timer) {
    clearInterval(timer)
    return null
}

// 秒转分钟
export const secondTO = function (time) {
    let minute = Math.floor(time / 60) > 10 ? Math.floor(time / 60) : '0' + Math.floor(time / 60),
        second = time - Number(minute) * 60 >= 10 ? time - Number(minute) * 60 : '0' + (time - Number(minute) * 60);
    return minute + ":" + second
}

// 监听页面的缩放
export const screenZoom = function (store) {
    const calculateSize = function (e) {
        // 路由高度
        store.commit("Common/updatetableHeigh",e.currentTarget.innerHeight - 200)
        // 歌词高度
        store.commit("Common/updatelyricHeigh",e.currentTarget.innerHeight - 395);
    }
    window.addEventListener('DOMContentLoaded', calculateSize)
    window.addEventListener('resize', calculateSize)
}

// 播放 and 切换
export const PS = function (musicMsg) {
    return function () {
        // 种到 vuex
        store.commit("Music/updateMusicMsg", musicMsg);
        store.commit("Music/updatecurrentTime", { type: true });

        coreAudio.src = `https://music.163.com/song/media/outer/url?id=${musicMsg.id}.mp3`;
        // 右侧小图片改变
        smallIMG.src = musicMsg.al.picUrl;
        // 全景图片改变
        mmPlayer_bg.style.backgroundImage = `url(${musicMsg.al.picUrl})`;

        getLyric(musicMsg.id).then((res) => {
            store.commit("Music/updateLyric", res);
        });

        if (typeof allLyrics != "undefined") {
            allLyrics.style.top = 0 + "px";
        }
        // 全局的节点
        let playBtn_PS = Array.from(
            document.getElementById("playBtn_PS").classList
        ).indexOf("icon-zanting");
        // 如果自己不是 暂停
        document
            .getElementById("playBtn_PS")
            .classList.remove("icon-bofang");
        document
            .getElementById("playBtn_PS")
            .classList.add("icon-zanting");
    };
};