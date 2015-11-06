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

            var rankFrame: egret.Bitmap = GameUtil.createBitmapByName("rankFrame_png");
            rankFrame.x = this.mStageW/2;
            rankFrame.y = this.mStageH/2;
            this.addChild(rankFrame);

            var text: egret.TextField = GameUtil.createTextField(this.mStageW/2,146,25);
            text.text = "排行榜";
            this.addChild(text);

            //头像
            var playerimgframe: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
            playerimgframe.x = 76;
            playerimgframe.y = 212;
            this.addChild(playerimgframe);

            //名称
            var Nametext: egret.TextField = GameUtil.createTextField(120,213,20,0,0.5,egret.HorizontalAlign.LEFT);
            Nametext.text = GameData.getInstance().playerName + "的农场";
            Nametext.textColor = 0x000000;
            this.addChild(Nametext);
            //上周排名
            var lastRank: egret.TextField = GameUtil.createTextField(140,235,13,0,0.5,egret.HorizontalAlign.LEFT);
            lastRank.text = "上周排名 " + 123;
            lastRank.textColor = 0x000000;
            this.addChild(lastRank);
            //本周排名
            var nowRank: egret.TextField = GameUtil.createTextField(400,213,15,1,0.5,egret.HorizontalAlign.RIGHT);
            nowRank.text = "本周排名 " + 2000;
            nowRank.textColor = 0x000000;
            this.addChild(nowRank);

            //退出按钮
            var btn:GameUtil.Menu = new GameUtil.Menu(this,"closebtn_png","closebtn_png",this.goback);
            btn.setScaleMode();
            btn.x = 450;
            btn.y = 160;
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
            this.mscrollview = new GameUtil.ScrollView(384,383);
            this.mscrollview.x = 43;
            this.mscrollview.y = 253;
            this.addChild(this.mscrollview);
            for(var i:number = 0;i < 3000;i++)
            {
                //rankitem:排名容器
                var rankitem:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                var pic:egret.Bitmap = GameUtil.createBitmapByName("rankitemFrame_png");
                pic.x = 192;
                pic.y = pic.texture.textureHeight/2 + (pic.texture.textureHeight+10)*i;
                rankitem.addChild(pic);

                if(i < 3)
                {
                    var startname: string = "start"+i+"_png";
                    var start: egret.Bitmap = GameUtil.createBitmapByName(startname);
                    start.x = 35;
                    start.y = 26 + (pic.texture.textureHeight+10)*i;
                    rankitem.addChild(start);
                }

                //头像
                var playerimgframe: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
                playerimgframe.x = 87;
                playerimgframe.y = 26 + (pic.texture.textureHeight+10)*i;
                rankitem.addChild(playerimgframe);

                //名字
                var playername: egret.TextField = GameUtil.createTextField(125,26+ (pic.texture.textureHeight+10)*i,20,0,0.5,egret.HorizontalAlign.LEFT);
                playername.text = GameData.getInstance().playerName + "的农场";
                playername.textColor = 0x000000;
                rankitem.addChild(playername);

                //人参图
                var seng: egret.Bitmap = GameUtil.createBitmapByName("rankseng_png");
                seng.x = 300;
                seng.y = 26+ (pic.texture.textureHeight+10)*i;
                rankitem.addChild(seng);

                //排名
                var rankText: egret.TextField = GameUtil.createTextField(335,26+(pic.texture.textureHeight+10)*i,15,0,0.5,egret.HorizontalAlign.LEFT);
                rankText.text = "" + 1234;
                rankText.textColor = 0x000000;
                rankitem.addChild(rankText);


                //为滚动条添加排名
                this.mscrollview.putItem(rankitem);
            }
        }
    }
}