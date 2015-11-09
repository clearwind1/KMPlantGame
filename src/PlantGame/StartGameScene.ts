/**
 * 开始游戏界面
 * Created by pior on 15/10/28.
 */

module PlantGame
{
    export class StartGameScene extends GameUtil.BassPanel
    {

        private isRegister: boolean = false;

        public constructor()
        {
            super();
        }
        public init():void
        {
            this.isRegister = GameData.getInstance().isRegister;
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

        }

        private startGame():void
        {
            if(!this.isRegister)
            {
                var register: RegisterPanel = new RegisterPanel();
                this.addChild(register);
            }
            else
            {
                GameUtil.GameScene.runscene(new PlantGame.MainGameScene(),GameUtil.GameConfig.TransAlpha);
            }
        }
        private checkRank():void
        {
            if(!this.isRegister)
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