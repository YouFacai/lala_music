<template>
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
    </div>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style scoped>
.spinner {
    margin: 100px auto;
    width: 20px;
    height: 30px;
    text-align: center;
    font-size: 10px;
}

.spinner > div {
    background-color: white;
    height: 60%;
    width: 3px;
    margin-right: 1px;
    display: inline-block;
    
}

.spinner .rect1 {
    -webkit-animation-delay: -0.2s;
    -webkit-animation: stretchdelay 0.6s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -0.2s;
    -webkit-animation: stretchdelay 0.8s infinite ease-in-out;
}

.spinner .rect3 {
       -webkit-animation-delay: -0.2s;
    -webkit-animation: stretchdelay 0.6s infinite ease-in-out;
}

@-webkit-keyframes stretchdelay {
    0%,
    40%,
    100% {
        -webkit-transform: scaleY(0.4);
    }
    20% {
        -webkit-transform: scaleY(1);
    }
}

@keyframes stretchdelay {
    0%,
    40%,
    100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1);
        -webkit-transform: scaleY(1);
    }
}
</style>
