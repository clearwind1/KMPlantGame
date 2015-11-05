/**
 * 游戏排名界面
 * Created by pior on 15/11/3.
 */

module PlantGame
{
    export class GameRankScene extends GameUtil.BassPanel
    {

        private mscrollview: GameUtil.ScrollView;

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
            btn.y = 650;
            this.addChild(btn);

            this.showRank();

            //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchmove,this);

        }
        private touchmove(event:egret.TouchEvent):void
        {
            console.log("scrolltop=======",this.mscrollview.getScorllTop());
        }

        private goback():void
        {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        }

        private showRank():void
        {
            //创建一个滚动框
            this.mscrollview = new GameUtil.ScrollView(400,500);
            this.mscrollview.x = 40;
            this.mscrollview.y = 50;
            this.addChild(this.mscrollview);
            for(var i:number = 0;i < 3000;i++)
            {
                //rankitem:排名容器
                var rankitem:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                var pic:egret.Bitmap = GameUtil.createBitmapByName("beginBtn_png");
                rankitem.addChild(pic);

                pic.x = pic.texture.textureWidth/2;
                pic.y = 10 + pic.texture.textureHeight/2 + pic.texture.textureHeight*i;

                //为滚动条添加排名
                this.mscrollview.putItem(rankitem);
            }
        }
    }
}