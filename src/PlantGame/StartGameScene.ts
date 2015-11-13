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

            var parm: Object = {
                openid: "osMTev4Qs_mspjbbGr6QWbMpBk_I"//GameData.getInstance().playerOpenID
            }
            GameUtil.Http.getinstance().send(parm,"/api/query.ashx",this.receiveStartGame,this);
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);

            //var ip = window['getIP'];
            //console.log("ip====",ip);

        }

        private startGame():void
        {
            if(GameData.getInstance().isRegister)
            {
                GameUtil.GameScene.runscene(new PlantGame.MainGameScene(),GameUtil.GameConfig.TransAlpha);
            }
            else
            {
                var register: RegisterPanel = new RegisterPanel();
                this.addChild(register);
            }
        }
        private receiveStartGame(data:any):void
        {
            if(data['code'] == 1)
            {
                GameData.getInstance().setData(data);
            }
            else
            {
                alert(data['msg']);
            }
        }

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

        private gameDescribe():void
        {
            GameUtil.GameScene.runscene(new PlantGame.GameDescribeScene());
        }
    }
}