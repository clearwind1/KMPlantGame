/**
 * 游戏数据
 * Created by pior on 15/11/5.
 */
var PlantGame;
(function (PlantGame) {
    (function (GingSengKind) {
        GingSengKind[GingSengKind["dangseng"] = 0] = "dangseng";
        GingSengKind[GingSengKind["danseng"] = 1] = "danseng";
        GingSengKind[GingSengKind["dongyangseng"] = 2] = "dongyangseng";
        GingSengKind[GingSengKind["gaoliseng"] = 3] = "gaoliseng";
        GingSengKind[GingSengKind["shizhuseng"] = 4] = "shizhuseng";
        GingSengKind[GingSengKind["xinkaiheseng"] = 5] = "xinkaiheseng";
    })(PlantGame.GingSengKind || (PlantGame.GingSengKind = {}));
    var GingSengKind = PlantGame.GingSengKind;
    ;
    (function (SeedKind) {
        SeedKind[SeedKind["normalseed"] = 0] = "normalseed";
        SeedKind[SeedKind["bestseed"] = 1] = "bestseed";
    })(PlantGame.SeedKind || (PlantGame.SeedKind = {}));
    var SeedKind = PlantGame.SeedKind;
    ;
    var GameData = (function () {
        function GameData() {
            this.ginsendNum = [];
            this.landSeedKind = [];
            this.landstate = [];
            this.haveSeendland = [];
            this.init();
        }
        var __egretProto__ = GameData.prototype;
        __egretProto__.init = function () {
            for (var i = 0; i < 6; i++) {
                this.ginsendNum[i] = 0;
                this.landSeedKind[i] = 0;
                this.landstate[i] = 0;
                this.haveSeendland[i] = 0;
            }
            this.seednumber = 3;
            this.bestSeednumber = 1;
            this.isRegister = false;
            this.playerName = "杨珠浩";
            this.rewardNum = 3;
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
