// 根据环境选择less样式
export function facility(url) {
    if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
        require("@/styles/phone"+url)
    }else{
        require("@/styles/pc"+url)
    }
}