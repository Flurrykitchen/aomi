(function () {
    'use strict';

    const EXTENSION_ID = 'aomi-phone-extension';
    const PHONE_ID = 'aomi-phone-frame';
    const CONTAINER_ID = 'aomi-phone-container';

    function getPhoneUrl() {
        return new URL('./aomi-phone.html', document.currentScript?.src || window.location.href).href;
    }

    function createPhone() {
        // 防止重复加载
        if (document.getElementById(CONTAINER_ID)) {
            return;
        }

        const container = document.createElement('div');
        container.id = CONTAINER_ID;

        Object.assign(container.style, {
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            width: '280px',
            height: '500px',
            zIndex: '999999',
            pointerEvents: 'auto'
        });

        const iframe = document.createElement('iframe');
        iframe.id = PHONE_ID;
        iframe.src = getPhoneUrl();

        Object.assign(iframe.style, {
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            background: 'transparent'
        });

        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('title', '奥咪小手机');

        container.appendChild(iframe);
        document.body.appendChild(container);

        console.log('[奥咪小手机] 手机加载完成');
    }

    function removePhone() {
        const container = document.getElementById(CONTAINER_ID);

        if (container) {
            container.remove();
            console.log('[奥咪小手机] 手机已关闭');
        }
    }

    function init() {
        console.log('[奥咪小手机] 扩展初始化');

        // 等待 SillyTavern 页面主体加载完成
        if (document.body) {
            createPhone();
        } else {
            window.addEventListener('DOMContentLoaded', createPhone, {
                once: true
            });
        }
    }

    // 暴露简单控制接口，后面我们做扩展按钮时会用到
    window.AomiPhone = {
        open: createPhone,
        close: removePhone,
        toggle: function () {
            if (document.getElementById(CONTAINER_ID)) {
                removePhone();
            } else {
                createPhone();
            }
        }
    };

    init();
})();
