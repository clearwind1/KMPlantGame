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
            var ginsengFrame = GameUtil.createBitmapByName("ItemFrame_png");
            ginsengFrame.x = this.mStageW / 2;
            ginsengFrame.y = this.mStageH / 2;
            this.addChild(ginsengFrame);
            //名字
            var frameName = GameUtil.createTextField(240, 257, 25);
            frameName.text = "参筐";
            this.addChild(frameName);
            var data = RES.getRes("describeURL_json");
            var sengName = ["dangseng_png", "danseng_png", "dongyangseng_png", "gaoliseng_png", "shizhuseng_png", "xinkaiheseng_png"];
            for (var i = 0; i < 6; i++) {
                var ginseng = new GameUtil.Menu(this, sengName[i], sengName[i], this.showginseng, [data[i]]);
                ginseng.setScaleMode();
                ginseng.x = 100 + 140 * (i % 3);
                ginseng.y = 370 + 100 * Math.floor(i / 3);
                this.addChild(ginseng);
                var gsnumber = GameUtil.createTextField(140 + 140 * (i % 3), 390 + 100 * Math.floor(i / 3), 20);
                gsnumber.text = "" + PlantGame.GameData.getInstance().ginsendNum[i];
                gsnumber.textColor = 0x000000;
                this.addChild(gsnumber);
            }
            var closebtn = new GameUtil.Menu(this, "closebtn_png", "closebtn_png", this.close);
            closebtn.setScaleMode();
            closebtn.x = 450;
            closebtn.y = 275;
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
