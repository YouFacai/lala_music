<template>
    <div class="box">
        <router-view></router-view>
        <!--遮罩-->
        <div id="mmPlayer_bg" class="mmPlayer-bg"></div>
        <div class="mmPlayer-mask"></div>
    </div>
</template>
<script>
export default {
    setup() {},
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.box{
    width: 100%;
    height: 100%;
}
/*遮罩*/
.mmPlayer-mask,
.mmPlayer-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
}

.mmPlayer-mask {
    z-index: -1;
    background-color:rgba(0, 0, 0, 0.4);
}

.mmPlayer-bg {
    background-image: url("https://img1.baidu.com/it/u=2579940132,1296036844&fm=11&fmt=auto&gp=0.jpg");
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
    opacity: 0.7;
    transition: all 0.8s;
    transform: scale(1);
}
</style>
