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
            this.landstate = [0, 0, 0, 0, 0, 0]; //土地状态
            this.landSeedKind = [0, 0, 0, 0, 0, 0]; //土地种子类型
            this.haveSeendland = [0, 0, 0, 0, 0, 0]; //当前土地是否有种子
            this.lanpic = []; //种子状态按钮（浇水施肥等）
            this.seedImg = []; //种子图片
        }
        var __egretProto__ = LandPanel.prototype;
        __egretProto__.init = function () {
            for (var i = 0; i < 6; i++) {
                this.landSeedKind[i] = PlantGame.GameData.getInstance().landSeedKind[i];
                this.landstate[i] = PlantGame.GameData.getInstance().landstate[i];
                this.haveSeendland[i] = PlantGame.GameData.getInstance().haveSeendland[i];
            }
            //土地位置
            var lanpox = [95, 230, 170, 310, 250, 390];
            var lanpoy = [340, 320, 420, 390, 505, 465];
            var data = [{ "lanID": 0 }, { "lanID": 1 }, { "lanID": 2 }, { "lanID": 3 }, { "lanID": 4 }, { "lanID": 5 }];
            for (var i = 0; i < 6; i++) {
                //判断种子类型
                if (this.landSeedKind[i] == 1 /* normalseed */) {
                    this.seedImg[i] = GameUtil.createBitmapByName("diamod1_png");
                    this.seedImg[i].x = lanpox[i];
                    this.seedImg[i].y = lanpoy[i];
                    this.addChild(this.seedImg[i]);
                }
                else {
                    this.seedImg[i] = GameUtil.createBitmapByName("diamod1_1_png");
                    this.seedImg[i].x = lanpox[i];
                    this.seedImg[i].y = lanpoy[i];
                    this.addChild(this.seedImg[i]);
                }
                //判断土地状态
                if (this.landstate[i] == 5) {
                    this.seedImg[i].texture = RES.getRes("diamod4_png");
                }
                var lanimg = "seedActionBtn_png";
                var toollanimg = "Action" + this.landstate[i] + "_png";
                this.lanpic[i] = new GameUtil.Menu(this, lanimg, lanimg, this.ChangeLandState, [data[i]]);
                this.lanpic[i].addButtonImg(toollanimg, 0, -5);
                this.lanpic[i].setScaleMode();
                this.lanpic[i].x = lanpox[i];
                if (this.landstate[i] == 5) {
                    this.lanpic[i].y = lanpoy[i] - 70;
                }
                else {
                    this.lanpic[i].y = lanpoy[i] - 50;
                }
                this.addChild(this.lanpic[i]);
                if (this.landstate[i] == 0) {
                    this.lanpic[i].visible = false;
                    this.seedImg[i].visible = false;
                }
            }
        };
        /**
         * 改变土地状态
         * @param data 所要改变土地ID
         * @constructor
         */
        __egretProto__.ChangeLandState = function (data) {
            var landID = data['lanID'];
            //console.log("lanid========",landID);
            if (this.landstate[landID] == 0) {
                //没有种植
                var tip = new GameUtil.TipsPanel("alertBg_png", "请先种上种子", true);
                this.addChild(tip);
            }
            else if (this.landstate[landID] == 5) {
                //收获
                var parm = {
                    userid: PlantGame.GameData.getInstance().playerID,
                    soilid: landID + 1,
                    soilstatus: 1,
                    seedtype: this.landSeedKind[landID],
                    address: PlantGame.GameData.getInstance().playerCity
                };
                this.plantLandID = landID;
                GameUtil.Http.getinstance().send(parm, "/api/soil.ashx?action=update", this.receiveGetseng, this);
            }
            else {
                //种上种子状态
                var soidss = this.landstate[landID] + 2;
                var parm = {
                    userid: PlantGame.GameData.getInstance().playerID,
                    soilid: landID + 1,
                    soilstatus: soidss,
                    seedtype: this.landSeedKind[landID],
                    address: PlantGame.GameData.getInstance().playerCity
                };
                this.plantLandID = landID;
                GameUtil.Http.getinstance().send(parm, "/api/soil.ashx?action=update", this.receiveChangeLandState, this);
            }
        };
        /**
         * 改变土地状态
         * @param data 服务返回消息
         */
        __egretProto__.receiveChangeLandState = function (data) {
            if (data['code'] == 1) {
                this.landstate[this.plantLandID]++;
                console.log("当前状态=======", this.landstate[this.plantLandID]);
                this.updatastate(this.plantLandID);
                if (this.landstate[this.plantLandID] == 5) {
                    this.seedImg[this.plantLandID].texture = RES.getRes("diamod4_png");
                }
            }
            else {
                console.log("改变状态错误========", data['msg']);
            }
        };
        /**
         * 收获消息
         * @param data 服务器返回消息
         */
        __egretProto__.receiveGetseng = function (data) {
            if (data['code'] == 1) {
                this.landstate[this.plantLandID] = 0;
                this.lanpic[this.plantLandID].visible = false;
                //console.log("收获=======",this.landSeedKind[landID]);
                var sengtype = data['ginsengtype'] - 1;
                this.updatastate(this.plantLandID);
                PlantGame.GameData.getInstance().ginsendNum[sengtype]++;
                this.getsengAnimata(sengtype, this.plantLandID);
                this.haveSeendland[this.plantLandID] = 0;
                this.seedImg[this.plantLandID].visible = false;
                if (data['ispremovie'] == 1) {
                    PlantGame.MainGameScene.getinstance().movieDatabtn.visible = true;
                    PlantGame.GameData.getInstance().ispremovie = 1;
                }
                if (data['prizetype'] != "") {
                    PlantGame.GameData.getInstance().isRewardAnimation = true;
                    PlantGame.MainGameScene.getinstance().rewardimgmove(true);
                }
            }
            else {
                console.log("收获错误========", data['msg']);
            }
        };
        //获取当前可用土地ID
        __egretProto__.getlandNum = function () {
            return this.checkhaveland();
        };
        /**
         * 种植种子
         * @param seedkind 种子类型
         */
        __egretProto__.plantSeed = function (seedkind) {
            var landid = this.checkhaveland();
            this.plantLandID = landid;
            this.plantSeedkind = seedkind;
            var parm = {
                userid: PlantGame.GameData.getInstance().playerID,
                soilid: landid + 1,
                soilstatus: 2,
                seedtype: seedkind,
                address: PlantGame.GameData.getInstance().playerCity
            };
            GameUtil.Http.getinstance().send(parm, "/api/soil.ashx?action=update", this.receivePlantSeed, this);
        };
        __egretProto__.receivePlantSeed = function (data) {
            console.log("plantseeddata============", data);
            if (data['code'] == 1) {
                this.landSeedKind[this.plantLandID] = this.plantSeedkind;
                this.landstate[this.plantLandID]++;
                this.updatastate(this.plantLandID);
                this.haveSeendland[this.plantLandID] = 1;
                this.lanpic[this.plantLandID].visible = true;
                if (this.landSeedKind[this.plantLandID] == 1 /* normalseed */) {
                    this.seedImg[this.plantLandID].texture = RES.getRes("diamod1_png");
                    PlantGame.GameData.getInstance().seednumber--;
                    PlantGame.MainGameScene.getinstance().setSeedNum();
                }
                else {
                    this.seedImg[this.plantLandID].texture = RES.getRes("diamod1_1_png");
                    PlantGame.GameData.getInstance().bestSeednumber--;
                    PlantGame.MainGameScene.getinstance().setSeedNum();
                }
                this.seedImg[this.plantLandID].visible = true;
                PlantGame.GameData.getInstance().ispremovie = data['ispremovie'];
                if (PlantGame.GameData.getInstance().ispremovie == 1) {
                    PlantGame.MainGameScene.getinstance().movieDatabtn.visible = true;
                }
                if (PlantGame.GameData.getInstance().seednumber + PlantGame.GameData.getInstance().bestSeednumber == 0) {
                    PlantGame.GameData.getInstance().isPlantAnimation = false;
                    PlantGame.MainGameScene.getinstance().plantimgmove(false);
                }
            }
            else {
                console.log("种植种子错误========", data['msg']);
            }
        };
        /**
         * 更新土地状态
         * @param lanid 土地ID
         */
        __egretProto__.updatastate = function (lanid) {
            var lanimg = "Action" + this.landstate[lanid] + "_png";
            this.lanpic[lanid].setAddImgTexture(lanimg);
            var lanpoy = [340, 320, 420, 390, 505, 465];
            if (this.landstate[lanid] == 5) {
                this.lanpic[lanid].y = lanpoy[lanid] - 70;
            }
            else {
                this.lanpic[lanid].y = lanpoy[lanid] - 50;
            }
        };
        //获取当前可用土地ID
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
        //收获人参时动画
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
            var getsengName = ["高丽参", "党参", "丹参", "石柱参", "东洋参", "新开河参"];
            var self = this;
            var tw = egret.Tween.get(seng);
            tw.to({ y: seng.y - 50 }, 500).to({ x: 60, y: 747, scaleX: 0.2, scaleY: 0.2 }, 500).call(function () {
                self.removeChild(seng);
                //if(sengkind == 5)
                //{
                var besttip = new PlantGame.BestginsengTip(sengkind);
                self.addChild(besttip);
                //}
                //else
                //{
                //    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","收获了"+getsengName[sengkind]);
                //    self.addChild(tip);
                //}
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
