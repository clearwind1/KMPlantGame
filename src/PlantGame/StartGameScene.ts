/**
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

            var bg:egret.Bitmap = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
            this.addChild(bg);


            var startbtn:GameUtil.Menu = new GameUtil.Menu(this,"beginBtn_png","beginBtn_png",this.startGame);
            startbtn.setScaleMode();
            startbtn.x = this.mStageW/2;
            startbtn.y = this.mStageH/2;
            this.addChild(startbtn);
        }

        private startGame():void
        {
            GameUtil.GameScene.runscene(new PlantGame.MainGameScene(),GameUtil.GameConfig.TransAlpha);
        }
    }
}