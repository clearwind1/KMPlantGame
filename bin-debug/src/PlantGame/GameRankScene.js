/**
 * 游戏排名界面
 * Created by pior on 15/11/3.
 */
var PlantGame;
(function (PlantGame) {
    var GameRankScene = (function (_super) {
        __extends(GameRankScene, _super);
        function GameRankScene() {
            _super.call(this);
        }
        var __egretProto__ = GameRankScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            var btn = new GameUtil.Menu(this, "buttonImg_png", "buttonImg_png", this.goback);
            btn.setScaleMode();
            btn.addButtonText("返回首页");
            btn.x = this.mStageW / 2;
            btn.y = 650;
            this.addChild(btn);
            this.showRank();
            //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchmove,this);
        };
        __egretProto__.touchmove = function (event) {
            console.log("scrolltop=======", this.mscrollview.getScorllTop());
        };
        __egretProto__.goback = function () {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        };
        __egretProto__.showRank = function () {
            //创建一个滚动框
            this.mscrollview = new GameUtil.ScrollView(400, 500);
            this.mscrollview.x = 40;
            this.mscrollview.y = 50;
            this.addChild(this.mscrollview);
            for (var i = 0; i < 3000; i++) {
                //rankitem:排名容器
                var rankitem = new egret.DisplayObjectContainer();
                var pic = GameUtil.createBitmapByName("beginBtn_png");
                rankitem.addChild(pic);
                pic.x = pic.texture.textureWidth / 2;
                pic.y = 10 + pic.texture.textureHeight / 2 + pic.texture.textureHeight * i;
                //为滚动条添加排名
                this.mscrollview.putItem(rankitem);
            }
        };
        return GameRankScene;
    })(GameUtil.BassPanel);
    PlantGame.GameRankScene = GameRankScene;
    GameRankScene.prototype.__class__ = "PlantGame.GameRankScene";
})(PlantGame || (PlantGame = {}));
