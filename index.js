// ========================================
// 奥咪小手机 - SillyTavern Extension
// ========================================

const CONTAINER_ID = 'aomi-phone-container';
const PHONE_ID = 'aomi-phone-frame';


// ========================================
// 获取手机 HTML 的正确地址
// ========================================

const PHONE_URL = new URL(
    './aomi-phone.html',
    import.meta.url
).href;


// ========================================
// 创建手机
// ========================================

function createPhone() {

    // 防止重复创建
    if (document.getElementById(CONTAINER_ID)) {
        console.log('[奥咪小手机] 手机已经存在');
        return;
    }

    console.log('[奥咪小手机] 扩展已启动');
    console.log('[奥咪小手机] 手机地址：', PHONE_URL);


    // ------------------------------
    // 外层容器
    // ------------------------------

    const container = document.createElement('div');

    container.id = CONTAINER_ID;

    container.style.position = 'fixed';
    container.style.right = '20px';
    container.style.bottom = '20px';

    container.style.width = '280px';
    container.style.height = '500px';

    container.style.zIndex = '999999';

    container.style.pointerEvents = 'auto';


    // ------------------------------
    // iframe
    // ------------------------------

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


    // ------------------------------
    // iframe 加载成功
    // ------------------------------

    iframe.addEventListener('load', () => {

        console.log(
            '[奥咪小手机] aomi-phone.html 加载成功'
        );

    });


    // ------------------------------
    // iframe 加载失败
    // ------------------------------

    iframe.addEventListener('error', (error) => {

        console.error(
            '[奥咪小手机] aomi-phone.html 加载失败',
            error
        );

    });


    // ------------------------------
    // 加入页面
    // ------------------------------

    container.appendChild(iframe);

    document.body.appendChild(container);


    console.log(
        '[奥咪小手机] 手机容器创建成功'
    );
}


// ========================================
// 删除手机
// ========================================

function removePhone() {

    const container =
        document.getElementById(CONTAINER_ID);

    if (!container) {
        return;
    }

    container.remove();

    console.log(
        '[奥咪小手机] 手机已关闭'
    );
}


// ========================================
// 开关手机
// ========================================

function togglePhone() {

    if (
        document.getElementById(CONTAINER_ID)
    ) {

        removePhone();

    } else {

        createPhone();
    }
}


// ========================================
// 暴露给其他代码
// ========================================

window.AomiPhone = {

    open: createPhone,

    close: removePhone,

    toggle: togglePhone

};


// ========================================
// 启动
// ========================================

if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        createPhone,
        {
            once: true
        }
    );

} else {

    createPhone();

}
