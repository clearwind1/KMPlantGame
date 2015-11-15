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
            this.rewardNum = PlantGame.GameData.getInstance().rewardNum;
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
            var rewardScrollview = new GameUtil.ScrollView(390, 237);
            rewardScrollview.x = 47;
            rewardScrollview.y = 304;
            this.addChild(rewardScrollview);
            var data = RES.getRes("describeURL_json");
            for (var i = 0; i < this.rewardNum; i++) {
                //优惠券图
                var rewardItemId = "rewardItem" + 1 + "_png";
                var reward = new GameUtil.Menu(this, rewardItemId, rewardItemId, this.showginseng, [i, data[i]]);
                //reward.setScaleMode();
                reward.x = 94 + 198 * (i % 2);
                reward.y = 46 + 120 * Math.floor(i / 2);
                rewardScrollview.putItem(reward);
                //优惠券内容
                var finance = GameUtil.createTextField(94 + 198 * (i % 2), 26 + 120 * Math.floor(i / 2), 22);
                finance.text = "￥" + 100;
                rewardScrollview.putItem(finance);
                var itemtext = GameUtil.createTextField(94 + 198 * (i % 2), 69 + 120 * Math.floor(i / 2), 22);
                itemtext.text = "康美电商优惠券";
                itemtext.textColor = 0x000000;
                rewardScrollview.putItem(itemtext);
            }
            var closebtn = new GameUtil.Menu(this, "closebtn_png", "closebtn_png", this.close);
            closebtn.setScaleMode();
            closebtn.x = 450;
            closebtn.y = 275;
            this.addChild(closebtn);
        };
        __egretProto__.showginseng = function (data1, data2) {
            console.log("data2========", data2['url'], "data1============", data1);
            this.youhuijuancon = new egret.DisplayObjectContainer;
            this.addChild(this.youhuijuancon);
            this.youhuijuancon.addChild(GameUtil.WaitServerPanel.getInstace());
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);
            var yhjbg = GameUtil.createBitmapByName("bestsengTipFrame_png");
            yhjbg.x = this.mStageW / 2;
            yhjbg.y = this.mStageH / 2;
            this.youhuijuancon.addChild(yhjbg);
            var yhjkind = GameUtil.createTextField(this.mStageW / 2, 306, 25);
            yhjkind.text = "康美优惠券";
            yhjkind.textColor = 0x7d4406;
            this.youhuijuancon.addChild(yhjkind);
            var yhjCode = GameUtil.createTextField(80, 370, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            yhjCode.text = "券       码:" + "  " + "4403 9089 1890 7863";
            yhjCode.textColor = 0x7d4406;
            this.youhuijuancon.addChild(yhjCode);
            var shopaddress = GameUtil.createTextField(80, 420, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            shopaddress.text = "门店地址:";
            shopaddress.textColor = 0x7d4406;
            this.youhuijuancon.addChild(shopaddress);
            var shopframe = GameUtil.createBitmapByName("registerFrame_png");
            shopframe.anchorX = 0;
            shopframe.x = 170;
            shopframe.y = 420;
            this.youhuijuancon.addChild(shopframe);
            var closebtn = new GameUtil.Menu(this, "morebtn_png", "morebtn_png", this.closeyouhuijuan);
            closebtn.addButtonText("确定");
            closebtn.setScaleMode();
            closebtn.x = 135;
            closebtn.y = 490;
            this.youhuijuancon.addChild(closebtn);
            var morebtn = new GameUtil.Menu(this, "morebtn_png", "morebtn_png", this.morehhj, [data2]);
            morebtn.addButtonText("了解详情");
            morebtn.setScaleMode();
            morebtn.x = 346;
            morebtn.y = 490;
            this.youhuijuancon.addChild(morebtn);
        };
        __egretProto__.closeyouhuijuan = function () {
            this.removeChild(this.youhuijuancon);
        };
        __egretProto__.morehhj = function (data) {
            window.open(data['url']);
        };
        __egretProto__.close = function () {
            this.parent.removeChild(this);
        };
        return RewardPanel;
    })(GameUtil.BassPanel);
    PlantGame.RewardPanel = RewardPanel;
    RewardPanel.prototype.__class__ = "PlantGame.RewardPanel";
})(PlantGame || (PlantGame = {}));
