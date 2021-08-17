<template>
    <div class="menus">
        <el-button class="active">正在播放</el-button>
        <el-button>推荐</el-button>
        <el-button>歌词</el-button>
        <el-button>MV</el-button>
        <el-button>搜索</el-button>
    </div>
</template>

<script>
export default {
    setup() {
        return {

        };
    },
};
</script>

<style lang='less' scoped>
.menus {
    display: flex;
    overflow: auto;
    padding: 20px;
    margin-right: 10px;
}

.el-button {
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.6);
}

.active {
    color: white;
    border: 1px solid white;
}
</style>
