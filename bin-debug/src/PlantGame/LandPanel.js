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
            var data = [{ "lanID": 0 }, { "lanID": 1 }, { "lanID": 2 }, { "lanID": 3 }, { "lanID": 4 }, { "lanID": 5 }];
            for (var i = 0; i < 6; i++) {
                var lanimg = "diamod" + this.landstate[i] + "_png";
                this.lanpic[i] = new GameUtil.Menu(this, lanimg, lanimg, this.ChangeLandState, [data[i]]);
                this.lanpic[i].x = 160 + 160 * (i % 2);
                this.lanpic[i].y = 320 + 80 * Math.floor(i / 2);
                this.addChild(this.lanpic[i]);
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
                this.landstate[landID] = 0;
                //console.log("收获=======",this.landSeedKind[landID]);
                this.updatastate(landID);
                if (this.landSeedKind[landID] == 0) {
                    var sengk = Math.floor(Math.random() * 1000) % 6;
                    console.log("sengk========", sengk);
                    var tip = new GameUtil.TipsPanel("alertBg_png", "收获了" + sengk + "品种的人参", true);
                    this.addChild(tip);
                }
                else {
                    var tip = new GameUtil.TipsPanel("alertBg_png", "收获了新开河参", true);
                    this.addChild(tip);
                }
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
