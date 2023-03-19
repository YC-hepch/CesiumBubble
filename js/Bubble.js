/*
 * @Descripttion: file content
 * @version: 1.0
 * @Author: 予程_hepch
 * @Date: 2022-02-21 17:44:05
 * @LastEditors: 予程_hepch
 * @LastEditTime: 2022-03-01 14:47:13
 * @Copyright: 超图软件华中平台客户中心 (SuperMap Software Co., Ltd. -Central China Platform)
 */
/**
 * @Description: 
 * @User: 予程_hepch(1336327352@qq.com)
 * @Date: 2022-03-01 14:40:38
 * @param {*} viewer cesium.viewer
 * @param {*} options {
        maxWidth: 300, 气泡内容div最大宽度
        minWidth: 100, 气泡内容div最小宽度
        maxHeight: 300 气泡内容容器最大高度
  }
 */
var Popup = function Bubble(viewer, options) {
    this.viewer = viewer;
    this.int = int;
    this.showInfo = showInfo;
    var defultoptions = {
        maxWidth: 300,
        minWidth: 100,
        maxHeight: 300,
    };
    this.options = defultoptions;
    this.int(viewer, options);
    function addDom() {
        const container = getPopupInContainter();
        if (container) {
            const popupContainer = document.createElement("div");
            popupContainer.style.display = "none";
            popupContainer.className = "supermap-cesium-popup";
            const html =
                "<div class='popup-header'><img class='popup-close' width=20, height=20 src='../imgs/close.png'></img></div><div class='supermapcesium-popup-content'></div><div class='popup-footer'></div>";
            popupContainer.innerHTML = html;
            container.appendChild(popupContainer);
        }
    }
    function addMapViewerChangeListener(cartesian3) {
        let scene = this.viewer.scene;
        scene.postRender.addEventListener(function () {
            if (cartesian3) {
                calculatePostion(cartesian3);
            }
        });
    }
    function calculatePostion(cartesian3) {
        if (cartesian3) {
            let canvasHeight = this.viewer.scene.canvas.height;
            let windowPosition = new Cesium.Cartesian2();
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                this.viewer.scene,
                cartesian3,
                windowPosition
            );
            let element = getPopupPaneElement();
            if (element) {
                element.style.bottom = canvasHeight - windowPosition.y + 15 + "px";
                element.style.left = windowPosition.x - element.clientWidth / 2 + "px";
            }
        }
    }
    /**
     * @Description: 
     * @User: 予程_hepch(1336327352@qq.com)
     * @Date: 2022-03-01 14:46:22
     * @param {*} htmlTemplate html模板
     * @param {*} cartesian3 笛卡尔坐标{x,y,z}
     */
    function showInfo(htmlTemplate, cartesian3) {
        let element = getPopupContentElement();
        if (element) {
            let elementA = getPopupPaneElement();
            if (elementA) {
                element.innerHTML = "";
                element.innerHTML = htmlTemplate;
                show(elementA);
                calculatePostion(cartesian3);
                addMapViewerChangeListener(cartesian3);
            }
        }
    }
    function addCloseListener() {
        let closeElement = getPopupCloseElement();
        if (closeElement) {
            closeElement.onclick = () => {
                let element = getPopupPaneElement();
                hide(element);
                this.cartesian3 = undefined;
            };
        }
    }
    function getPopupContentElement() {
        let element = document.getElementsByClassName(
            "supermapcesium-popup-content"
        );
        if (element && element[0]) {
            return element[0];
        }
        return undefined;
    }
    function getPopupPaneElement() {
        let element = document.getElementsByClassName("supermap-cesium-popup");
        if (element && element[0]) {
            return element[0];
        }
        return undefined;
    }
    function getPopupCloseElement() {
        let element = document.getElementsByClassName("popup-close");
        if (element && element[0]) {
            return element[0];
        }
        return undefined;
    }
    function getPopupInContainter() {
        let element = document.getElementsByClassName("cesium-viewer");
        if (element && element[0]) {
            return element[0];
        }
        return undefined;
    }
    function setOptions(options) {
        for (let key in options) {
            defultoptions[key] ? (defultoptions[key] = options[key]) : "";
        }
    }
    function setPopupContentStyle() {
        let element = getPopupContentElement();
        if (element) {
            element.style.minWidth =
                defultoptions.minWidth > 60 ? `${defultoptions.minWidth}px` : "";
            element.style.maxHeight =
                defultoptions.maxHeight > 60 ? `${defultoptions.maxHeight}px` : "";
            element.style.maxWidth =
                defultoptions.maxWidth > 60 ? `${defultoptions.maxWidth}px` : "";
        }
    }
    function removePopupObject() { }
    function hide(element) {
        element.style.display = "none";
    }
    function show(element) {
        element.style.display = "block";
    }
    function int(viewer, options) {
        setOptions(options);
        addDom(viewer);
        addCloseListener();
        setPopupContentStyle();
    }
};
