/**
 * 提示框
 * Created by pior on 15/10/28.
 */
var GameUtil;
(function (GameUtil) {
    var TipsPanel = (function (_super) {
        __extends(TipsPanel, _super);
        function TipsPanel(tipText) {
            this.tipText = tipText;
            _super.call(this);
        }
        var __egretProto__ = TipsPanel.prototype;
        __egretProto__.init = function () {
            this.tipbg = GameUtil.createBitmapByName("alertBg_png");
            this.tipbg.x = this.mStageW / 2;
            this.tipbg.y = this.mStageH / 2;
            this.addChild(this.tipbg);
            this.showtip();
            this.showbutton();
        };
        __egretProto__.showtip = function () {
            this.text = GameUtil.createTextField(this.mStageW / 2, this.mStageH / 2, 30);
            this.text.text = this.tipText;
            this.addChild(this.text);
        };
        __egretProto__.setTextwidth = function (width) {
            this.text.width = width;
        };
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
    })(GameUtil.BassPanel);
    GameUtil.TipsPanel = TipsPanel;
    TipsPanel.prototype.__class__ = "GameUtil.TipsPanel";
})(GameUtil || (GameUtil = {}));
