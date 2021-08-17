<template>
    <div class="topbar">
        <div class="left_context">lala 在线音乐播放器</div>
        <div class="login">登录</div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    setup() {
        let state = reactive({
            // name:'yzl'
        });
        return {
            ...toRefs(state),
        };
    },
};
</script>

<style lang="less" scoped>
    .topbar {
        position: relative;
        display: flex;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        padding: 14px 12px;
        align-items: center;

        .left_context {
            font-size: 22px;
            color: white;
        }

        .login {
            position: absolute;
            right: 30px;
            font-size: 17px;
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>>
