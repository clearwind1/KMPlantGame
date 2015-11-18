/**
 * 游戏说明界面
 * Created by pior on 15/11/3.
 */
var PlantGame;
(function (PlantGame) {
    var GameDescribeScene = (function (_super) {
        __extends(GameDescribeScene, _super);
        function GameDescribeScene() {
            _super.call(this);
        }
        var __egretProto__ = GameDescribeScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            var desframe = GameUtil.createBitmapByName("describFrame_png");
            desframe.x = this.mStageW / 2;
            desframe.y = this.mStageH / 2;
            this.addChild(desframe);
            var text = GameUtil.createTextField(this.mStageW / 2, 46, 25);
            text.text = "游戏说明";
            this.addChild(text);
            var btn = new GameUtil.Menu(this, "buttonImg_png", "buttonImg_png", this.goback);
            btn.setScaleMode();
            btn.addButtonText("返回首页");
            btn.x = this.mStageW / 2;
            btn.y = 705;
            this.addChild(btn);
            this.showText();
        };
        __egretProto__.goback = function () {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        };
        __egretProto__.showText = function () {
            var text = RES.getRes("gameDescribe_json");
            //var titletext:egret.TextField = GameUtil.createTextField(240,100,35);
            //titletext.text = text['title'];
            //this.addChild(titletext);
            //titletext.textColor = 0x000000;
            var textfiled = GameUtil.createTextField(0, 0, 18, 0, 0);
            textfiled.text = text['text'];
            textfiled.textAlign = egret.HorizontalAlign.LEFT;
            textfiled.textColor = 0x000000;
            textfiled.width = 390;
            //console.log("textfild======",textfiled.text);
            var textScollview = new GameUtil.ScrollView(390, 567);
            textScollview.x = 46;
            textScollview.y = 97;
            textScollview.putItem(textfiled);
            this.addChild(textScollview);
        };
        return GameDescribeScene;
    })(GameUtil.BassPanel);
    PlantGame.GameDescribeScene = GameDescribeScene;
    GameDescribeScene.prototype.__class__ = "PlantGame.GameDescribeScene";
})(PlantGame || (PlantGame = {}));
