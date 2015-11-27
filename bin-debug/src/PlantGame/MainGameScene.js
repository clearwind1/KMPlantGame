/**
 * Created by pior on 15/10/28.
 */
var PlantGame;
(function (PlantGame) {
    var MainGameScene = (function (_super) {
        __extends(MainGameScene, _super);
        function MainGameScene() {
            _super.call(this);
            this.curShopAddTag = 0; //当前选择门店地址标识
            this.shopaddScroll = null; //门店地址选择下拉滚动框
        }
        var __egretProto__ = MainGameScene.prototype;
        __egretProto__.init = function () {
            console.log("city======", PlantGame.GameData.getInstance().playerCity);
            this.toolbtn = [];
            //背景
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
            var headimg = new GameUtil.GetImageByUrl(PlantGame.GameData.getInstance().playerImgUrl, 44, 44);
            headimg.x = 161;
            headimg.y = 44;
            this.addChild(headimg);
            //头像框
            //var playerFrame: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
            //playerFrame.x = 161;
            //playerFrame.y = 44;
            //this.addChild(playerFrame);
            //用户名
            var playerName = GameUtil.createTextField(190, 46, 25, 0, 0.5, egret.HorizontalAlign.LEFT);
            playerName.text = PlantGame.GameData.getInstance().playerName + "的参场";
            playerName.textColor = 0x7d4406;
            this.addChild(playerName);
            //分享游戏
            var btn = new GameUtil.Menu(this, "returnbtn_png", "returnbtn_png", this.goback);
            btn.setScaleMode();
            btn.x = 430;
            btn.y = 47;
            this.addChild(btn);
            this.showTools();
            this.addChild(PlantGame.LandPanel.getinstance());
            this.getGameSignPackage();
        };
        /**
         * 微信分享
         */
        __egretProto__.goback = function () {
            this.addChild(new PlantGame.GameRankScene());
            //this.getSignPackage();
        };
        /**
         * 显示道具，预约，参框，奖励，优品种子，臻品种子
         */
        __egretProto__.showTools = function () {
            //预约电影票
            this.movieDatabtn = new GameUtil.Menu(this, "buttonFrame_png", "buttonFrame_png", this.showPreMovie);
            this.movieDatabtn.setScaleMode();
            this.movieDatabtn.addButtonText("预约", 0, -1);
            this.movieDatabtn.x = 56;
            this.movieDatabtn.y = 46;
            this.addChild(this.movieDatabtn);
            this.movieDatabtn.getBtnText().bold = true;
            this.movieDatabtn.getBtnText().textColor = 0x000000;
            //console.log("ispremovie========",GameData.getInstance().ispremovie);
            if (PlantGame.GameData.getInstance().ispremovie == 0 && PlantGame.GameData.getInstance().moviePreshopaddr == null) {
                this.movieDatabtn.visible = false;
            }
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
            this.seednum = GameUtil.createTextField(90, 771, 15, 0, 0.5, egret.HorizontalAlign.LEFT);
            this.seednum.text = "" + PlantGame.GameData.getInstance().seednumber;
            this.seednum.textColor = 0x000000;
            this.addChild(this.seednum);
            this.bestseednum = GameUtil.createTextField(273, 771, 15, 0, 0.5, egret.HorizontalAlign.LEFT);
            this.bestseednum.text = "" + PlantGame.GameData.getInstance().bestSeednumber;
            this.bestseednum.textColor = 0x000000;
            this.addChild(this.bestseednum);
            this.seednum.visible = this.bestseednum.visible = false;
            if (PlantGame.GameData.getInstance().bestSeednumber + PlantGame.GameData.getInstance().seednumber > 0) {
                PlantGame.GameData.getInstance().isPlantAnimation = true;
                this.plantimgmove(true);
            }
        };
        __egretProto__.plantimgmove = function (state) {
            //egret.Tween.removeTweens(this.toolbtn[1]);
            if (PlantGame.GameData.getInstance().isToolPage) {
                egret.Tween.get(this.toolbtn[1], { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 800).to({ scaleX: 1.0, scaleY: 1.0 }, 800);
                if (!PlantGame.GameData.getInstance().isPlantAnimation) {
                    egret.Tween.removeTweens(this.toolbtn[1]);
                }
            }
        };
        __egretProto__.rewardimgstate = function (data) {
            if (data['code'] == 1) {
                if (data['recordcount'] > 0) {
                    PlantGame.GameData.getInstance().isRewardAnimation = true;
                    this.rewardimgmove(true);
                }
            }
            if (PlantGame.GameData.getInstance().isRegisterNow) {
                var ipstr = window['getIP'];
                console.log("ipstr=====", ipstr, "ipstr[0]======", ipstr.split('|'));
                ipstr = ipstr.split('|')[1];
                var param = {
                    openId: PlantGame.GameData.getInstance().playerOpenID,
                    amount: 100,
                    ip: ipstr,
                    nickname: "康美药业"
                };
                GameUtil.Http.getinstance().send(param, "/api/weixinpay.ashx", this.sendRedpack, this);
            }
        };
        __egretProto__.sendRedpack = function (data) {
            if (data['xml']['return_code']['#cdata-section'] != 'FAIL') {
                console.log("发送红包成功=====", data['xml']);
            }
            else {
                console.log("发送红包失败=====", data['xml']);
            }
        };
        __egretProto__.rewardimgmove = function (state) {
            //egret.Tween.removeTweens(this.toolbtn[2]);
            if (PlantGame.GameData.getInstance().isToolPage) {
                egret.Tween.get(this.toolbtn[2], { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 800).to({ scaleX: 1.0, scaleY: 1.0 }, 800);
                if (!PlantGame.GameData.getInstance().isRewardAnimation) {
                    egret.Tween.removeTweens(this.toolbtn[2]);
                }
            }
            var param = {
                userid: PlantGame.GameData.getInstance().playerID
            };
            GameUtil.Http.getinstance().send(param, "/api/forward.ashx?action=entergame");
        };
        /**
         * 预约电影票
         */
        __egretProto__.showPreMovie = function () {
            var add;
            if (PlantGame.GameData.getInstance().playerCity.indexOf("深圳") != -1) {
                add = 'SZ';
            }
            else if (PlantGame.GameData.getInstance().playerCity.indexOf("普宁") != -1) {
                add = 'PN';
            }
            else if (PlantGame.GameData.getInstance().playerCity.indexOf("北京") != -1) {
                add = 'BJ';
            }
            else if (PlantGame.GameData.getInstance().playerCity.indexOf("广州") != -1) {
                add = 'GZ';
            }
            var playeradd = "shopaddress" + add + "_json";
            this.shopaddObj = RES.getRes(playeradd);
            console.log("dshop=====", this.shopaddObj);
            this.showmovieCont = new egret.DisplayObjectContainer;
            this.addChild(this.showmovieCont);
            this.showmovieCont.addChild(GameUtil.WaitServerPanel.getInstace());
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);
            var yhjbg = GameUtil.createBitmapByName("bestsengTipFrame_png");
            yhjbg.x = this.mStageW / 2;
            yhjbg.y = this.mStageH / 2;
            this.showmovieCont.addChild(yhjbg);
            var yhjkind = GameUtil.createTextField(this.mStageW / 2, 306, 25);
            yhjkind.text = "预约电影票";
            yhjkind.textColor = 0x7d4406;
            this.showmovieCont.addChild(yhjkind);
            var yhjCode = GameUtil.createTextField(40, 340, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            yhjCode.text = "券       码:";
            yhjCode.textColor = 0x7d4406;
            this.showmovieCont.addChild(yhjCode);
            var yhjCodenumber = GameUtil.createTextField(240, 340, 20);
            yhjCodenumber.text = PlantGame.GameData.getInstance().playerCardID;
            yhjCodenumber.textColor = 0x7d4406;
            this.showmovieCont.addChild(yhjCodenumber);
            var shopaddress = GameUtil.createTextField(40, 390, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            shopaddress.text = "门店地址:";
            shopaddress.textColor = 0x7d4406;
            this.showmovieCont.addChild(shopaddress);
            var shopframe = GameUtil.createBitmapByName("registerFrame_png");
            shopframe.anchorX = 0;
            shopframe.scaleX = 1.25;
            shopframe.scaleY = 2;
            shopframe.x = 130;
            shopframe.y = 390;
            this.showmovieCont.addChild(shopframe);
            this.shopaddText = GameUtil.createTextField(140, 390, 15, 0, 0.5, egret.HorizontalAlign.LEFT);
            if (PlantGame.GameData.getInstance().moviePreshopaddr == null) {
                this.shopaddText.text = this.shopaddObj[this.curShopAddTag]['add'];
            }
            else {
                this.shopaddText.text = PlantGame.GameData.getInstance().moviePreshopaddr;
            }
            this.shopaddText.width = 270;
            this.showmovieCont.addChild(this.shopaddText);
            if (PlantGame.GameData.getInstance().moviePreshopaddr == null) {
                var shopaddbtn = new GameUtil.Menu(this, "shopbtn_png", "shopbtn_png", this.showShopAdd);
                shopaddbtn.x = 418;
                shopaddbtn.y = 390;
                this.showmovieCont.addChild(shopaddbtn);
            }
            var tiptext = GameUtil.createTextField(40, 440, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            tiptext.text = "注意事项:    门店地址选择确定后,不可修改";
            tiptext.textColor = 0x7d4406;
            this.showmovieCont.addChild(tiptext);
            var morebtn = new GameUtil.Menu(this, "morebtn_png", "morebtn_png", this.morehhj);
            morebtn.addButtonText("了解详情");
            morebtn.setScaleMode();
            morebtn.x = 135;
            morebtn.y = 490;
            this.showmovieCont.addChild(morebtn);
            var closebtn = new GameUtil.Menu(this, "morebtn_png", "morebtn_png", this.movieData);
            closebtn.addButtonText("确定");
            closebtn.setScaleMode();
            closebtn.x = 346;
            closebtn.y = 490;
            this.showmovieCont.addChild(closebtn);
        };
        __egretProto__.showShopAdd = function () {
            if (this.shopaddScroll == null) {
                this.shopaddScroll = new GameUtil.ScrollView(350, 175);
                this.shopaddScroll.x = 130;
                this.shopaddScroll.y = 428;
                this.showmovieCont.addChild(this.shopaddScroll);
                for (var i = 0; i < this.shopaddObj.length; i++) {
                    var shopadditem = new GameUtil.Menu(this, "registerFrame_png", "registerFrame_png", this.getChooseTag, [i]);
                    shopadditem.addButtonText(this.shopaddObj[i]['add'], -115, 15);
                    shopadditem.setBtnScale(1.25, 2);
                    shopadditem.y = 35 + 70 * i;
                    shopadditem.getBtnText().size = 15;
                    shopadditem.getBtnText().width = 270;
                    shopadditem.getBtnText().anchorX = 0;
                    shopadditem.getBtnText().textAlign = egret.HorizontalAlign.LEFT;
                    shopadditem.x = 154;
                    this.shopaddScroll.putItem(shopadditem);
                }
            }
            else {
                this.showmovieCont.removeChild(this.shopaddScroll);
                this.shopaddScroll = null;
            }
        };
        __egretProto__.getChooseTag = function (tag) {
            console.log("tag====", tag);
            this.curShopAddTag = tag;
            this.shopaddText.text = this.shopaddObj[this.curShopAddTag]['add'];
            this.showmovieCont.removeChild(this.shopaddScroll);
            this.shopaddScroll = null;
        };
        __egretProto__.movieData = function () {
            if (PlantGame.GameData.getInstance().moviePreshopaddr != null) {
                this.removeChild(this.showmovieCont);
            }
            else {
                PlantGame.GameData.getInstance().moviePreshopaddr = this.shopaddText.text;
                //console.log("预约电影票");
                var param = {
                    userid: PlantGame.GameData.getInstance().playerID,
                    address: PlantGame.GameData.getInstance().playerCity,
                    prizetype: PlantGame.GameConfig.MOVIE,
                    preshopaddr: PlantGame.GameData.getInstance().moviePreshopaddr
                };
                GameUtil.Http.getinstance().send(param, "/api/prize.ashx?action=preshopaddr", this.showpremovie, this);
            }
        };
        __egretProto__.showpremovie = function (data) {
            if (data['code'] == 1) {
                var tip = new GameUtil.TipsPanel("alertBg_png", "预约成功");
                this.addChild(tip);
                this.removeChild(this.showmovieCont);
            }
            else {
                console.log("预约电影票失败=======", data['msg']);
            }
        };
        __egretProto__.morehhj = function () {
            //this.addChild(new PlantGame.GameDescribeScene());
            var rewardtype = 6;
            if (PlantGame.GameData.getInstance().playerCity.indexOf("深圳") != -1) {
                rewardtype = 5;
            }
            var tipstr = RES.getRes('rewardtip_json');
            var tip = new GameUtil.TipsPanel("alertBg_png", tipstr[rewardtype]['tip']);
            tip.setTextSize(16);
            tip.setTextwidth(400);
            tip.setTextHor(0, 0.5, egret.HorizontalAlign.LEFT, 30);
            tip.setTextlineSpacing(3);
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
         * 显示种子
         */
        __egretProto__.showSeed = function () {
            PlantGame.GameData.getInstance().isToolPage = false;
            egret.Tween.removeTweens(this.toolbtn[2]);
            egret.Tween.removeTweens(this.toolbtn[1]);
            egret.Tween.get(this.toolbtn[0]).to({ scaleX: 0, scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[1]).to({ scaleX: 0, scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[2]).to({ scaleX: 0, scaleY: 0 }, 400).call(this.callseedshow, this);
        };
        __egretProto__.callseedshow = function () {
            egret.Tween.get(this.toolbtn[3]).to({ scaleX: 1, scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[4]).to({ scaleX: 1, scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[5]).to({ scaleX: 1, scaleY: 1 }, 400);
            this.seednum.visible = true;
            this.bestseednum.visible = true;
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
            PlantGame.GameData.getInstance().isToolPage = true;
            this.seednum.visible = this.bestseednum.visible = false;
            egret.Tween.get(this.toolbtn[3]).to({ scaleX: 0, scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[4]).to({ scaleX: 0, scaleY: 0 }, 400);
            egret.Tween.get(this.toolbtn[5]).to({ scaleX: 0, scaleY: 0 }, 400).call(this.calltoolshow, this);
        };
        __egretProto__.calltoolshow = function () {
            egret.Tween.get(this.toolbtn[0]).to({ scaleX: 1, scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[1]).to({ scaleX: 1, scaleY: 1 }, 400);
            egret.Tween.get(this.toolbtn[2]).to({ scaleX: 1, scaleY: 1 }, 400).call(this.resumemove, this);
        };
        __egretProto__.resumemove = function () {
            this.plantimgmove(true);
            this.rewardimgmove(true);
        };
        __egretProto__.setSeedNum = function () {
            this.seednum.text = PlantGame.GameData.getInstance().seednumber + "";
            this.bestseednum.text = PlantGame.GameData.getInstance().bestSeednumber + "";
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
            //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
        };
        /**
         * 获取签名分享
         */
        __egretProto__.getGameSignPackage = function () {
            var urllocal = encodeURIComponent(window.location.href.split('#')[0]);
            //console.log("url=====", urllocal);
            var parma = {
                url: urllocal
            };
            GameUtil.Http.getinstance().send(parma, "/api/weixinshare.ashx", this.gameshare, this);
            //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
        };
        __egretProto__.gameshare = function (data) {
            wx.config({
                debug: false,
                appId: data['appId'],
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
            var param = {
                userid: PlantGame.GameData.getInstance().playerID
            };
            GameUtil.Http.getinstance().send(param, "/api/prize.ashx?action=query", this.rewardimgstate, this);
        };
        __egretProto__.share = function (data) {
            console.log("data======", data);
            this.shareTip();
            //alert("id==="+data['appId']+"\ntimestamp==="+data['timestamp']+"\nnonceStr==="+data['noncestr']+"\nsign==="+data['sign']);
            //........................................................
            //基本配置
            //配置参数
            wx.config({
                debug: false,
                appId: data['appId'],
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
            var self = this;
            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            bodyMenuShareTimeline.title = '种鲜参，赢“康美”豪礼！鲜参、电影票、Iphone 6s等你拿！';
            bodyMenuShareTimeline.link = 'http://res.kangmei.17188.com/sharepage/?' + PlantGame.GameData.getInstance().playerID;
            bodyMenuShareTimeline.imgUrl = 'http://res.kangmei.17188.com/icon.png';
            bodyMenuShareTimeline.trigger = function () {
                // alert('用户点击分享到朋友圈');
            };
            bodyMenuShareTimeline.success = function () {
                //alert('已分享');
                //window[ 'weChat' ]();
                //alert('已分享')
                self.closesharetip();
                self.sharesuccess();
            };
            bodyMenuShareTimeline.cancel = function () {
                //alert('已取消');
                // window[ 'weChat' ]();
                self.closesharetip();
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
            var self = this;
            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = '挖参吧，兄弟';
            bodyMenuShareAppMessage.desc = '种鲜参，赢“康美”豪礼！鲜参、电影票、Iphone 6s等你拿！';
            bodyMenuShareAppMessage.link = 'http://res.kangmei.17188.com/sharepage/?' + PlantGame.GameData.getInstance().playerID;
            bodyMenuShareAppMessage.imgUrl = 'http://res.kangmei.17188.com/icon.png';
            bodyMenuShareAppMessage.trigger = function () {
                // alert('用户点击发送给朋友');
            };
            bodyMenuShareAppMessage.success = function () {
                //alert('已分享');
                self.closesharetip();
                self.sharesuccess();
            };
            bodyMenuShareAppMessage.cancel = function () {
                //alert('已取消');
                self.closesharetip();
            };
            bodyMenuShareAppMessage.fail = function (res) {
                // alert(JSON.stringify(res));
            };
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
            // alert('已注册获取“发送给朋友”状态事件');
        };
        __egretProto__.shareTip = function () {
            this.sharetipcont = new egret.DisplayObjectContainer();
            this.addChild(this.sharetipcont);
            var shape = GameUtil.createRect(0, 0, 480, 800, 0.6);
            this.sharetipcont.addChild(shape);
            this.touchEnabled = true;
            var tip = GameUtil.createBitmapByName("sharebg_png");
            tip.anchorX = 1;
            tip.anchorY = 0;
            tip.x = 480;
            tip.y = 0;
            this.sharetipcont.addChild(tip);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
        };
        __egretProto__.touchtap = function (event) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
            this.closesharetip();
        };
        __egretProto__.closesharetip = function () {
            this.removeChild(this.sharetipcont);
        };
        __egretProto__.sharesuccess = function () {
            var param = {
                userid: PlantGame.GameData.getInstance().playerID
            };
            GameUtil.Http.getinstance().send(param, "/api/forward.ashx?action=zhuanfa", this.callshare, this);
        };
        __egretProto__.callshare = function (data) {
            if (data['code'] == 1) {
            }
            else {
                console.log("转发上传失败:", data['msg']);
            }
        };
        MainGameScene.getinstance = function () {
            if (null == MainGameScene._instance) {
                MainGameScene._instance = new MainGameScene();
            }
            return MainGameScene._instance;
        };
        return MainGameScene;
    })(GameUtil.BassPanel);
    PlantGame.MainGameScene = MainGameScene;
    MainGameScene.prototype.__class__ = "PlantGame.MainGameScene";
})(PlantGame || (PlantGame = {}));
