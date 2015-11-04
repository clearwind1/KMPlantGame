/**
 * 参框
 * Created by pior on 15/11/4.
 */
var PlantGame;
(function (PlantGame) {
    var GinsengBasketPanel = (function (_super) {
        __extends(GinsengBasketPanel, _super);
        function GinsengBasketPanel() {
            _super.call(this);
        }
        var __egretProto__ = GinsengBasketPanel.prototype;
        __egretProto__.init = function () {
            this.touchEnabled = true;
            var cover = GameUtil.createRect(0, 0, 480, 800, 0.4);
            this.addChild(cover);
            var ginsengFrame = GameUtil.createBitmapByName("alertBg_png");
            ginsengFrame.x = this.mStageW / 2;
            ginsengFrame.y = this.mStageH / 2;
            this.addChild(ginsengFrame);
            var data = RES.getRes("describeURL_json");
            for (var i = 0; i < 6; i++) {
                var ginseng = new GameUtil.Menu(this, "returnbtn_png", "returnbtn_png", this.showginseng, [data[i]]);
                ginseng.setScaleMode();
                ginseng.x = 170 + 70 * (i % 3);
                ginseng.y = 370 + 60 * Math.floor(i / 3);
                this.addChild(ginseng);
                var gsnumber = GameUtil.createTextField(200 + 70 * (i % 3), 400 + 60 * Math.floor(i / 3), 15);
                gsnumber.text = "" + i;
                this.addChild(gsnumber);
            }
            var closebtn = new GameUtil.Menu(this, "cancelBtn_png", "cancelBtn_png", this.close);
            closebtn.setScaleMode();
            closebtn.x = 410;
            closebtn.y = 280;
            this.addChild(closebtn);
        };
        __egretProto__.showginseng = function (data) {
            console.log("data========", data['url']);
            window.open(data['url']);
        };
        __egretProto__.close = function () {
            this.parent.removeChild(this);
        };
        return GinsengBasketPanel;
    })(GameUtil.BassPanel);
    PlantGame.GinsengBasketPanel = GinsengBasketPanel;
    GinsengBasketPanel.prototype.__class__ = "PlantGame.GinsengBasketPanel";
})(PlantGame || (PlantGame = {}));
