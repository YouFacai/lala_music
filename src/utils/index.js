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
        store.commit("Common/updatetableHeigh", e.currentTarget.innerHeight - 200)
        // 歌词高度
        store.commit("Common/updatelyricHeigh", e.currentTarget.innerHeight - 395);
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

// 防抖
export const debounce = function debounce(fn, interval, direction) {
    //定时器初始化为null	之后有没有设置定时器就看 timer是不是null
    let timer = null;
    //参数类型错误判断
    if (typeof fn !== 'function') throw new TypeError(`fn is not function!!!`);
    if (typeof interval === 'boolean') direction = interval;
    if (typeof direction !== 'boolean') direction = false;
    if (typeof interval !== 'number') interval = 500;
    return function execute(...args) {
        //头输出标记
        let ishead = direction === true && timer === null;
        timer = clearsetInterval(timer);
        timer = setTimeout(() => {
            //时间到了一定要清除定时器
            timer = clearsetInterval(timer);
            //然后判断是否要输出
            if (!direction) {
                fn.call(this, ...args);
                //如果direction 是true 这里不清理定时器头输出就只能用一次 因为timer！=null
            };
        }, interval)
        //头输出
        if (ishead) fn();
    }
}

// 判断是否是空对象
export const isEmptyObject = function isEmptyObject(obj) {
    var keys = Object.keys(obj);
    if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
    return keys.length === 0;
};

// 时间戳转换时间
// 时间戳变时间
export let convertTime = (timestamp) => {
    let date = new Date(Number(timestamp));
    let y = date.getFullYear(); // 年
    let MM = date.getMonth() + 1; // 月
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate(); // 日
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours(); // 时
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes(); // 分
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds(); // 秒
    s = s < 10 ? ('0' + s) : s;
    let cao = y + '-' + MM + '-' + d + ' ' + h + ':' + m;
    return cao
}