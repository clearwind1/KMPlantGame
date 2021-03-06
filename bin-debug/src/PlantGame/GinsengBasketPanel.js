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
            var getsengName = ["高丽参", "党参", "丹参", "石柱参", "东洋参", "新开河参"];
            var sengName = ["gaoliseng_png", "dangseng_png", "danseng_png", "shizhuseng_png", "dongyangseng_png", "xinkaiheseng_png"];
            for (var i = 0; i < 6; i++) {
                var ginsengitemframe = GameUtil.createBitmapByName("gingsenitemFrame_png");
                ginsengitemframe.x = 111 + 132 * (i % 3);
                ginsengitemframe.y = 353 + 116 * Math.floor(i / 3);
                this.addChild(ginsengitemframe);
                var ginseng = new GameUtil.Menu(this, sengName[i], sengName[i], this.showginseng, [data[i]]);
                ginseng.setScaleMode();
                ginseng.x = 111 + 132 * (i % 3);
                ginseng.y = 353 + 116 * Math.floor(i / 3);
                this.addChild(ginseng);
                var gsnumber = GameUtil.createTextField(143 + 132 * (i % 3), 370 + 120 * Math.floor(i / 3), 20);
                gsnumber.text = "" + PlantGame.GameData.getInstance().ginsendNum[i];
                gsnumber.textColor = 0x000000;
                this.addChild(gsnumber);
                var ginsengName = GameUtil.createTextField(111 + 132 * (i % 3), 410 + 116 * Math.floor((i / 3)), 20);
                ginsengName.text = getsengName[i];
                ginsengName.textColor = 0x000000;
                this.addChild(ginsengName);
            }
            var closebtn = new GameUtil.Menu(this, "closebtn_png", "closebtn_png", this.close);
            closebtn.setScaleMode();
            closebtn.x = 450;
            closebtn.y = 275;
            this.addChild(closebtn);
        };
        __egretProto__.showginseng = function (data) {
            console.log("data========", data['url']);
            window.location.href = data['url'];
        };
        __egretProto__.close = function () {
            this.parent.removeChild(this);
        };
        return GinsengBasketPanel;
    })(GameUtil.BassPanel);
    PlantGame.GinsengBasketPanel = GinsengBasketPanel;
    GinsengBasketPanel.prototype.__class__ = "PlantGame.GinsengBasketPanel";
})(PlantGame || (PlantGame = {}));
