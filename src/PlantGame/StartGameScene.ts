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

                if(!GameData.getInstance().isRegister)
                {
                    this.addChild(new PlantGame.GameDescribeScene());
                }
            }
            else
            {
                //alert(data['msg']);
            }
        }

        /**
         * 开始游戏
         */
        private startGame():void
        {
            if(GameData.getInstance().isRegister)
            {
                GameUtil.GameScene.runscene(PlantGame.MainGameScene.getinstance(),GameUtil.GameConfig.TransAlpha);
            }
            else
            {
                var register: RegisterPanel = new RegisterPanel();
                this.addChild(register);
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
                GameUtil.GameScene.runscene(new PlantGame.GameRankScene());
            }
        }

        /**
         * 游戏说明
         */
        private gameDescribe():void
        {
            /*****************测试微信红包****************************/
            var ipstr: string = window['getIP'];
            ipstr = ipstr.split('|')[0];
            var param: Object = {
                openId: GameData.getInstance().playerOpenID,
                amount: 1,
                ip: ipstr,
                nickname: GameData.getInstance().playerName
            }
            GameUtil.Http.getinstance().send(param,"/api/weixinpay.ashx",this.sendRedpack,this);
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
    }
}