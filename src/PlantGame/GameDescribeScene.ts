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

            var desframe: egret.Bitmap = GameUtil.createBitmapByName("describFrame_png");
            desframe.x = this.mStageW/2;
            desframe.y = this.mStageH/2;
            this.addChild(desframe);

            var text: egret.TextField = GameUtil.createTextField(this.mStageW/2,46,25);
            text.text = "游戏说明";
            this.addChild(text);

            var btn:GameUtil.Menu = new GameUtil.Menu(this,"buttonImg_png","buttonImg_png",this.goback);
            btn.setScaleMode();
            btn.addButtonText("返回首页");
            btn.x = this.mStageW/2;
            btn.y = 705;
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

            var textfiled:egret.TextField = GameUtil.createTextField(0,0,18,0,0);
            textfiled.text = text['text'];
            textfiled.textAlign = egret.HorizontalAlign.LEFT;
            textfiled.textColor = 0x000000;
            textfiled.width = 390;

            console.log("textfild======",textfiled.text);

            var textScollview: GameUtil.ScrollView = new GameUtil.ScrollView(390,567);
            textScollview.x = 46;
            textScollview.y = 97;
            textScollview.putItem(textfiled);
            this.addChild(textScollview);

        }
    }
}