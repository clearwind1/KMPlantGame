/**
 * 奖励
 * Created by pior on 15/11/4.
 */
var PlantGame;
(function (PlantGame) {
    var RewardPanel = (function (_super) {
        __extends(RewardPanel, _super);
        function RewardPanel() {
            _super.call(this);
        }
        var __egretProto__ = RewardPanel.prototype;
        __egretProto__.init = function () {
            this.touchEnabled = true;
            var cover = GameUtil.createRect(0, 0, 480, 800, 0.4);
            this.addChild(cover);
            var Frame = GameUtil.createBitmapByName("alertBg_png");
            Frame.x = this.mStageW / 2;
            Frame.y = this.mStageH / 2;
            this.addChild(Frame);
            var data = RES.getRes("describeURL_json");
            for (var i = 0; i < 6; i++) {
                var reward = new GameUtil.Menu(this, "returnbtn_png", "returnbtn_png", this.showginseng, [data[i]]);
                //reward.setScaleMode();
                reward.x = 170 + 70 * (i % 3);
                reward.y = 370 + 60 * Math.floor(i / 3);
                this.addChild(reward);
            }
            var closebtn = new GameUtil.Menu(this, "cancelBtn_png", "cancelBtn_png", this.close);
            closebtn.setScaleMode();
            closebtn.x = 410;
            closebtn.y = 280;
            this.addChild(closebtn);
        };
        __egretProto__.showginseng = function (data) {
            console.log("data========", data['url']);
            //window.open(data['url']);
        };
        __egretProto__.close = function () {
            this.parent.removeChild(this);
        };
        return RewardPanel;
    })(GameUtil.BassPanel);
    PlantGame.RewardPanel = RewardPanel;
    RewardPanel.prototype.__class__ = "PlantGame.RewardPanel";
})(PlantGame || (PlantGame = {}));
