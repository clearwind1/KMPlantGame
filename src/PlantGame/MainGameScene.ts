/**
 * Created by pior on 15/10/28.
 */

module PlantGame
{
    export class MainGameScene extends GameUtil.BassPanel
    {
        public movieDatabtn: GameUtil.Menu;             //电影票预约按钮
        private toolbtn: GameUtil.Menu[];               //游戏工具按钮

        private showmovieCont: egret.DisplayObjectContainer;    //电影票预约容器
        private shopaddText: egret.TextField;                   //门店地址文本显示
        private curShopAddTag: number = 0;                      //当前选择门店地址标识
        private shopaddObj: Object[];                           //门店地址配置表
        private shopaddScroll: GameUtil.ScrollView = null;      //门店地址选择下拉滚动框

        private sharetipcont: egret.DisplayObjectContainer;

        public constructor()
        {
            super();
        }
        public init():void
        {
            console.log("city======",GameData.getInstance().playerCity);
            this.toolbtn = [];
            //背景
            var bg:egret.Bitmap = GameUtil.createBitmapByName("gamebg_jpg");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
            this.addChild(bg);

            //顶部浮框
            var frame: egret.Bitmap = GameUtil.createBitmapByName("floatFrame_png");
            frame.x = this.mStageW/2;
            frame.y = 45;
            this.addChild(frame);

            //头像
            var headimg: GameUtil.GetImageByUrl = new GameUtil.GetImageByUrl(GameData.getInstance().playerImgUrl);
            headimg.x = 161;
            headimg.y = 44;
            headimg.scaleX = headimg.scaleY = 0.05;
            this.addChild(headimg);
            //头像框
            var playerFrame: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
            playerFrame.x = 161;
            playerFrame.y = 44;
            this.addChild(playerFrame);

            //用户名
            var playerName: egret.TextField = GameUtil.createTextField(190,46,25,0,0.5,egret.HorizontalAlign.LEFT);
            playerName.text = GameData.getInstance().playerName + "的参场";
            playerName.textColor = 0x7d4406;
            this.addChild(playerName);

            //分享游戏
            var btn:GameUtil.Menu = new GameUtil.Menu(this,"buttonFrame_png","buttonFrame_png",this.goback);
            btn.setScaleMode();
            btn.addButtonImg("returnbtn_png",0,-5);
            btn.x = 430;
            btn.y = 46;
            this.addChild(btn);

            this.showTools();

            this.addChild(PlantGame.LandPanel.getinstance());

            this.getGameSignPackage();

        }

        /**
         * 微信分享
         */
        private goback():void
        {
            //GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
            this.getSignPackage();
        }

        /**
         * 显示道具，预约，参框，奖励，优品种子，臻品种子
         */
        private showTools():void
        {
            //预约电影票
            this.movieDatabtn = new GameUtil.Menu(this,"buttonFrame_png","buttonFrame_png",this.showPreMovie);
            this.movieDatabtn.setScaleMode();
            this.movieDatabtn.addButtonText("预约",0,-4);
            this.movieDatabtn.x = 56;
            this.movieDatabtn.y = 46;
            this.addChild(this.movieDatabtn);
            this.movieDatabtn.getBtnText().bold = true;
            this.movieDatabtn.getBtnText().textColor = 0x000000;

            //console.log("ispremovie========",GameData.getInstance().ispremovie);
            if(GameData.getInstance().ispremovie == 0 && GameData.getInstance().moviePreshopaddr == null){
                this.movieDatabtn.visible = false;
            }

            //显示底部工具框
            var bottomframe: egret.Bitmap = GameUtil.createBitmapByName("bottomFrame_png");
            bottomframe.x = this.mStageW/2;
            bottomframe.y = 734;
            this.addChild(bottomframe);


            var fun:Function[] = [this.ginsengBasket,this.showSeed,this.getreward,this.plantSeed,this.plantBestSeed,this.returnTools];
            var btnX:number[] = [60,243,418,60,243,418];
            var btnImg:string[] = ["ginsengbtn_png","showseedbtn_png","rewardbtn_png","seedbtn_png","bestseedbtn_png","seedreturnbtn_png"];
            var btntext:string[] = ["参筐","播种","奖励","优品","臻品","返回"];
            for(var i:number=0;i<6;i++)
            {
                this.toolbtn[i] = new GameUtil.Menu(this,btnImg[i],btnImg[i],fun[i]);
                this.toolbtn[i].setScaleMode();
                this.toolbtn[i].addButtonText(btntext[i],0,42);
                this.toolbtn[i].x = btnX[i];
                this.toolbtn[i].y = 747;
                this.addChild(this.toolbtn[i]);
                this.toolbtn[i].getBtnText().bold = true;
                this.toolbtn[i].getBtnText().stroke = 1;
                this.toolbtn[i].getBtnText().strokeColor = 0x000000;
                if(i>2)
                {
                    this.toolbtn[i].scaleX = this.toolbtn[i].scaleY = 0;
                }
            }

            if(GameData.getInstance().bestSeednumber + GameData.getInstance().seednumber > 0){
                GameData.getInstance().isPlantAnimation = true;
                this.plantimgmove(true);
            }

        }

        public plantimgmove(state:boolean):void
        {
            //egret.Tween.removeTweens(this.toolbtn[1]);

            if(GameData.getInstance().isToolPage)
            {
                egret.Tween.get(this.toolbtn[1],{loop:true}).to({scaleX:0.9,scaleY:0.9},800).to({scaleX:1.0,scaleY:1.0},800);
                if(!GameData.getInstance().isPlantAnimation)
                {
                    egret.Tween.removeTweens(this.toolbtn[1]);
                }
            }
        }

        private rewardimgstate(data:any):void
        {
            if(data['code'] == 1) {
                if(data['recordcount'] > 0){
                    GameData.getInstance().isRewardAnimation = true;
                    this.rewardimgmove(true);
                }
            }
        }
        public rewardimgmove(state:boolean):void
        {
            //egret.Tween.removeTweens(this.toolbtn[2]);

            if(GameData.getInstance().isToolPage){
                egret.Tween.get(this.toolbtn[2],{loop:true}).to({scaleX:0.9,scaleY:0.9},800).to({scaleX:1.0,scaleY:1.0},800);
                if(!GameData.getInstance().isRewardAnimation)
                {
                    egret.Tween.removeTweens(this.toolbtn[2]);
                }
            }

        }

        /**
         * 预约电影票
         */
        private showPreMovie():void {

            var add:string;
            if(GameData.getInstance().playerCity == "深圳市"){
                add = 'SZ';
            }
            else if(GameData.getInstance().playerCity == "普宁市"){
                add = 'PN';
            }
            else if(GameData.getInstance().playerCity == "北京市"){
                add = 'BJ';
            }
            else if(GameData.getInstance().playerCity == '广州市'){
                add = 'GZ';
            }

            var playeradd:string = "shopaddress" + add + "_json";

            this.shopaddObj = RES.getRes(playeradd);
            console.log("dshop=====", this.shopaddObj);

            this.showmovieCont = new egret.DisplayObjectContainer;
            this.addChild(this.showmovieCont);

            this.showmovieCont.addChild(GameUtil.WaitServerPanel.getInstace());
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);

            var yhjbg:egret.Bitmap = GameUtil.createBitmapByName("bestsengTipFrame_png");
            yhjbg.x = this.mStageW / 2;
            yhjbg.y = this.mStageH / 2;
            this.showmovieCont.addChild(yhjbg);

            var yhjkind:egret.TextField = GameUtil.createTextField(this.mStageW / 2, 306, 25);
            yhjkind.text = "预约电影票";
            yhjkind.textColor = 0x7d4406;
            this.showmovieCont.addChild(yhjkind);


            var shopaddress:egret.TextField = GameUtil.createTextField(40, 400, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            shopaddress.text = "门店地址:";
            shopaddress.textColor = 0x7d4406;
            this.showmovieCont.addChild(shopaddress);

            var shopframe:egret.Bitmap = GameUtil.createBitmapByName("registerFrame_png");
            shopframe.anchorX = 0;
            shopframe.scaleX = 1.25;
            shopframe.scaleY = 2;
            shopframe.x = 130;
            shopframe.y = 400;
            this.showmovieCont.addChild(shopframe);

            this.shopaddText = GameUtil.createTextField(140, 400, 15, 0, 0.5, egret.HorizontalAlign.LEFT);

            if (GameData.getInstance().moviePreshopaddr == null) {
                this.shopaddText.text = this.shopaddObj[this.curShopAddTag]['add'];
            }
            else
            {
                this.shopaddText.text = GameData.getInstance().moviePreshopaddr;
            }
            this.shopaddText.width = 270;
            this.showmovieCont.addChild(this.shopaddText);


            if(GameData.getInstance().moviePreshopaddr == null) {
                var shopaddbtn:GameUtil.Menu = new GameUtil.Menu(this, "shopbtn_png", "shopbtn_png", this.showShopAdd);
                shopaddbtn.x = 418;
                shopaddbtn.y = 400;
                this.showmovieCont.addChild(shopaddbtn);
            }

            var tiptext: egret.TextField = GameUtil.createTextField(240,460,15);
            tiptext.text = "门店地址选择确定后,不可修改";
            tiptext.textColor = 0xff0000;
            this.showmovieCont.addChild(tiptext);

            var morebtn: GameUtil.Menu = new GameUtil.Menu(this,"morebtn_png","morebtn_png",this.morehhj);
            morebtn.addButtonText("了解详情");
            morebtn.setScaleMode();
            morebtn.x = 135;
            morebtn.y = 490;
            this.showmovieCont.addChild(morebtn);

            var closebtn: GameUtil.Menu = new GameUtil.Menu(this,"morebtn_png","morebtn_png",this.movieData);
            closebtn.addButtonText("确定");
            closebtn.setScaleMode();
            closebtn.x = 346;
            closebtn.y = 490;
            this.showmovieCont.addChild(closebtn);
        }

        private showShopAdd():void
        {
            if(this.shopaddScroll == null)
            {
                this.shopaddScroll = new GameUtil.ScrollView(350,175);
                this.shopaddScroll.x = 130;
                this.shopaddScroll.y = 438;

                this.showmovieCont.addChild(this.shopaddScroll);

                for(var i:number = 0;i < this.shopaddObj.length;i++){

                    var shopadditem: GameUtil.Menu = new GameUtil.Menu(this,"registerFrame_png","registerFrame_png",this.getChooseTag,[i]);

                    shopadditem.addButtonText(this.shopaddObj[i]['add'],-115,15);
                    shopadditem.setBtnScale(1.25,2);
                    shopadditem.y = 35 + 70*i;
                    shopadditem.getBtnText().size = 15;
                    shopadditem.getBtnText().width = 270;
                    shopadditem.getBtnText().anchorX = 0;
                    shopadditem.getBtnText().textAlign = egret.HorizontalAlign.LEFT;
                    shopadditem.x = 154;
                    this.shopaddScroll.putItem(shopadditem);
                }
            }
            else
            {
                this.showmovieCont.removeChild(this.shopaddScroll);
                this.shopaddScroll = null;
            }

        }
        private getChooseTag(tag:any):void
        {
            console.log("tag====",tag);
            this.curShopAddTag = tag;
            this.shopaddText.text = this.shopaddObj[this.curShopAddTag]['add'];

            this.showmovieCont.removeChild(this.shopaddScroll);
            this.shopaddScroll = null;
        }

        private movieData():void
        {
            if(GameData.getInstance().moviePreshopaddr != null)
            {
                this.removeChild(this.showmovieCont);
            }
            else
            {
                GameData.getInstance().moviePreshopaddr = this.shopaddText.text;
                //console.log("预约电影票");
                var param: Object = {
                    userid: GameData.getInstance().playerID,
                    address: GameData.getInstance().playerCity,
                    prizetype: PlantGame.GameConfig.MOVIE,
                    preshopaddr: GameData.getInstance().moviePreshopaddr
                }
                GameUtil.Http.getinstance().send(param,"/api/prize.ashx?action=preshopaddr",this.showpremovie,this);
            }


        }
        private showpremovie(data:any){
            if(data['code'] == 1){
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","预约成功");
                this.addChild(tip);

                this.removeChild(this.showmovieCont);
            }
            else
            {
                console.log("预约电影票失败=======",data['msg']);
            }
        }

        private morehhj():void
        {
            GameUtil.GameScene.runscene(new PlantGame.GameDescribeScene());
        }

        /**
         * 参框
         */
        private ginsengBasket():void
        {
            console.log("显示参框");
            var gsb: PlantGame.GinsengBasketPanel = new PlantGame.GinsengBasketPanel();
            this.addChild(gsb);
        }

        /**
         * 奖励
         */
        private getreward():void
        {
            console.log("获得奖励");
            var rwp: PlantGame.RewardPanel = new PlantGame.RewardPanel();
            this.addChild(rwp);
        }

        /**
         * 显示种子
         */
        private showSeed():void
        {
            GameData.getInstance().isToolPage = false;

            egret.Tween.removeTweens(this.toolbtn[2]);
            egret.Tween.removeTweens(this.toolbtn[1]);

            egret.Tween.get(this.toolbtn[0]).to({scaleX:0,scaleY:0},400);
            egret.Tween.get(this.toolbtn[1]).to({scaleX:0,scaleY:0},400);
            egret.Tween.get(this.toolbtn[2]).to({scaleX:0,scaleY:0},400).call(this.callseedshow,this);
        }
        private callseedshow():void
        {
            egret.Tween.get(this.toolbtn[3]).to({scaleX:1,scaleY:1},400);
            egret.Tween.get(this.toolbtn[4]).to({scaleX:1,scaleY:1},400);
            egret.Tween.get(this.toolbtn[5]).to({scaleX:1,scaleY:1},400);
        }

        /**
         * 优品种子
         */
        private plantSeed():void
        {
            console.log("种植优品种子");
            if(GameData.getInstance().seednumber > 0)
            {
                //处理种植
                if(PlantGame.LandPanel.getinstance().getlandNum() == -1)
                {
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有土地了",true);
                    this.addChild(tip);
                }
                else
                {
                    PlantGame.LandPanel.getinstance().plantSeed(PlantGame.SeedKind.normalseed);
                }
            }
            else
            {
                //没有种子
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有优品种子",true);
                this.addChild(tip);
            }
        }

        /**
         * 臻品种子
         */
        private plantBestSeed():void
        {
            console.log("种植臻品种子");
            if(GameData.getInstance().bestSeednumber > 0)
            {
                //处理种植
                if(PlantGame.LandPanel.getinstance().getlandNum()== -1)
                {
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有土地了",true);
                    this.addChild(tip);
                }
                else
                {
                    PlantGame.LandPanel.getinstance().plantSeed(PlantGame.SeedKind.bestseed);
                }
            }
            else
            {
                //没有种子
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有臻品种子",true);
                this.addChild(tip);
            }
        }

        private returnTools():void
        {
            GameData.getInstance().isToolPage = true;

            egret.Tween.get(this.toolbtn[3]).to({scaleX:0,scaleY:0},400);
            egret.Tween.get(this.toolbtn[4]).to({scaleX:0,scaleY:0},400);
            egret.Tween.get(this.toolbtn[5]).to({scaleX:0,scaleY:0},400).call(this.calltoolshow,this);

        }
        private calltoolshow():void
        {
            egret.Tween.get(this.toolbtn[0]).to({scaleX:1,scaleY:1},400);
            egret.Tween.get(this.toolbtn[1]).to({scaleX:1,scaleY:1},400);
            egret.Tween.get(this.toolbtn[2]).to({scaleX:1,scaleY:1},400).call(this.resumemove,this);

        }
        private resumemove():void
        {
            this.plantimgmove(true);
            this.rewardimgmove(true);
        }

        /**
         * 获取签名分享
         */
        private getSignPackage() {

            var urllocal:string = encodeURIComponent(window.location.href.split('#')[0]);

            //console.log("url=====", urllocal);
            var parma:Object = {
                url: urllocal
            }
            GameUtil.Http.getinstance().send(parma,"/api/weixinshare.ashx",this.share,this);
            //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
        }

        /**
         * 获取签名分享
         */
        private getGameSignPackage() {

            var urllocal:string = encodeURIComponent(window.location.href.split('#')[0]);

            //console.log("url=====", urllocal);
            var parma:Object = {
                url: urllocal
            }
            GameUtil.Http.getinstance().send(parma,"/api/weixinshare.ashx",this.gameshare,this);
            //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
        }
        private gameshare(data:any):void
        {
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
            this.getWeiXinShareTimeline();//分享朋友圈
            this.getWeiXinShareAppMessage();

            var param: Object = {
                userid: GameData.getInstance().playerID
            }
            GameUtil.Http.getinstance().send(param,"/api/prize.ashx?action=query",this.rewardimgstate,this);
        }

        private share(data:any):void
        {
            console.log("data======",data);

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
            this.getWeiXinShareTimeline();//分享朋友圈
            this.getWeiXinShareAppMessage();
        }

        /**
         * 获取微信分享到朋友圈
         */
        private getWeiXinShareTimeline() {

            var self:any = this;
            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            bodyMenuShareTimeline.title = '种鲜参，赢“康美”豪礼！鲜参、电影票、Iphone 6s等你拿！';
            bodyMenuShareTimeline.link = 'http://res.kangmei.17188.com/sharepage/?'+GameData.getInstance().playerID;
            bodyMenuShareTimeline.imgUrl = 'http://res.kangmei.17188.com/icon.png';
            bodyMenuShareTimeline.trigger = ()=> {
                // alert('用户点击分享到朋友圈');
            };
            bodyMenuShareTimeline.success = ()=> {
                //alert('已分享');
                //window[ 'weChat' ]();
                //alert('已分享')
                self.closesharetip();
                self.sharesuccess();
            };
            bodyMenuShareTimeline.cancel = ()=> {
                //alert('已取消');
                // window[ 'weChat' ]();
                self.closesharetip();
            };
            bodyMenuShareTimeline.fail = (res)=> {
                //alert(JSON.stringify(res));
            };
            wx.onMenuShareTimeline(bodyMenuShareTimeline);
            //alert('已注册获取“分享到朋友圈”状态事件');
        }
        /**
         * 获取微信分享到朋友
         */
        private getWeiXinShareAppMessage(){

            var self: any = this;

            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = '挖参吧，兄弟';
            bodyMenuShareAppMessage.desc = '种鲜参，赢“康美”豪礼！鲜参、电影票、Iphone 6s等你拿！';
            bodyMenuShareAppMessage.link = 'http://res.kangmei.17188.com/sharepage/?'+GameData.getInstance().playerID;
            bodyMenuShareAppMessage.imgUrl = 'http://res.kangmei.17188.com/icon.png';
            bodyMenuShareAppMessage.trigger = ()=> {
                // alert('用户点击发送给朋友');
            };
            bodyMenuShareAppMessage.success = ()=> {
                //alert('已分享');
                self.closesharetip();
                self.sharesuccess();
            };
            bodyMenuShareAppMessage.cancel = ()=> {
                //alert('已取消');
                self.closesharetip();

            };
            bodyMenuShareAppMessage.fail = (res)=> {
                // alert(JSON.stringify(res));
            };
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
            // alert('已注册获取“发送给朋友”状态事件');
        }

        private shareTip():void
        {
            this.sharetipcont = new egret.DisplayObjectContainer();
            this.addChild(this.sharetipcont);
            var shape: egret.Shape = GameUtil.createRect(0,0,480,800,0.6);
            this.sharetipcont.addChild(shape);


            this.touchEnabled = true;
            var tip: egret.Bitmap = GameUtil.createBitmapByName("sharebg_png");
            tip.anchorX = 1;
            tip.anchorY = 0;
            tip.x = 480;
            tip.y = 0;
            this.sharetipcont.addChild(tip);
        }
        private closesharetip():void
        {
            this.removeChild(this.sharetipcont);
        }

        private sharesuccess():void
        {
            var param: Object = {
                userid:GameData.getInstance().playerID
            }
            GameUtil.Http.getinstance().send(param,"/api/forward.ashx?action=zhuanfa",this.callshare,this);
        }
        private callshare(data:any):void
        {
            if(data['code'] == 1){

            }
            else
            {
                console.log("转发上传失败:",data['msg']);
            }
        }

        private static _instance:MainGameScene;

        public static getinstance():MainGameScene
        {
            if( null == MainGameScene._instance )
            {
                MainGameScene._instance = new MainGameScene();
            }
            return MainGameScene._instance;
        }

    }
}