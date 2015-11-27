/**
 * 开始游戏界面
 * Created by pior on 15/10/28.
 */

module PlantGame
{
    export class StartGameScene extends GameUtil.BassPanel
    {

        public constructor()
        {
            super();
        }
        public init():void
        {
            var sound:egret.Sound = RES.getRes("bgm_mp3");
            sound.play(true);

            //背景图
            var bg:egret.Bitmap = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
            this.addChild(bg);

            //三个按钮
            var fun:Function[] = [this.startGame,this.checkRank,this.gameDescribe];
            var text:string[] = ["开始游戏","查看排名","游戏说明"];
            for(var i:number=0;i<3;i++)
            {
                var btn:GameUtil.Menu = new GameUtil.Menu(this,"buttonImg_png","buttonImg_png",fun[i]);
                btn.setScaleMode();
                btn.addButtonText(text[i]);
                btn.getBtnText().size = 30;
                btn.x = this.mStageW/2;
                btn.y = 315+i*100;
                this.addChild(btn);
            }

            /**
             * 查询是否玩家已注册
             * @type {{openid: string}}
             */
            var parm: Object = {
                openid: GameData.getInstance().playerOpenID
            }
            GameUtil.Http.getinstance().send(parm,"/api/query.ashx",this.receiveStartGame,this);
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);

            //var ip = window['getIP'];
            //console.log("ip====",ip);

        }

        /**
         * 接受查询结果
         * @param data 服务器返回消息
         */
        private receiveStartGame(data:any):void
        {
            if(data['code'] == 1)
            {
                GameData.getInstance().setData(data);
            }
            else
            {
                //alert(data['msg']);
            }
            this.getSignPackage();
        }

        /**
         * 开始游戏
         */
        private startGame():void
        {
            if(GameData.getInstance().isRegister)
            {
                GameUtil.GameScene.runscene(PlantGame.MainGameScene.getinstance());
            }
            else
            {
                var register: RegisterPanel = new RegisterPanel();
                this.addChild(register);
                this.addChild(new PlantGame.GameDescribeScene());
            }
        }

        /**
         * 排行榜
         */
        private checkRank():void
        {
            if(!GameData.getInstance().isRegister)
            {
                var tip:GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","请先注册成为玩家");
                this.addChild(tip);
            }
            else
            {
                this.addChild(new PlantGame.GameRankScene());
            }
        }

        /**
         * 游戏说明
         */
        private gameDescribe():void
        {
            /*****************测试微信红包****************************/
            //var ipstr: string = window['getIP'];
            //console.log("ipstr====",ipstr);
            //ipstr = ipstr.split('|')[1];
            //var param: Object = {
            //    openId: GameData.getInstance().playerOpenID,
            //    amount: 100,
            //    ip: ipstr,
            //    nickname: GameData.getInstance().playerName
            //}
            //console.log("param=======",param);
            //GameUtil.Http.getinstance().send(param,"/api/weixinpay.ashx",this.sendRedpack,this);
            /****************************************/

            this.addChild(new PlantGame.GameDescribeScene());
        }
        private sendRedpack(data:any):void
        {
            if(data['xml']['return_code']['#cdata-section'] != 'FAIL'){
                console.log("发送红包成功=====",data['xml']);
            }
            else
            {
                console.log("发送红包失败=====",data['xml']);
            }
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
        private share(data:any):void
        {
            console.log("data======",data);
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
            bodyMenuShareTimeline.link = 'http://res.kangmei.17188.com';
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
            bodyMenuShareAppMessage.link = 'http://res.kangmei.17188.com';
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
    }
}