/**
 * 农田
 * Created by pior on 15/11/4.
 */
var PlantGame;
(function (PlantGame) {
    var LandPanel = (function (_super) {
        __extends(LandPanel, _super);
        function LandPanel() {
            _super.call(this);
            this.landstate = [0, 0, 0, 0, 0, 0];
            this.landSeedKind = [0, 0, 0, 0, 0, 0];
            this.haveSeendland = [0, 0, 0, 0, 0, 0];
            this.lanpic = [];
        }
        var __egretProto__ = LandPanel.prototype;
        __egretProto__.init = function () {
            for (var i = 0; i < 6; i++) {
                this.landSeedKind[i] = PlantGame.GameData.getInstance().landSeedKind[i];
                this.landstate[i] = PlantGame.GameData.getInstance().landstate[i];
                this.haveSeendland[i] = PlantGame.GameData.getInstance().haveSeendland[i];
            }
            var lanpox = [95, 230, 170, 310, 250, 390];
            var lanpoy = [340, 320, 420, 390, 505, 465];
            var data = [{ "lanID": 0 }, { "lanID": 1 }, { "lanID": 2 }, { "lanID": 3 }, { "lanID": 4 }, { "lanID": 5 }];
            for (var i = 0; i < 6; i++) {
                var lanimg = "diamod" + this.landstate[i] + "_png";
                this.lanpic[i] = new GameUtil.Menu(this, lanimg, lanimg, this.ChangeLandState, [data[i]]);
                this.lanpic[i].x = lanpox[i];
                this.lanpic[i].y = lanpoy[i];
                this.addChild(this.lanpic[i]);
                if (this.landstate[i] == 0) {
                    this.lanpic[i].visible = false;
                }
            }
        };
        __egretProto__.ChangeLandState = function (data) {
            var landID = data['lanID'];
            //console.log("lanid========",landID);
            if (this.landstate[landID] == 0) {
                //没有种植
                var tip = new GameUtil.TipsPanel("alertBg_png", "请先种上种子", true);
                this.addChild(tip);
            }
            else if (this.landstate[landID] == 4) {
                //收获
                var sengk;
                this.landstate[landID] = 0;
                this.lanpic[landID].visible = false;
                //console.log("收获=======",this.landSeedKind[landID]);
                this.updatastate(landID);
                if (this.landSeedKind[landID] == 0) {
                    sengk = Math.floor(Math.random() * 1000) % 6;
                }
                else {
                    sengk = 5;
                }
                PlantGame.GameData.getInstance().ginsendNum[sengk]++;
                this.getsengAnimata(sengk, landID);
                this.haveSeendland[landID] = 0;
            }
            else {
                //种上种子状态
                this.landstate[landID]++;
                //console.log("当前状态=======",this.landstate[landID]);
                this.updatastate(landID);
            }
        };
        __egretProto__.getlandNum = function () {
            return this.checkhaveland();
        };
        __egretProto__.plantSeed = function (seedkind) {
            var landid = this.checkhaveland();
            this.landSeedKind[landid] = seedkind;
            this.landstate[landid]++;
            this.updatastate(landid);
            this.haveSeendland[landid] = 1;
            this.lanpic[landid].visible = true;
        };
        __egretProto__.updatastate = function (lanid) {
            var lanimg = "diamod" + this.landstate[lanid] + "_png";
            this.lanpic[lanid].setButtonTexture(lanimg, lanimg);
        };
        __egretProto__.checkhaveland = function () {
            var landid = -1;
            for (var i = 0; i < 6; i++) {
                if (this.haveSeendland[i] == 0) {
                    landid = i;
                    break;
                }
            }
            return landid;
        };
        __egretProto__.getsengAnimata = function (sengkind, landID) {
            var lanpox = [95, 230, 170, 310, 250, 390];
            var lanpoy = [340, 320, 420, 390, 505, 465];
            var sengName;
            if (sengkind == 5) {
                sengName = "bestginseng_png";
            }
            else {
                sengName = "ginseng_png";
            }
            var seng = GameUtil.createBitmapByName(sengName);
            seng.x = lanpox[landID];
            seng.y = lanpoy[landID];
            this.addChild(seng);
            var self = this;
            var tw = egret.Tween.get(seng);
            tw.to({ y: seng.y - 50 }, 500).to({ x: 60, y: 747, scaleX: 0.2, scaleY: 0.2 }, 500).call(function () {
                self.removeChild(seng);
                if (sengkind == 5) {
                    var besttip = new PlantGame.BestginsengTip();
                    self.addChild(besttip);
                }
                else {
                    var tip = new GameUtil.TipsPanel("alertBg_png", "收获了" + sengkind + "品种的人参");
                    self.addChild(tip);
                }
            });
        };
        LandPanel.getinstance = function () {
            if (null == LandPanel._instance) {
                LandPanel._instance = new LandPanel();
            }
            return LandPanel._instance;
        };
        return LandPanel;
    })(GameUtil.BassPanel);
    PlantGame.LandPanel = LandPanel;
    LandPanel.prototype.__class__ = "PlantGame.LandPanel";
})(PlantGame || (PlantGame = {}));
