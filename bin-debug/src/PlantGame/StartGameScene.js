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
        }
        var __egretProto__ = StartGameScene.prototype;
        __egretProto__.init = function () {
            //背景图
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            //三个按钮
            var fun = [this.startGame, this.checkRank, this.gameDescribe];
            var text = ["开始游戏", "查看排名", "游戏说明"];
            for (var i = 0; i < 3; i++) {
                var btn = new GameUtil.Menu(this, "buttonImg_png", "buttonImg_png", fun[i]);
                btn.setScaleMode();
                btn.addButtonText(text[i]);
                btn.getBtnText().size = 30;
                btn.x = this.mStageW / 2;
                btn.y = 315 + i * 100;
                this.addChild(btn);
            }
            /**
             * 查询是否玩家已注册
             * @type {{openid: string}}
             */
            var parm = {
                openid: "osMTev4Qs_mspjbbGr6QWbMpBk_I" //GameData.getInstance().playerOpenID
            };
            GameUtil.Http.getinstance().send(parm, "/api/query.ashx", this.receiveStartGame, this);
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);
            //var ip = window['getIP'];
            //console.log("ip====",ip);
        };
        /**
         * 接受查询结果
         * @param data 服务器返回消息
         */
        __egretProto__.receiveStartGame = function (data) {
            if (data['code'] == 1) {
                PlantGame.GameData.getInstance().setData(data);
            }
            else {
            }
        };
        /**
         * 开始游戏
         */
        __egretProto__.startGame = function () {
            if (PlantGame.GameData.getInstance().isRegister) {
                GameUtil.GameScene.runscene(PlantGame.MainGameScene.getinstance(), GameUtil.GameConfig.TransAlpha);
            }
            else {
                var register = new PlantGame.RegisterPanel();
                this.addChild(register);
            }
        };
        /**
         * 排行榜
         */
        __egretProto__.checkRank = function () {
            if (!PlantGame.GameData.getInstance().isRegister) {
                var tip = new GameUtil.TipsPanel("alertBg_png", "请先注册成为玩家");
                this.addChild(tip);
            }
            else {
                GameUtil.GameScene.runscene(new PlantGame.GameRankScene());
            }
        };
        /**
         * 游戏说明
         */
        __egretProto__.gameDescribe = function () {
            GameUtil.GameScene.runscene(new PlantGame.GameDescribeScene());
        };
        return StartGameScene;
    })(GameUtil.BassPanel);
    PlantGame.StartGameScene = StartGameScene;
    StartGameScene.prototype.__class__ = "PlantGame.StartGameScene";
})(PlantGame || (PlantGame = {}));
