/**
 * 菜单，按钮类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    /*
     *创建按钮
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * 创建菜单按钮类
         * @param context {any} 按钮所在stage
         * @param normal {string} 按钮普通状态下的图片文件名
         * @param select {string} 按钮选中状态下的图片文件名
         * @param backFun {Function} 按钮绑定的事件函数
         * @param param {any[]} 按钮绑定的事件函数的参数
         */
        function Menu(context, normal, select, backFun, param) {
            if (backFun === void 0) { backFun = null; }
            if (param === void 0) { param = null; }
            _super.call(this);
            this.menuNormalTexture = null;
            this.menuSelectTexture = null;
            this.bScaleMode = false;
            this.mScale = 0.9;
            this.thisObj = context;
            this.param = param;
            this.init(normal, select, backFun);
        }
        var __egretProto__ = Menu.prototype;
        __egretProto__.init = function (normal, select, backFun) {
            if (backFun === void 0) { backFun = null; }
            this.anchorX = this.anchorY = 0.5;
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.backFun = backFun;
            this.btnImg = new egret.Bitmap();
            this.btnImg.texture = this.menuNormalTexture;
            this.addChild(this.btnImg);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.TouchCancel, this);
        };
        /**
         * 设置按钮的缩放模式，按钮状态只做缩放时可使用
         * @param scale {number} 缩放大小
         */
        __egretProto__.setScaleMode = function (scale) {
            if (scale === void 0) { scale = 0.9; }
            this.bScaleMode = true;
            this.mScale = scale;
        };
        __egretProto__.TouchBegin = function (event) {
            //console.log("touchbegin");
            this.btnImg.texture = this.menuSelectTexture;
            if (this.bScaleMode) {
                this.btnImg.scaleX = this.btnImg.scaleY = this.mScale;
            }
        };
        __egretProto__.TouchMove = function (event) {
            //console.log("touchmove");
        };
        __egretProto__.TouchEnd = function (event) {
            //console.log("touchend");
            this.btnImg.texture = this.menuNormalTexture;
            if (this.bScaleMode) {
                this.btnImg.scaleX = this.btnImg.scaleY = 1;
            }
            this.backFun.apply(this.thisObj, this.param);
        };
        __egretProto__.TouchCancel = function (event) {
            //console.log("touchcancel");
            this.btnImg.texture = this.menuNormalTexture;
            if (this.bScaleMode) {
                this.btnImg.scaleX = this.btnImg.scaleY = 1;
            }
        };
        return Menu;
    })(egret.DisplayObjectContainer);
    GameUtil.Menu = Menu;
    Menu.prototype.__class__ = "GameUtil.Menu";
})(GameUtil || (GameUtil = {}));
