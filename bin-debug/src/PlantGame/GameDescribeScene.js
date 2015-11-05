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
            var btn = new GameUtil.Menu(this, "buttonImg_png", "buttonImg_png", this.goback);
            btn.setScaleMode();
            btn.addButtonText("返回首页");
            btn.x = this.mStageW / 2;
            btn.y = 600;
            this.addChild(btn);
            this.showText();
        };
        __egretProto__.goback = function () {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        };
        __egretProto__.showText = function () {
            var text = RES.getRes("gameDescribe_json");
            var titletext = GameUtil.createTextField(240, 100, 35);
            titletext.text = text['title'];
            this.addChild(titletext);
            titletext.textColor = 0x000000;
            var textfiled = GameUtil.createTextField(20, 170, 20, 0);
            textfiled.text = text['text'];
            this.addChild(textfiled);
            textfiled.textAlign = egret.HorizontalAlign.LEFT;
            textfiled.textColor = 0x000000;
            textfiled.width = 450;
        };
        return GameDescribeScene;
    })(GameUtil.BassPanel);
    PlantGame.GameDescribeScene = GameDescribeScene;
    GameDescribeScene.prototype.__class__ = "PlantGame.GameDescribeScene";
})(PlantGame || (PlantGame = {}));
