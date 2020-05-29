# 懒加载插件

window.myPlugin.lazy(OBJECT)

OBJECT参数说明：
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|-------------|------------|-----| ----- | -----------  |
| defaultImg  | String     | 是  |       | 默认图片路径  |
| dataAttr    | String     | 否  | 'src' | 图片路径存放属性 |

> ## 使用方式
```html
<body>
    <img src="" alt="" data-src="img/1.jpg">
    <img src="" alt="" data-src="img/2.jpg">
</body>
```

使用 ```script``` 引入插件

```js
<script src="./lazy.js"></script>
<script>
    myPlugin.lazy({
        defaultImg: './img/timg.gif', // 必填项，指定图片默认路径
        dataAttr: 'src' // 选填，指定图片路径存放属性
    })
</script>
```

# 图片瀑布流插件

window.myPlugin.waterFall(OBJECT)

OBJECT参数说明：
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------- |-------  |-----| ----| -----------  |
| images   | Array   | 是  |     | 图片路径数组  |
| container| Element | 是  |     | 父级容器元素  |
| imgWidth | Number  | 否  | 220 | 图片宽度      |
| minGap   | Number  | 否  | 10  | 图片最小间隙  |
| sideSpace| Boolean | 否  | true| 容器两边是否留空 |

> ## 使用方式
```html
<body>
    <div class="container"></div>
</body>
```

使用 ```script``` 引入插件

```js
<script src="./waterFall.js"></script>
<script>
    // 图片路径数组
    const images = ['./img/1.jpg','./img/2.jpg','./img/3.jpg'];
    // 父级容器
    const container = document.querySelector('.container');

    myPlugin.waterFall({
        container,
        images
     })
</script>
```

# plugin.js - 常用插件

常用插件：
| 函数名 | 说明 |
|--------- |-------  |
| myPlugin.debounce   | 函数防抖   |
| myPlugin.throttle   | 函数节流 |
| myPlugin.curry | 柯里化 |
| myPlugin.pipe    | 函数管道  |

> ## 使用事项
使用 ```script``` 引入插件
```js
<script src="./plugin.js"></script>
```
> 函数防抖：等待多少毫秒无反应后才执行回调，如果重复运行则重新开启计时器

```myPlugin.debounce(cb, time, that)``` 参数说明：
| 参数名 | 类型 | 必填 |  默认值  | 说明 |
|------|------------|-----| --- | ---- |
| cb   | Function   | 是  |     | 回调函数 | 
| time | Number     | 是  |     | 延迟毫秒 |
| time | Object     | 否  |null | this指向 |

> 函数节流：多少毫秒内只执行一次

```myPlugin.throttle(cb, time, immediately)``` 参数说明：
| 参数名 | 类型 | 必填 |  默认值  | 说明 |
|------|------------|-----| --- | ---- |
| cb   | Function   | 是  |     | 回调函数 |
| time | Number     | 是  |     | 延迟毫秒 |
| immediately | Boolean  | 否  |true | 第一次是否立即执行 |

> 柯里化：固定某个函数的一些参数，返回该函数剩余参数的一个新函数，没有剩余参数，则调用

```myPlugin.curry(func, ...params)``` 参数说明：
| 参数名 | 类型 | 必填 |  默认值  | 说明 |
|------|------------|-----| --- | ---- |
| func   | Function   | 是  |     | 执行函数 |
| params | and     | 否  |     | 剩余参数 |

> 函数管道：将多个单参函数组合起来，形成一个新的函数，这些函数中，前一个的返回值为下一个的参数值

```myPlugin.pipe(...func)``` 参数说明：
| 参数名 | 类型 | 必填 |  说明 |
|------|------------|-----| ---- |
| func   | and   | 是  | 执行函数 |