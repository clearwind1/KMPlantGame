/**
 * 参框
 * Created by pior on 15/11/4.
 */

module PlantGame
{
    export class GinsengBasketPanel extends GameUtil.BassPanel
    {
        public constructor()
        {
            super();
        }
        public init():void
        {
            this.touchEnabled = true;
            var cover: egret.Shape = GameUtil.createRect(0,0,480,800,0.4);
            this.addChild(cover);

            var ginsengFrame: egret.Bitmap = GameUtil.createBitmapByName("alertBg_png");
            ginsengFrame.x = this.mStageW/2;
            ginsengFrame.y = this.mStageH/2;
            this.addChild(ginsengFrame);


            var data:Object[] = RES.getRes("describeURL_json");
            for(var i:number = 0;i < 6;i++)
            {
                var ginseng: GameUtil.Menu = new GameUtil.Menu(this,"returnbtn_png","returnbtn_png",this.showginseng,[data[i]]);
                ginseng.setScaleMode();
                ginseng.x = 170+70*(i%3);
                ginseng.y = 370 + 60*Math.floor(i/3);
                this.addChild(ginseng);

                var gsnumber: egret.TextField = GameUtil.createTextField(200+70*(i%3),400+60*Math.floor(i/3),15);
                gsnumber.text = "" + i;
                this.addChild(gsnumber);

            }

            var closebtn: GameUtil.Menu = new GameUtil.Menu(this,"cancelBtn_png","cancelBtn_png",this.close);
            closebtn.setScaleMode();
            closebtn.x = 410;
            closebtn.y = 280;
            this.addChild(closebtn);
        }

        private showginseng(data:any):void
        {
            console.log("data========",data['url']);
            window.open(data['url']);
        }

        private close():void
        {
            this.parent.removeChild(this);
        }
    }
}