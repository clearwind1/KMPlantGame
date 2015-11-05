/**
 * 游戏数据
 * Created by pior on 15/11/5.
 */
var PlantGame;
(function (PlantGame) {
    var GameData = (function () {
        function GameData() {
            this.init();
        }
        var __egretProto__ = GameData.prototype;
        __egretProto__.init = function () {
            for (var i = 0; i < 6; i++) {
                this.ginsendNum[i] = 0;
            }
            this.seednumber = 3;
            this.bestSeednumber = 0;
        };
        GameData.getInstance = function () {
            if (this._instance == null) {
                this._instance = new PlantGame.GameData();
            }
            return this._instance;
        };
        return GameData;
    })();
    PlantGame.GameData = GameData;
    GameData.prototype.__class__ = "PlantGame.GameData";
})(PlantGame || (PlantGame = {}));
