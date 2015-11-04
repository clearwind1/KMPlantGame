/**
 * Created by pior on 15/10/28.
 */
var PlantGame;
(function (PlantGame) {
    var MainGameScene = (function (_super) {
        __extends(MainGameScene, _super);
        function MainGameScene() {
            this.mSeednumber = 3;
            this.mBestSeednumber = 0;
            _super.call(this);
        }
        var __egretProto__ = MainGameScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            //头像
            //用户名
            //退出游戏
            var btn = new GameUtil.Menu(this, "returnbtn_png", "returnbtn_png", this.goback);
            btn.setScaleMode();
            btn.x = 400;
            btn.y = 40;
            this.addChild(btn);
            this.addChild(PlantGame.LandPanel.getinstance());
            this.showTools();
        };
        __egretProto__.goback = function () {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        };
        /**
         * 显示道具，预约，参框，奖励，优品种子，臻品种子
         */
        __egretProto__.showTools = function () {
            this.movieDatabtn = new GameUtil.Menu(this, "returnbtn_png", "returnbtn_png", this.movieData);
            this.movieDatabtn.setScaleMode();
            this.movieDatabtn.x = 60;
            this.movieDatabtn.y = 100;
            this.addChild(this.movieDatabtn);
            //this.movieDatabtn.visible = false;
            var fun = [this.ginsengBasket, this.getreward, this.plantSeed, this.plantBestSeed];
            var btnY = [180, 260, 340, 420];
            for (var i = 0; i < 4; i++) {
                var btn = new GameUtil.Menu(this, "returnbtn_png", "returnbtn_png", fun[i]);
                btn.setScaleMode();
                btn.x = 60;
                btn.y = btnY[i];
                this.addChild(btn);
            }
        };
        /**
         * 预约电影票
         */
        __egretProto__.movieData = function () {
            console.log("预约电影票");
            var tip = new GameUtil.TipsPanel("alertBg_png", "预约成功");
            this.addChild(tip);
        };
        /**
         * 参框
         */
        __egretProto__.ginsengBasket = function () {
            console.log("显示参框");
            var gsb = new PlantGame.GinsengBasketPanel();
            this.addChild(gsb);
        };
        /**
         * 奖励
         */
        __egretProto__.getreward = function () {
            console.log("获得奖励");
            var rwp = new PlantGame.RewardPanel();
            this.addChild(rwp);
        };
        /**
         * 优品种子
         */
        __egretProto__.plantSeed = function () {
            console.log("种植优品种子");
            if (this.mSeednumber > 0) {
                //处理种植
                if (PlantGame.LandPanel.getinstance().getlandNum() == -1) {
                    var tip = new GameUtil.TipsPanel("alertBg_png", "没有土地了", true);
                    this.addChild(tip);
                }
                else {
                    this.mSeednumber--;
                    PlantGame.LandPanel.getinstance().plantSeed(0);
                }
            }
            else {
                //没有种子
                var tip = new GameUtil.TipsPanel("alertBg_png", "没有优品种子", true);
                this.addChild(tip);
            }
        };
        /**
         * 臻品种子
         */
        __egretProto__.plantBestSeed = function () {
            console.log("种植臻品种子");
            if (this.mBestSeednumber > 0) {
                //处理种植
                if (PlantGame.LandPanel.getinstance().getlandNum() == -1) {
                    var tip = new GameUtil.TipsPanel("alertBg_png", "没有土地了", true);
                    this.addChild(tip);
                }
                else {
                    this.mBestSeednumber--;
                    PlantGame.LandPanel.getinstance().plantSeed(1);
                }
            }
            else {
                //没有种子
                var tip = new GameUtil.TipsPanel("alertBg_png", "没有臻品种子", true);
                this.addChild(tip);
            }
        };
        return MainGameScene;
    })(GameUtil.BassPanel);
    PlantGame.MainGameScene = MainGameScene;
    MainGameScene.prototype.__class__ = "PlantGame.MainGameScene";
})(PlantGame || (PlantGame = {}));
