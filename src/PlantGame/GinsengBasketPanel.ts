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

            var ginsengFrame: egret.Bitmap = GameUtil.createBitmapByName("ItemFrame_png");
            ginsengFrame.x = this.mStageW/2;
            ginsengFrame.y = this.mStageH/2;
            this.addChild(ginsengFrame);

            //名字
            var frameName: egret.TextField = GameUtil.createTextField(240,257,25);
            frameName.text = "参筐";
            this.addChild(frameName);

            var data:Object[] = RES.getRes("describeURL_json");
            var sengName:string[] = ["dangseng_png","danseng_png","dongyangseng_png","gaoliseng_png","shizhuseng_png","xinkaiheseng_png"];
            for(var i:number = 0;i < 6;i++)
            {
                var ginseng: GameUtil.Menu = new GameUtil.Menu(this,sengName[i],sengName[i],this.showginseng,[data[i]]);
                ginseng.setScaleMode();
                ginseng.x = 100 + 140*(i%3);
                ginseng.y = 370 + 100*Math.floor(i/3);
                this.addChild(ginseng);

                var gsnumber: egret.TextField = GameUtil.createTextField(140+140*(i%3),390+100*Math.floor(i/3),20);
                gsnumber.text = "" + PlantGame.GameData.getInstance().ginsendNum[i];
                gsnumber.textColor = 0x000000;
                this.addChild(gsnumber);

            }

            var closebtn: GameUtil.Menu = new GameUtil.Menu(this,"closebtn_png","closebtn_png",this.close);
            closebtn.setScaleMode();
            closebtn.x = 450;
            closebtn.y = 275;
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