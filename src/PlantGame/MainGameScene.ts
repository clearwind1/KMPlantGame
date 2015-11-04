/**
 * Created by pior on 15/10/28.
 */

module PlantGame
{
    export class MainGameScene extends GameUtil.BassPanel
    {

        private mSeednumber: number;
        private mBestSeednumber: number;
        private movieDatabtn: GameUtil.Menu;

        public constructor()
        {
            this.mSeednumber = 3;
            this.mBestSeednumber = 0;
            super();
        }
        public init():void
        {
            var bg:egret.Bitmap = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
            this.addChild(bg);

            //头像

            //用户名


            //退出游戏
            var btn:GameUtil.Menu = new GameUtil.Menu(this,"returnbtn_png","returnbtn_png",this.goback);
            btn.setScaleMode();
            btn.x = 400;
            btn.y = 40;
            this.addChild(btn);


            this.addChild(PlantGame.LandPanel.getinstance());

            this.showTools();

        }

        private goback():void
        {
            GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
        }

        /**
         * 显示道具，预约，参框，奖励，优品种子，臻品种子
         */
        private showTools():void
        {

            this.movieDatabtn = new GameUtil.Menu(this,"returnbtn_png","returnbtn_png",this.movieData);
            this.movieDatabtn.setScaleMode();
            this.movieDatabtn.x = 60;
            this.movieDatabtn.y = 100;
            this.addChild(this.movieDatabtn);
            //this.movieDatabtn.visible = false;

            var fun:Function[] = [this.ginsengBasket,this.getreward,this.plantSeed,this.plantBestSeed];
            var btnY:number[] = [180,260,340,420];
            for(var i:number=0;i<4;i++)
            {
                var btn:GameUtil.Menu = new GameUtil.Menu(this,"returnbtn_png","returnbtn_png",fun[i]);
                btn.setScaleMode();
                btn.x = 60;
                btn.y = btnY[i];
                this.addChild(btn);
            }
        }

        /**
         * 预约电影票
         */
        private movieData():void
        {
            console.log("预约电影票");
            var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","预约成功");
            this.addChild(tip);
        }

        /**
         * 参框
         */
        private ginsengBasket():void
        {
            console.log("显示参框");
            var gsb: PlantGame.GinsengBasketPanel = new PlantGame.GinsengBasketPanel();
            this.addChild(gsb);
        }

        /**
         * 奖励
         */
        private getreward():void
        {
            console.log("获得奖励");
            var rwp: PlantGame.RewardPanel = new PlantGame.RewardPanel();
            this.addChild(rwp);
        }

        /**
         * 优品种子
         */
        private plantSeed():void
        {
            console.log("种植优品种子");
            if(this.mSeednumber > 0)
            {
                //处理种植
                if(PlantGame.LandPanel.getinstance().getlandNum() == -1)
                {
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有土地了",true);
                    this.addChild(tip);
                }
                else
                {
                    this.mSeednumber--;
                    PlantGame.LandPanel.getinstance().plantSeed(0);
                }
            }
            else
            {
                //没有种子
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有优品种子",true);
                this.addChild(tip);
            }
        }

        /**
         * 臻品种子
         */
        private plantBestSeed():void
        {
            console.log("种植臻品种子");
            if(this.mBestSeednumber > 0)
            {
                //处理种植
                if(PlantGame.LandPanel.getinstance().getlandNum()== -1)
                {
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有土地了",true);
                    this.addChild(tip);
                }
                else
                {
                    this.mBestSeednumber--;
                    PlantGame.LandPanel.getinstance().plantSeed(1);
                }
            }
            else
            {
                //没有种子
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","没有臻品种子",true);
                this.addChild(tip);
            }
        }

    }
}