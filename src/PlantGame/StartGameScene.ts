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

            //游戏标题
            var gametitle:egret.Bitmap = GameUtil.createBitmapByName("buttonImg_png");
            gametitle.x = this.mStageW/2;
            gametitle.y = 100;
            this.addChild(gametitle);

            //三个按钮
            var fun:Function[] = [this.startGame,this.checkRank,this.gameDescribe];
            var text:string[] = ["开始游戏","查看排名","游戏说明"];
            for(var i:number=0;i<3;i++)
            {
                var btn:GameUtil.Menu = new GameUtil.Menu(this,"buttonImg_png","buttonImg_png",fun[i]);
                btn.setScaleMode();
                btn.addButtonText(text[i]);
                btn.x = this.mStageW/2;
                btn.y = 500+i*100;
                this.addChild(btn);
            }

        }

        private startGame():void
        {
            GameUtil.GameScene.runscene(new PlantGame.MainGameScene(),GameUtil.GameConfig.TransAlpha);
        }
        private checkRank():void
        {
            GameUtil.GameScene.runscene(new PlantGame.GameRankScene(),GameUtil.GameConfig.CrossLeft,400);
        }
        private gameDescribe():void
        {
            GameUtil.GameScene.runscene(new PlantGame.GameDescribeScene(),GameUtil.GameConfig.CrossLeft,400);
        }
    }
}