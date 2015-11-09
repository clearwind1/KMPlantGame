/**
 * 游戏说明界面
 * Created by pior on 15/11/3.
 */

module PlantGame
{
    export class GameDescribeScene extends GameUtil.BassPanel
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

            var btn:GameUtil.Menu = new GameUtil.Menu(this,"buttonImg_png","buttonImg_png",this.goback);
            btn.setScaleMode();
            btn.addButtonText("返回首页");
            btn.x = this.mStageW/2;
            btn.y = 600;
            this.addChild(btn);

            this.showText();
        }

        private goback():void
        {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        }

        private showText():void
        {
            var text:any = RES.getRes("gameDescribe_json");
            //var titletext:egret.TextField = GameUtil.createTextField(240,100,35);
            //titletext.text = text['title'];
            //this.addChild(titletext);
            //titletext.textColor = 0x000000;

            var textfiled:egret.TextField = GameUtil.createTextField(20,230,20,0);
            textfiled.text = text['text'];
            this.addChild(textfiled);
            textfiled.textAlign = egret.HorizontalAlign.LEFT;
            textfiled.textColor = 0x000000;
            textfiled.width = 450;
        }
    }
}