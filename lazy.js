// 懒加载插件
if (!window.myPlugin) {
    window.myPlugin = {}
}

window.myPlugin.lazy = function (options) {
    let defaultOption = {
        defaultImg: '',
        dataAttr: 'src'
    }
    // 混合配置
    options = { ...defaultOption, ...options };
    if (!options.defaultImg) {
        throw new Error(`lazy插件需要一个默认图片路径 - 属性值：defaultImg`)
    }
    // 图片数组
    let imgArr = [];

    // 初始化图片
    initImg();
    // 加载图片
    loadImgs();
    let handle = myPlugin.debounce(_ => loadImgs(), 300);
    // 监听滚动条变化
    window.addEventListener('scroll', handle);

    /**
     * 加载可视区域的图片
     */
    function loadImgs() {
        if(imgArr.length == 0 || imgArr == null){
            return;
        }
        for (let i = 0; i < imgArr.length; i++) {
            if(isVisibility(imgArr[i])){
                // 已加载的图片剔除出数组
                imgArr.splice(i, 1);
                i--;
            };
        }
    }

    /**
     * 判断当前图片是否在可视区域内
     * @param {*} img 
     */
    function isVisibility(img) {
        // 得到可视区域宽高
        let vw = document.documentElement.clientWidth;
        let vh = document.documentElement.clientHeight;
        // 得到当前图片的坐标信息
        let info = img.getBoundingClientRect();
        if (info.left < vw && info.right > 0 && info.top < vh && info.bottom > 0){
            // 加载图片
            img.src = img.dataset[options.dataAttr];
            return true;
        }
        return false;
    }
    isVisibility(imgArr[0])


    /**
     * 初始化图片 - 给每个图片一个默认图片
     */
    function initImg(imgSrc) {
        let imgs = document.querySelectorAll(`[data-${options.dataAttr}]`);
        if (imgs.length == 0 || imgs == null) {
            return;
        }
        imgArr = Array.from(imgs);
        imgArr.forEach(img => img.src = options.defaultImg);
    }
}