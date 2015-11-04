/**
 * 奖励
 * Created by pior on 15/11/4.
 */

module PlantGame
{
    export class RewardPanel extends GameUtil.BassPanel
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

            var Frame: egret.Bitmap = GameUtil.createBitmapByName("alertBg_png");
            Frame.x = this.mStageW/2;
            Frame.y = this.mStageH/2;
            this.addChild(Frame);


            var data:Object[] = RES.getRes("describeURL_json");
            for(var i:number = 0;i < 6;i++)
            {
                var reward: GameUtil.Menu = new GameUtil.Menu(this,"returnbtn_png","returnbtn_png",this.showginseng,[data[i]]);
                //reward.setScaleMode();
                reward.x = 170+70*(i%3);
                reward.y = 370 + 60*Math.floor(i/3);
                this.addChild(reward);
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
            //window.open(data['url']);
        }

        private close():void
        {
            this.parent.removeChild(this);
        }
    }
}