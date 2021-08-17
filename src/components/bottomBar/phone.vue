<template>
    <div class="bottombar">
        <!-- 音乐信息 进度条 -->
        <div class="MusicMSG">
            <div class="MusicMSG_top">
                <div class="MusicMSG_top_name">歌名</div>
                <div class="MusicMSG_top_time">时间</div>
            </div>
            <!-- 进度条 -->
            <div class="progress">
                <div class="progress_circle"></div>
            </div>
        </div>
        <!-- 控制台 -->
        <div class="control">
            <div class="control_btn">
                <span class="iconfont icon-shunxubofang"></span>
            </div>
            <div class="control_btn">
                <span class="iconfont icon-shangyishou"></span>
            </div>
            <div class="control_btn">
                <span class="iconfont icon-bofang"></span>
            </div>
            <div class="control_btn">
                <span class="iconfont icon-xiayishou"></span>
            </div>
            <div class="control_btn">
                <span class="iconfont icon-pinglun"></span>
            </div>
        </div>
    </div>
</template>

<script>
import "./common.less";
export default {
    setup() {
        return {};
    },
};
</script>

<style scoped lang="less">
.control {
    // position: absolute;
    display: flex;

    .control_btn {
        flex: 1;
        text-align: center;

        .iconfont {
            font-size: 40px;
            color: white;
        }
    }
}

.MusicMSG {
    position: relative;
    margin-bottom: 10px;
    padding: 0 13px;

    .MusicMSG_top {
        display: flex;
        position: relative;
        color: white;

        .MusicMSG_top_name {
            flex: 1;
            text-align: left;
            font-size: 17px;
        }

        .MusicMSG_top_time {
            font-size: 17px;
            flex: 1;
            text-align: right;
        }
    }

    // 进度条
    .progress {
        position: relative;
        margin-top: 4px;
        height: 2px;
        background-color: white;

       .progress_circle {
           position: absolute;
           top: -4px;
           width:10px;
           height: 10px;
           border-radius: 50%;
           background-color: white;
       } 
    }
}
</style>
