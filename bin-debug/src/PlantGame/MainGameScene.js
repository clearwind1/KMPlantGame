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
            this.toolbtn = [];
            var bg = GameUtil.createBitmapByName("gamebg_jpg");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            //顶部浮框
            var frame = GameUtil.createBitmapByName("floatFrame_png");
            frame.x = this.mStageW / 2;
            frame.y = 45;
            this.addChild(frame);
            //头像
            var headimg = new GameUtil.GetImageByUrl(PlantGame.GameData.getInstance().playerImgUrl);
            headimg.x = 161;
            headimg.y = 50;
            headimg.scaleX = headimg.scaleY = 0.05;
            this.addChild(headimg);
            //头像框
            var playerFrame = GameUtil.createBitmapByName("playerImg_png");
            playerFrame.x = 161;
            playerFrame.y = 50;
            this.addChild(playerFrame);
            //用户名
            var playerName = GameUtil.createTextField(190, 52, 25, 0, 0.5, egret.HorizontalAlign.LEFT);
            playerName.text = PlantGame.GameData.getInstance().playerName + "的参场";
            playerName.textColor = 0x7d4406;
            this.addChild(playerName);
            //退出游戏
            var btn = new GameUtil.Menu(this, "buttonFrame_png", "buttonFrame_png", this.goback);
            btn.setScaleMode();
            btn.addButtonImg("returnbtn_png", 0, -5);
            btn.x = 430;
            btn.y = 46;
            this.addChild(btn);
            this.showTools();
            this.addChild(PlantGame.LandPanel.getinstance());
        };
        __egretProto__.goback = function () {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        };
        /**
         * 显示道具，预约，参框，奖励，优品种子，臻品种子
         */
        __egretProto__.showTools = function () {
            this.movieDatabtn = new GameUtil.Menu(this, "buttonFrame_png", "buttonFrame_png", this.movieData);
            this.movieDatabtn.setScaleMode();
            this.movieDatabtn.addButtonText("预约", 0, -4);
            this.movieDatabtn.x = 56;
            this.movieDatabtn.y = 46;
            this.addChild(this.movieDatabtn);
            this.movieDatabtn.getBtnText().bold = true;
            this.movieDatabtn.getBtnText().textColor = 0x000000;
            //this.movieDatabtn.visible = false;
            //显示底部工具框
            var bottomframe = GameUtil.createBitmapByName("bottomFrame_png");
            bottomframe.x = this.mStageW / 2;
            bottomframe.y = 734;
            this.addChild(bottomframe);
            var fun = [this.ginsengBasket, this.showSeed, this.getreward, this.plantSeed, this.plantBestSeed, this.returnTools];
            var btnX = [60, 243, 418, 60, 243, 418];
            var btnImg = ["ginsengbtn_png", "showseedbtn_png", "rewardbtn_png", "seedbtn_png", "bestseedbtn_png", "seedreturnbtn_png"];
            var btntext = ["参筐", "播种", "奖励", "优品", "臻品", "返回"];
            for (var i = 0; i < 6; i++) {
                this.toolbtn[i] = new GameUtil.Menu(this, btnImg[i], btnImg[i], fun[i]);
                this.toolbtn[i].setScaleMode();
                this.toolbtn[i].addButtonText(btntext[i], 0, 42);
                this.toolbtn[i].x = btnX[i];
                this.toolbtn[i].y = 747;
                this.addChild(this.toolbtn[i]);
                this.toolbtn[i].getBtnText().bold = true;
                this.toolbtn[i].getBtnText().stroke = 1;
                this.toolbtn[i].getBtnText().strokeColor = 0x000000;
                if (i > 2) {
                    this.toolbtn[i].scaleX = this.toolbtn[i].scaleY = 0;
                }
            }
        };
        /**
         * 预约电影票
         */
        __egretProto__.movieData = function () {
            //console.log("预约电影票");
            //var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","预约成功");
            //this.addChild(tip);
            this.getSignPackage();
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
         * 显示种子
         */
        __egretProto__.showSeed = function () {
            egret.Tween.get(this.toolbtn[0]).to({ scaleX: 0 }, 400);
            egret.Tween.get(this.toolbtn[0]).to({ scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[1]).to({ scaleX: 0 }, 400);
            egret.Tween.get(this.toolbtn[1]).to({ scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[2]).to({ scaleX: 0 }, 400);
            egret.Tween.get(this.toolbtn[2]).to({ scaleY: 0 }, 400).call(this.callseedshow, this);
        };
        __egretProto__.callseedshow = function () {
            egret.Tween.get(this.toolbtn[3]).to({ scaleX: 1 }, 400);
            egret.Tween.get(this.toolbtn[3]).to({ scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[4]).to({ scaleX: 1 }, 400);
            egret.Tween.get(this.toolbtn[4]).to({ scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[5]).to({ scaleX: 1 }, 400);
            egret.Tween.get(this.toolbtn[5]).to({ scaleY: 1 }, 400);
        };
        /**
         * 优品种子
         */
        __egretProto__.plantSeed = function () {
            console.log("种植优品种子");
            if (PlantGame.GameData.getInstance().seednumber > 0) {
                //处理种植
                if (PlantGame.LandPanel.getinstance().getlandNum() == -1) {
                    var tip = new GameUtil.TipsPanel("alertBg_png", "没有土地了", true);
                    this.addChild(tip);
                }
                else {
                    PlantGame.LandPanel.getinstance().plantSeed(1 /* normalseed */);
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
            if (PlantGame.GameData.getInstance().bestSeednumber > 0) {
                //处理种植
                if (PlantGame.LandPanel.getinstance().getlandNum() == -1) {
                    var tip = new GameUtil.TipsPanel("alertBg_png", "没有土地了", true);
                    this.addChild(tip);
                }
                else {
                    PlantGame.LandPanel.getinstance().plantSeed(2 /* bestseed */);
                }
            }
            else {
                //没有种子
                var tip = new GameUtil.TipsPanel("alertBg_png", "没有臻品种子", true);
                this.addChild(tip);
            }
        };
        __egretProto__.returnTools = function () {
            egret.Tween.get(this.toolbtn[3]).to({ scaleX: 0 }, 400);
            egret.Tween.get(this.toolbtn[3]).to({ scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[4]).to({ scaleX: 0 }, 400);
            egret.Tween.get(this.toolbtn[4]).to({ scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[5]).to({ scaleX: 0 }, 400);
            egret.Tween.get(this.toolbtn[5]).to({ scaleY: 0 }, 400).call(this.calltoolshow, this);
        };
        __egretProto__.calltoolshow = function () {
            egret.Tween.get(this.toolbtn[0]).to({ scaleX: 1 }, 400);
            egret.Tween.get(this.toolbtn[0]).to({ scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[1]).to({ scaleX: 1 }, 400);
            egret.Tween.get(this.toolbtn[1]).to({ scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[2]).to({ scaleX: 1 }, 400);
            egret.Tween.get(this.toolbtn[2]).to({ scaleY: 1 }, 400);
        };
        /**
         * 获取签名分享
         */
        __egretProto__.getSignPackage = function () {
            var urllocal = encodeURIComponent(window.location.href.split('#')[0]);
            //console.log("url=====", urllocal);
            var parma = {
                url: urllocal
            };
            GameUtil.Http.getinstance().send(parma, "/api/weixinshare.ashx", this.share, this);
        };
        __egretProto__.share = function (data) {
            console.log("data======", data);
            //........................................................
            //基本配置
            //配置参数
            wx.config({
                debug: true,
                appId: "wx7ff01d3700c22aad",
                timestamp: Number(data['timestamp']),
                nonceStr: data['noncestr'],
                signature: data['sign'],
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
            //下面可以加更多接口,可自行扩展
            this.getWeiXinShareTimeline(); //分享朋友圈
            this.getWeiXinShareAppMessage();
        };
        /**
         * 获取微信分享到朋友圈
         */
        __egretProto__.getWeiXinShareTimeline = function () {
            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            bodyMenuShareTimeline.title = '大家一起来挖参';
            bodyMenuShareTimeline.link = 'http://3.plantgame.sinaapp.com/?' + PlantGame.GameData.getInstance().playerID;
            bodyMenuShareTimeline.imgUrl = 'http://sztc.gamexun.com/launcher/1.png';
            bodyMenuShareTimeline.trigger = function () {
                // alert('用户点击分享到朋友圈');
            };
            bodyMenuShareTimeline.success = function () {
                //alert('已分享');
                //window[ 'weChat' ]();
                alert('已分享');
            };
            bodyMenuShareTimeline.cancel = function () {
                //alert('已取消');
                // window[ 'weChat' ]();
            };
            bodyMenuShareTimeline.fail = function (res) {
                //alert(JSON.stringify(res));
            };
            wx.onMenuShareTimeline(bodyMenuShareTimeline);
            //alert('已注册获取“分享到朋友圈”状态事件');
        };
        /**
         * 获取微信分享到朋友
         */
        __egretProto__.getWeiXinShareAppMessage = function () {
            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = '挖参吧，兄弟';
            bodyMenuShareAppMessage.desc = '大家一起来挖参';
            bodyMenuShareAppMessage.link = 'http://3.plantgame.sinaapp.com/?' + PlantGame.GameData.getInstance().playerID;
            bodyMenuShareAppMessage.imgUrl = 'http://sztc.gamexun.com/launcher/1.png';
            bodyMenuShareAppMessage.trigger = function () {
                // alert('用户点击发送给朋友');
            };
            bodyMenuShareAppMessage.success = function () {
                //alert('已分享');
            };
            bodyMenuShareAppMessage.cancel = function () {
                //alert('已取消');
            };
            bodyMenuShareAppMessage.fail = function (res) {
                // alert(JSON.stringify(res));
            };
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
            // alert('已注册获取“发送给朋友”状态事件');
        };
        return MainGameScene;
    })(GameUtil.BassPanel);
    PlantGame.MainGameScene = MainGameScene;
    MainGameScene.prototype.__class__ = "PlantGame.MainGameScene";
})(PlantGame || (PlantGame = {}));
