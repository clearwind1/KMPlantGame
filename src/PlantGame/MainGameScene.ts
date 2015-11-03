/**
 * Created by pior on 15/10/28.
 */

module PlantGame
{
    export class MainGameScene extends GameUtil.BassPanel
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


            //var tip:GameUtil.TipsPanel = new GameUtil.TipsPanel("just just just just just test!!!");
            //this.addChild(tip);
            //tip.setTextwidth(40*5);

        }

        /**
         * 显示土地，种植种子
         */
        private showLand():void
        {

        }
        /**
         * 显示道具，浇水等
         */
        private showTools():void
        {

        }
        /**
         * 显示人参
         */
        private showginseng():void
        {

        }

    }
}