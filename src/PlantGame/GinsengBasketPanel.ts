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
            var getsengName:string[] = ["高丽参","党参","丹参","石柱参","东洋参","新开河参"];
            var sengName:string[] = ["gaoliseng_png","dangseng_png","danseng_png","shizhuseng_png","dongyangseng_png","xinkaiheseng_png"];
            for(var i:number = 0;i < 6;i++)
            {

                var ginsengitemframe: egret.Bitmap = GameUtil.createBitmapByName("gingsenitemFrame_png");
                ginsengitemframe.x = 111+132*(i%3);
                ginsengitemframe.y = 353 + 116*Math.floor(i/3);
                this.addChild(ginsengitemframe);

                var ginseng: GameUtil.Menu = new GameUtil.Menu(this,sengName[i],sengName[i],this.showginseng,[data[i]]);
                ginseng.setScaleMode();
                ginseng.x = 111+132*(i%3);
                ginseng.y = 353 + 116*Math.floor(i/3);
                this.addChild(ginseng);

                var gsnumber: egret.TextField = GameUtil.createTextField(143+132*(i%3),370+120*Math.floor(i/3),20);
                gsnumber.text = "" + PlantGame.GameData.getInstance().ginsendNum[i];
                gsnumber.textColor = 0x000000;
                this.addChild(gsnumber);

                var ginsengName: egret.TextField = GameUtil.createTextField(111+132*(i%3),410+116*Math.floor((i/3)),20);
                ginsengName.text = getsengName[i];
                ginsengName.textColor = 0x000000;
                this.addChild(ginsengName);

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
            window.location.href = data['url'];
        }

        private close():void
        {
            this.parent.removeChild(this);
        }
    }
}