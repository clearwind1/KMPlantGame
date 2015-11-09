/**
 * 奖励
 * Created by pior on 15/11/4.
 */

module PlantGame
{
    export class RewardPanel extends GameUtil.BassPanel
    {

        private rewardNum: number;

        public constructor()
        {
            super();
        }
        public init():void
        {
            this.rewardNum = GameData.getInstance().rewardNum;

            this.touchEnabled = true;
            var cover: egret.Shape = GameUtil.createRect(0,0,480,800,0.4);
            this.addChild(cover);

            var Frame: egret.Bitmap = GameUtil.createBitmapByName("ItemFrame_png");
            Frame.x = this.mStageW/2;
            Frame.y = this.mStageH/2;
            this.addChild(Frame);

            //名字
            var frameName: egret.TextField = GameUtil.createTextField(240,257,25);
            frameName.text = "奖励";
            this.addChild(frameName);

            var data:Object[] = RES.getRes("describeURL_json");
            for(var i:number = 0;i < this.rewardNum;i++)
            {
                //优惠券图
                var rewardItemId:string = "rewardItem"+1+"_png";
                var reward: GameUtil.Menu = new GameUtil.Menu(this,rewardItemId,rewardItemId,this.showginseng,[i,data[i]]);
                //reward.setScaleMode();
                reward.x = 142 + 200*(i%2);
                reward.y = 363 + 120*Math.floor(i/2);
                this.addChild(reward);

                //优惠券内容
                var finance: egret.TextField = GameUtil.createTextField(142+200*(i%2),342+120*Math.floor(i/2),22);
                finance.text = "￥"+100;
                this.addChild(finance);
                var itemtext: egret.TextField = GameUtil.createTextField(142+200*(i%2),386+120*Math.floor(i/2),22);
                itemtext.text = "康美电商优惠券";
                itemtext.textColor = 0x000000;
                this.addChild(itemtext);

            }

            var closebtn: GameUtil.Menu = new GameUtil.Menu(this,"closebtn_png","closebtn_png",this.close);
            closebtn.setScaleMode();
            closebtn.x = 450;
            closebtn.y = 275;
            this.addChild(closebtn);
        }

        private showginseng(data1:any,data2:any):void
        {
            console.log("data2========",data2['url'],"data1============",data1);

        }

        private close():void
        {
            this.parent.removeChild(this);
        }
    }
}