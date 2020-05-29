// 瀑布流插件
window.myPlugin.waterFall = function (options) {
    // 默认配置
    const defaultOption = {
        imgWidth: 220,
        images: [],
        minGap: 10,
        container: null,
        sideSpace: true // 两边是否留空
    }
    
    // 混合配置
    options = {
        ...defaultOption,
        ...options
    }

    // 图片元素集合
    const imgs = [];

    // 数组为空直接返回
    if (options.images.length == 0) {
        throw new Error(`waterFall插件缺少图片信息 - 属性值：images`);
    }

    if (options.container == null) {
        throw new Error(`waterFall插件缺少一个父级容器 - 属性值：container`);
    }

    // 判断父级是否有定位
    setParent();
    // 根据图片数组创建图片
    createImg();
    // 监听窗口尺寸改变
    let debounce = myPlugin.debounce(setCoordinate, 300);
    window.onresize = debounce;

    // 设置图片的坐标位置
    function setCoordinate() {
        // 得到图片水平方向上的信息
        let info = getHorizontalInfo();
        // 列数
        let column = new Array(info.number);
        column.fill(0);

        imgs.forEach(img => {
            let min = Math.min(...column); // 得到每列中最小的值
            let index = column.indexOf(min); // 找到最小值下标
            let top = min + 'px'; // 图片top值
            let left;
            if (options.sideSpace) {
                left = (index * info.gap) + info.gap + (index * options.imgWidth) + 'px';
            } else {
                left = (index * info.gap) + (index * options.imgWidth) + 'px';
            }
            img.style.top = top;
            column[index] += img.clientHeight + info.gap;
            img.style.left = left;
        })

        let maxHeight = Math.max(...column);
        options.container.style.height = maxHeight - info.gap + 'px';
    }

    // 得到图片水平方向上的信息
    function getHorizontalInfo() {
        let obj = {};
        // 容器宽度
        obj.containerWidth = options.container.clientWidth;
        // 列数 // 行间隔
        if (options.sideSpace) {
            obj.number = Math.floor((obj.containerWidth + options.minGap) / (options.imgWidth + options.minGap));
            obj.gap = (obj.containerWidth - obj.number * options.imgWidth) / (obj.number + 1);
        } else {
            obj.number = Math.floor((obj.containerWidth - options.minGap) / (options.imgWidth + options.minGap));
            obj.gap = (obj.containerWidth - obj.number * options.imgWidth) / (obj.number - 1);
        }
        return obj;
    }

    // 根据图片数组创建图片
    function createImg() {
        let debounce = myPlugin.debounce(setCoordinate, 50);
        options.images.forEach(imgSrc => {
            let img = document.createElement('img');
            img.src = imgSrc; // 图片链接

            // 设置图片样式
            img.style.width = options.imgWidth + 'px';
            img.style.position = 'absolute';
            img.style.transition = '.5s';

            img.onload = debounce; // 函数防抖

            imgs.push(img);
            options.container.appendChild(img);
        })
    }

    // 判断父级是否有定位
    function setParent() {
        let style = getComputedStyle(options.container);
        if (style.position === 'static') {
            options.container.style.position = 'relative';
        }
    }

}