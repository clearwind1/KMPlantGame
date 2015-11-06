/**
 * 开始游戏界面
 * Created by pior on 15/10/28.
 */
var PlantGame;
(function (PlantGame) {
    var StartGameScene = (function (_super) {
        __extends(StartGameScene, _super);
        function StartGameScene() {
            _super.call(this);
            this.isRegister = false;
        }
        var __egretProto__ = StartGameScene.prototype;
        __egretProto__.init = function () {
            this.isRegister = PlantGame.GameData.getInstance().isRegister;
            //背景图
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            //游戏标题
            var gametitle = GameUtil.createBitmapByName("buttonImg_png");
            gametitle.x = this.mStageW / 2;
            gametitle.y = 100;
            this.addChild(gametitle);
            //三个按钮
            var fun = [this.startGame, this.checkRank, this.gameDescribe];
            var text = ["开始游戏", "查看排名", "游戏说明"];
            for (var i = 0; i < 3; i++) {
                var btn = new GameUtil.Menu(this, "buttonImg_png", "buttonImg_png", fun[i]);
                btn.setScaleMode();
                btn.addButtonText(text[i]);
                btn.x = this.mStageW / 2;
                btn.y = 500 + i * 100;
                this.addChild(btn);
            }
        };
        __egretProto__.startGame = function () {
            if (!this.isRegister) {
                var register = new PlantGame.RegisterPanel();
                this.addChild(register);
            }
            else {
                GameUtil.GameScene.runscene(new PlantGame.MainGameScene(), GameUtil.GameConfig.TransAlpha);
            }
        };
        __egretProto__.checkRank = function () {
            if (!this.isRegister) {
                var tip = new GameUtil.TipsPanel("alertBg_png", "请先注册成为玩家");
                this.addChild(tip);
            }
            else {
                GameUtil.GameScene.runscene(new PlantGame.GameRankScene(), GameUtil.GameConfig.CrossLeft, 400);
            }
        };
        __egretProto__.gameDescribe = function () {
            GameUtil.GameScene.runscene(new PlantGame.GameDescribeScene(), GameUtil.GameConfig.CrossLeft, 400);
        };
        return StartGameScene;
    })(GameUtil.BassPanel);
    PlantGame.StartGameScene = StartGameScene;
    StartGameScene.prototype.__class__ = "PlantGame.StartGameScene";
})(PlantGame || (PlantGame = {}));
