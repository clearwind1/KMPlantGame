/**
 * Created by pior on 15/10/28.
 */
var PlantGame;
(function (PlantGame) {
    var MainGameScene = (function (_super) {
        __extends(MainGameScene, _super);
        function MainGameScene() {
            _super.call(this);
        }
        var __egretProto__ = MainGameScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            //var tip:GameUtil.TipsPanel = new GameUtil.TipsPanel("just just just just just test!!!");
            //this.addChild(tip);
            //tip.setTextwidth(40*5);
        };
        /**
         * 显示土地，种植种子
         */
        __egretProto__.showLand = function () {
        };
        /**
         * 显示道具，浇水等
         */
        __egretProto__.showTools = function () {
        };
        /**
         * 显示人参
         */
        __egretProto__.showginseng = function () {
        };
        return MainGameScene;
    })(GameUtil.BassPanel);
    PlantGame.MainGameScene = MainGameScene;
    MainGameScene.prototype.__class__ = "PlantGame.MainGameScene";
})(PlantGame || (PlantGame = {}));
