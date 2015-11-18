/**
 * 游戏数据
 * Created by pior on 15/11/5.
 */
var PlantGame;
(function (PlantGame) {
    //人参种类
    (function (GingSengKind) {
        GingSengKind[GingSengKind["gaoliseng"] = 0] = "gaoliseng";
        GingSengKind[GingSengKind["dangseng"] = 1] = "dangseng";
        GingSengKind[GingSengKind["danseng"] = 2] = "danseng";
        GingSengKind[GingSengKind["shizhuseng"] = 3] = "shizhuseng";
        GingSengKind[GingSengKind["dongyangseng"] = 4] = "dongyangseng";
        GingSengKind[GingSengKind["xinkaiheseng"] = 5] = "xinkaiheseng";
    })(PlantGame.GingSengKind || (PlantGame.GingSengKind = {}));
    var GingSengKind = PlantGame.GingSengKind;
    ;
    //种子类型
    (function (SeedKind) {
        SeedKind[SeedKind["normalseed"] = 1] = "normalseed";
        SeedKind[SeedKind["bestseed"] = 2] = "bestseed";
    })(PlantGame.SeedKind || (PlantGame.SeedKind = {}));
    var SeedKind = PlantGame.SeedKind;
    ;
    //配置
    var GameConfig = (function () {
        function GameConfig() {
        }
        var __egretProto__ = GameConfig.prototype;
        GameConfig.checkRewardItemType = function (type) {
            var item;
            if (type == this.KMRS100 || type == this.KMRS50) {
                var fina = "￥100";
                if (type == this.KMRS50) {
                    fina = "￥50";
                }
                item = {
                    itemtype: 1,
                    financet: fina,
                    itemtext: "康美人生代金券"
                };
                return item;
            }
            else if (type == this.KMZL) {
                item = {
                    itemtype: 2,
                    financet: "￥5",
                    itemtext: "康美之恋代金券"
                };
                return item;
            }
            else if (type == this.KMDS) {
                item = {
                    itemtype: 3,
                    financet: "￥10",
                    itemtext: "康美电商代金券"
                };
                return item;
            }
            else {
                var tex = "一张";
                if (type == this.GinsengTicket2) {
                    tex = "两张";
                }
                item = {
                    itemtype: 4,
                    financet: tex,
                    itemtext: "人参提货券"
                };
                return item;
            }
        };
        //优惠券类型
        GameConfig.KMRS100 = "KMRS100";
        GameConfig.KMRS50 = "KMRS50";
        GameConfig.KMZL = "KMZL";
        GameConfig.KMDS = "KMDS";
        GameConfig.GinsengTicket1 = "GinsengTicket1";
        GameConfig.GinsengTicket2 = "GinsengTicket2";
        GameConfig.MOVIE = "MOVIE";
        return GameConfig;
    })();
    PlantGame.GameConfig = GameConfig;
    GameConfig.prototype.__class__ = "PlantGame.GameConfig";
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
            this.playerName = "";
            this.rewardNum = 7;
            this.weekrank = 0;
            this.lastweekrank = 0;
        };
        __egretProto__.setData = function (data) {
            var result = data['result'];
            console.log("result========", data);
            GameData.getInstance().playerID = result['userid'];
            GameData.getInstance().playerName = result['username'];
            GameData.getInstance().playerImgUrl = result['headimgurl'];
            GameData.getInstance().playerNickname = result['realname'];
            GameData.getInstance().playerCity = result['address'];
            GameData.getInstance().bestSeednumber = result['especiallycount'];
            GameData.getInstance().seednumber = result['finecount'];
            GameData.getInstance().ginsendNum[0 /* gaoliseng */] = result['gaolishencount'];
            GameData.getInstance().ginsendNum[1 /* dangseng */] = result['dangshencount'];
            GameData.getInstance().ginsendNum[2 /* danseng */] = result['danshencount'];
            GameData.getInstance().ginsendNum[3 /* shizhuseng */] = result['shizhushencount'];
            GameData.getInstance().ginsendNum[4 /* dongyangseng */] = result['dongyangshencount'];
            GameData.getInstance().ginsendNum[5 /* xinkaiheseng */] = result['heshencount'];
            GameData.getInstance().ispremovie = result['ispremovie'];
            GameData.getInstance().moviePreshopaddr = result['preshopaddr'];
            for (var i = 0; i < 6; i++) {
                var soilresult = result['soilresult'][i];
                GameData.getInstance().landstate[i] = soilresult['status'] - 1;
                GameData.getInstance().landSeedKind[i] = soilresult['seedtype'];
                if (GameData.getInstance().landstate[i] == 0) {
                    GameData.getInstance().haveSeendland[i] = 0;
                }
                else {
                    GameData.getInstance().haveSeendland[i] = 1;
                }
            }
            GameData.getInstance().weekrank = result['weekrank'];
            GameData.getInstance().lastweekrank = result['lastweekrank'];
            GameData.getInstance().isRegister = true;
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
