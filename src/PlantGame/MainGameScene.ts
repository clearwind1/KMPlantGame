/**
 * Created by pior on 15/10/28.
 */

module PlantGame
{
    export class MainGameScene extends GameUtil.BassPanel
    {
        private movieDatabtn: GameUtil.Menu;
        private toolbtn: GameUtil.Menu[];

        public constructor()
        {
            super();
        }
        public init():void
        {

            this.toolbtn = [];
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
            headimg.y = 50;
            headimg.scaleX = headimg.scaleY = 0.05;
            this.addChild(headimg);
            //头像框
            var playerFrame: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
            playerFrame.x = 161;
            playerFrame.y = 50;
            this.addChild(playerFrame);

            //用户名
            var playerName: egret.TextField = GameUtil.createTextField(190,52,25,0,0.5,egret.HorizontalAlign.LEFT);
            playerName.text = GameData.getInstance().playerName + "的参场";
            playerName.textColor = 0x7d4406;
            this.addChild(playerName);

            //退出游戏
            var btn:GameUtil.Menu = new GameUtil.Menu(this,"buttonFrame_png","buttonFrame_png",this.goback);
            btn.setScaleMode();
            btn.addButtonImg("returnbtn_png",0,-5);
            btn.x = 430;
            btn.y = 46;
            this.addChild(btn);

            this.showTools();

            this.addChild(PlantGame.LandPanel.getinstance());

        }

        private goback():void
        {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        }

        /**
         * 显示道具，预约，参框，奖励，优品种子，臻品种子
         */
        private showTools():void
        {

            this.movieDatabtn = new GameUtil.Menu(this,"buttonFrame_png","buttonFrame_png",this.movieData);
            this.movieDatabtn.setScaleMode();
            this.movieDatabtn.addButtonText("预约",0,-4);
            this.movieDatabtn.x = 56;
            this.movieDatabtn.y = 46;
            this.addChild(this.movieDatabtn);
            this.movieDatabtn.getBtnText().bold = true;
            this.movieDatabtn.getBtnText().textColor = 0x000000;
            //this.movieDatabtn.visible = false;

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
        }

        /**
         * 预约电影票
         */
        private movieData():void
        {
            //console.log("预约电影票");
            //var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","预约成功");
            //this.addChild(tip);

            this.getSignPackage();
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
            egret.Tween.get(this.toolbtn[0]).to({scaleX:0},400);
            egret.Tween.get(this.toolbtn[0]).to({scaleY:0},400);
            egret.Tween.get(this.toolbtn[1]).to({scaleX:0},400);
            egret.Tween.get(this.toolbtn[1]).to({scaleY:0},400);
            egret.Tween.get(this.toolbtn[2]).to({scaleX:0},400);
            egret.Tween.get(this.toolbtn[2]).to({scaleY:0},400).call(this.callseedshow,this);
        }
        private callseedshow():void
        {
            egret.Tween.get(this.toolbtn[3]).to({scaleX:1},400);
            egret.Tween.get(this.toolbtn[3]).to({scaleY:1},400);
            egret.Tween.get(this.toolbtn[4]).to({scaleX:1},400);
            egret.Tween.get(this.toolbtn[4]).to({scaleY:1},400);
            egret.Tween.get(this.toolbtn[5]).to({scaleX:1},400);
            egret.Tween.get(this.toolbtn[5]).to({scaleY:1},400);
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
            egret.Tween.get(this.toolbtn[3]).to({scaleX:0},400);
            egret.Tween.get(this.toolbtn[3]).to({scaleY:0},400);
            egret.Tween.get(this.toolbtn[4]).to({scaleX:0},400);
            egret.Tween.get(this.toolbtn[4]).to({scaleY:0},400);
            egret.Tween.get(this.toolbtn[5]).to({scaleX:0},400);
            egret.Tween.get(this.toolbtn[5]).to({scaleY:0},400).call(this.calltoolshow,this);

        }
        private calltoolshow():void
        {
            egret.Tween.get(this.toolbtn[0]).to({scaleX:1},400);
            egret.Tween.get(this.toolbtn[0]).to({scaleY:1},400);
            egret.Tween.get(this.toolbtn[1]).to({scaleX:1},400);
            egret.Tween.get(this.toolbtn[1]).to({scaleY:1},400);
            egret.Tween.get(this.toolbtn[2]).to({scaleX:1},400);
            egret.Tween.get(this.toolbtn[2]).to({scaleY:1},400);
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
        }

        private share(data:any):void
        {
            console.log("data======",data);

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
            this.getWeiXinShareTimeline();//分享朋友圈
            this.getWeiXinShareAppMessage();
        }

        /**
         * 获取微信分享到朋友圈
         */
        private getWeiXinShareTimeline() {

            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            bodyMenuShareTimeline.title = '大家一起来挖参';
            bodyMenuShareTimeline.link = 'http://3.plantgame.sinaapp.com/?'+GameData.getInstance().playerID;
            bodyMenuShareTimeline.imgUrl = 'http://sztc.gamexun.com/launcher/1.png';
            bodyMenuShareTimeline.trigger = ()=> {
                // alert('用户点击分享到朋友圈');
            };
            bodyMenuShareTimeline.success = ()=> {
                //alert('已分享');
                //window[ 'weChat' ]();
                alert('已分享')
            };
            bodyMenuShareTimeline.cancel = ()=> {
                //alert('已取消');
                // window[ 'weChat' ]();
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
            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = '挖参吧，兄弟';
            bodyMenuShareAppMessage.desc = '大家一起来挖参';
            bodyMenuShareAppMessage.link = 'http://3.plantgame.sinaapp.com/?'+GameData.getInstance().playerID;
            bodyMenuShareAppMessage.imgUrl = 'http://sztc.gamexun.com/launcher/1.png';
            bodyMenuShareAppMessage.trigger = ()=> {
                // alert('用户点击发送给朋友');
            };
            bodyMenuShareAppMessage.success = ()=> {
                //alert('已分享');

            };
            bodyMenuShareAppMessage.cancel = ()=> {
                //alert('已取消');

            };
            bodyMenuShareAppMessage.fail = (res)=> {
                // alert(JSON.stringify(res));
            };
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
            // alert('已注册获取“发送给朋友”状态事件');
        }

    }
}