/**
 * 提示框
 * Created by pior on 15/10/28.
 */
var GameUtil;
(function (GameUtil) {
    var TipsPanel = (function (_super) {
        __extends(TipsPanel, _super);
        /**
         * 创建一个提示框
         * @param tipimg 提示框图片名
         * @param tipText 提示文字
         * @param disp 是否自己消失
         * @param sec 自己消失时间
         */
        function TipsPanel(tipimg, tipText, disp, sec) {
            if (disp === void 0) { disp = false; }
            if (sec === void 0) { sec = 1200; }
            _super.call(this);
            this.textsize = 30;
            this.mStageW = egret.MainContext.instance.stage.stageWidth;
            this.mStageH = egret.MainContext.instance.stage.stageHeight;
            this.tipText = tipText;
            this.tipImg = tipimg;
            this.bDisappear = disp;
            this.disSecond = sec;
            this.init();
        }
        var __egretProto__ = TipsPanel.prototype;
        __egretProto__.init = function () {
            if (!this.bDisappear) {
                var coverbg = GameUtil.createRect(0, 0, 480, 800, 0.4);
                this.addChild(coverbg);
                this.touchEnabled = true;
            }
            this.tipbg = GameUtil.createBitmapByName(this.tipImg);
            this.tipbg.x = this.mStageW / 2;
            this.tipbg.y = this.mStageH / 2;
            this.addChild(this.tipbg);
            this.showtip();
            if (!this.bDisappear) {
                this.showbutton();
            }
            else {
                var tw = egret.Tween.get(this);
                tw.to({ alpha: 0 }, this.disSecond).call(this.close, this);
            }
        };
        /**
         * 显示提示文字
         */
        __egretProto__.showtip = function () {
            this.text = GameUtil.createTextField(this.mStageW / 2, this.mStageH / 2, this.textsize);
            this.text.text = this.tipText;
            this.text.textColor = 0x000000;
            this.addChild(this.text);
        };
        /**
         * 提示文字的长度
         * @param width 长度
         */
        __egretProto__.setTextwidth = function (width) {
            this.text.width = width;
        };
        /**
         * 提示文字字体大小
         * @param size 尺寸
         */
        __egretProto__.setTextSize = function (size) {
            this.text.size = size;
        };
        /**
         * 显示确认按钮
         */
        __egretProto__.showbutton = function () {
            var surebtn = new GameUtil.Menu(this, "acceptBtn_png", "acceptBtn_png", this.close);
            surebtn.x = this.mStageW / 2;
            surebtn.y = this.mStageH / 2 + this.tipbg.texture.textureHeight / 2;
            this.addChild(surebtn);
            surebtn.setScaleMode();
        };
        __egretProto__.close = function () {
            this.parent.removeChild(this);
        };
        return TipsPanel;
    })(egret.DisplayObjectContainer);
    GameUtil.TipsPanel = TipsPanel;
    TipsPanel.prototype.__class__ = "GameUtil.TipsPanel";
})(GameUtil || (GameUtil = {}));
