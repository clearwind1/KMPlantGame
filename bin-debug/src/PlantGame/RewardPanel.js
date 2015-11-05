/**
 * 奖励
 * Created by pior on 15/11/4.
 */
var PlantGame;
(function (PlantGame) {
    var RewardPanel = (function (_super) {
        __extends(RewardPanel, _super);
        function RewardPanel() {
            this.rewardNum = 3;
            _super.call(this);
        }
        var __egretProto__ = RewardPanel.prototype;
        __egretProto__.init = function () {
            this.touchEnabled = true;
            var cover = GameUtil.createRect(0, 0, 480, 800, 0.4);
            this.addChild(cover);
            var Frame = GameUtil.createBitmapByName("ItemFrame_png");
            Frame.x = this.mStageW / 2;
            Frame.y = this.mStageH / 2;
            this.addChild(Frame);
            //名字
            var frameName = GameUtil.createTextField(240, 257, 25);
            frameName.text = "奖励";
            this.addChild(frameName);
            var data = RES.getRes("describeURL_json");
            for (var i = 0; i < this.rewardNum; i++) {
                //优惠券图
                var rewardItemId = "rewardItem" + 1 + "_png";
                var reward = new GameUtil.Menu(this, rewardItemId, rewardItemId, this.showginseng, [data[i]]);
                //reward.setScaleMode();
                reward.x = 142 + 200 * (i % 2);
                reward.y = 363 + 120 * Math.floor(i / 2);
                this.addChild(reward);
                //优惠券内容
                var finance = GameUtil.createTextField(142 + 200 * (i % 2), 342 + 120 * Math.floor(i / 2), 22);
                finance.text = "￥" + 100;
                this.addChild(finance);
                var itemtext = GameUtil.createTextField(142 + 200 * (i % 2), 386 + 120 * Math.floor(i / 2), 22);
                itemtext.text = "康美电商优惠券";
                itemtext.textColor = 0x000000;
                this.addChild(itemtext);
            }
            var closebtn = new GameUtil.Menu(this, "closebtn_png", "closebtn_png", this.close);
            closebtn.setScaleMode();
            closebtn.x = 450;
            closebtn.y = 275;
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
