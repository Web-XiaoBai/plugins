if(!window.myPlugin){
    window.myPlugin = {};
}

/**
 * 函数防抖：等待多少毫秒无反应后才执行，如果重复运行则重新开启计时器
 * @param {*} cb 回调
 * @param {*} time 毫秒数
 * @param {*} that this指向
 */
window.myPlugin.debounce = function (cb, time, that = null) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            cb.apply(that, args);
        }, time)
    }
};

/**
 * 函数节流：多少毫秒内只执行一次
 * @param {*} cb 回调
 * @param {*} time 毫秒数
 * @param {*} immediately 第一次是否立即执行
 */
window.myPlugin.throttle = function (cb, time, immediately = true) {
    let now;
    let timer;
    return function (...args) {
        // 第一次立即执行，后续相差time才执行
        if (immediately) {
            // 当now为空或者与上一次的时间戳相差time毫秒才执行
            if (!now || Date.now() - now >= time) {
                cb.apply(null, [...args]);
                now = Date.now();
            }
        }
        // 延迟time执行 
        else {
            // 计时器有值不做任何操作
            if (!timer) {
                timer = setTimeout(() => {
                    cb.apply(null, [...args]);
                    timer = null;
                }, time)
            }
        }
    }
}

/**
 * 柯里化：固定某个函数的一些参数，返回该函数剩余参数的一个新函数，没有剩余参数，则调用
 * @param {*} func 函数
 * @param  {...any} args 参数
 */
window.myPlugin.curry = function (func, ...params) {
    if (typeof func !== 'function' || func == null) {
        throw new Error(`${func} type is not function`)
    };
    return (...args) => {
        let param = [...params, ...args];
        if (param.length === func.length) {
            return func.apply(null, param);
        } else {
            // 还有剩余参数，递归调用自己
            this.curry(func, param);
        }
    }
}

/**
 * 函数管道：将多个单参函数组合起来，形成一个新的函数，这些函数中，前一个的返回值为下一个的参数值
 * @param  {...any} args 多个单参函数
 */
window.myPlugin.pipe = function (...args) {
    return (param) => {
        let val = param;
        args.forEach(func => val = func(val));
        return val
    }
}

