(function () {
    'use strict';

    // ==============================
    // 奥咪小手机 SillyTavern 扩展
    // ==============================

    const CONTAINER_ID = 'aomi-phone-container';
    const PHONE_ID = 'aomi-phone-frame';

    // 获取当前扩展 index.js 所在目录
    const currentScript = document.currentScript;

    let extensionBaseUrl;

    if (currentScript && currentScript.src) {
        extensionBaseUrl = new URL('./', currentScript.src);
    } else {
        extensionBaseUrl = new URL(
            './',
            window.location.href
        );
    }

    const PHONE_URL = new URL(
        'aomi-phone.html',
        extensionBaseUrl
    ).href;


    // ==============================
    // 创建手机
    // ==============================

    function createPhone() {

        // 防止重复创建
        if (document.getElementById(CONTAINER_ID)) {
            console.log('[奥咪小手机] 手机已经存在');
            return;
        }

        console.log('[奥咪小手机] 正在加载：', PHONE_URL);

        // 外层容器
        const container = document.createElement('div');

        container.id = CONTAINER_ID;

        container.style.position = 'fixed';
        container.style.right = '20px';
        container.style.bottom = '20px';
        container.style.width = '280px';
        container.style.height = '500px';
        container.style.zIndex = '999999';
        container.style.pointerEvents = 'auto';

        // iframe
        const iframe = document.createElement('iframe');

        iframe.id = PHONE_ID;

        iframe.src = PHONE_URL;

        iframe.title = '奥咪小手机';

        iframe.setAttribute(
            'allow',
            'autoplay'
        );

        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.display = 'block';
        iframe.style.background = 'transparent';

        // 加载成功
        iframe.addEventListener('load', function () {

            console.log(
                '[奥咪小手机] 手机 HTML 加载成功'
            );

        });

        // 加载失败
        iframe.addEventListener('error', function (error) {

            console.error(
                '[奥咪小手机] 手机 HTML 加载失败',
                error
            );

        });

        container.appendChild(iframe);

        document.body.appendChild(container);

        console.log(
            '[奥咪小手机] 手机已创建'
        );
    }


    // ==============================
    // 删除手机
    // ==============================

    function removePhone() {

        const container =
            document.getElementById(
                CONTAINER_ID
            );

        if (container) {

            container.remove();

            console.log(
                '[奥咪小手机] 手机已关闭'
            );
        }
    }


    // ==============================
    // 开关
    // ==============================

    function togglePhone() {

        if (
            document.getElementById(
                CONTAINER_ID
            )
        ) {

            removePhone();

        } else {

            createPhone();
        }
    }


    // ==============================
    // 暴露控制接口
    // ==============================

    window.AomiPhone = {

        open: createPhone,

        close: removePhone,

        toggle: togglePhone
    };


    // ==============================
    // 初始化
    // ==============================

    function init() {

        console.log(
            '[奥咪小手机] 扩展初始化'
        );

        if (document.body) {

            createPhone();

        } else {

            window.addEventListener(
                'DOMContentLoaded',
                createPhone,
                {
                    once: true
                }
            );
        }
    }


    init();

})();
