/**
 * 游戏排名界面
 * Created by pior on 15/11/3.
 */

module PlantGame
{
    export class GameRankScene extends GameUtil.BassPanel
    {

        private mscrollview: GameUtil.ScrollView;
        private mOffY: number = -100;

        public constructor()
        {
            super();
        }
        public init():void
        {
            this.touchEnabled = true;
            //var bg:egret.Bitmap = GameUtil.createBitmapByName("endBG_png");
            //bg.x = this.mStageW/2;
            //bg.y = this.mStageH/2;
            //this.addChild(bg);

            var rankFrame: egret.Bitmap = GameUtil.createBitmapByName("rankFrame_png");
            rankFrame.anchorY = 0;
            rankFrame.x = this.mStageW/2;
            rankFrame.y = this.mStageH/2 + this.mOffY - 282;
            this.addChild(rankFrame);
            var rect:egret.Rectangle = new egret.Rectangle(30,31,410,530);
            rankFrame.scale9Grid =rect;
            rankFrame.height = 760;

            var text: egret.TextField = GameUtil.createTextField(this.mStageW/2,146 + this.mOffY,25);
            text.text = "排行榜";
            this.addChild(text);

            //头像
            var headimg: GameUtil.GetImageByUrl = new GameUtil.GetImageByUrl(GameData.getInstance().playerImgUrl,46,46);
            headimg.x = 76;
            headimg.y = 225 + this.mOffY;
            this.addChild(headimg);
            //头像框
            //var playerimgframe: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
            //playerimgframe.x = 76;
            //playerimgframe.y = 212 + this.mOffY;
            //this.addChild(playerimgframe);

            //名称
            var Nametext: egret.TextField = GameUtil.createTextField(120,210 + this.mOffY,20,0,0.5,egret.HorizontalAlign.LEFT);
            Nametext.text = GameData.getInstance().playerName+"";
            Nametext.textColor = 0x000000;
            this.addChild(Nametext);
            //上周排名
            var lastRank: egret.TextField = GameUtil.createTextField(120,235 + this.mOffY,17,0,0.5,egret.HorizontalAlign.LEFT);
            lastRank.text = "上周排名 " + GameData.getInstance().lastweekrank;
            lastRank.textColor = 0x000000;
            this.addChild(lastRank);
            //本周排名
            var nowRank: egret.TextField = GameUtil.createTextField(400,213 + this.mOffY,17,1,0.5,egret.HorizontalAlign.RIGHT);
            nowRank.text = "本周排名 " + GameData.getInstance().weekrank;
            nowRank.textColor = 0x000000;
            this.addChild(nowRank);

            //退出按钮
            var btn:GameUtil.Menu = new GameUtil.Menu(this,"closebtn_png","closebtn_png",this.goback);
            btn.setScaleMode();
            btn.x = 450;
            btn.y = 160 + this.mOffY;
            this.addChild(btn);

            var splictextfiled:egret.TextField = GameUtil.createTextField(45,570,15,0,0);
            splictextfiled.text = "--------------------------------------------------------------------------";
            splictextfiled.textAlign = egret.HorizontalAlign.LEFT;
            splictextfiled.textColor = 0xff0000;
            splictextfiled.width = 385;
            this.addChild(splictextfiled);

            var textjson: Object = {
                "text":"①1-5名：康美大礼包1份及康美优惠券\n\n②6-100名：2张新鲜人参兑换券及康美优惠券\n\n③101-1000名：1张新鲜人参兑换券及康美优惠券\n\n④1001-3000名：康美优惠券\n\n注:每周会对排名进行清零"
            }

            var textfiled:egret.TextField = GameUtil.createTextField(48,600,15,0,0);
            textfiled.text = textjson['text'];
            textfiled.textAlign = egret.HorizontalAlign.LEFT;
            textfiled.textColor = 0x000000;
            textfiled.width = 380;
            this.addChild(textfiled);

            var parm: Object = {
                pageindex:1,
                pagesize:100
            }
            GameUtil.Http.getinstance().send(parm,"/api/ginseng.ashx?action=rank",this.receiveRank,this);

        }

        private goback():void
        {
            //GameUtil.GameScene.runscene(new PlantGame.StartGameScene());
            this.parent.removeChild(this);
        }

        private receiveRank(data:any):void
        {
            if(data['code'] == 1)
            {
                this.showRank(data);
            }
            else
            {
                console.log("排行榜错误=====",data['msg']);
            }

        }

        private showRank(data:any):void
        {
            //创建一个滚动框
            this.mscrollview = new GameUtil.ScrollView(384,420);
            this.mscrollview.x = 43;
            this.mscrollview.y = 253 + this.mOffY;
            this.addChild(this.mscrollview);

            console.log("randdata==========",data);

            for(var i:number = 0;i < data['recordcount'];i++)
            {
                var result: any = data['result'][i];
                //rankitem:排名容器
                var rankitem:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                var pic:egret.Bitmap = GameUtil.createBitmapByName("rankitemFrame_png");
                pic.x = 192;
                pic.y = pic.texture.textureHeight/2 + (pic.texture.textureHeight+10)*i;
                rankitem.addChild(pic);

                if(i < 5)
                {
                    pic.texture = RES.getRes("rankFrontitemFrame_png");
                }

                //头像
                var headimg: GameUtil.GetImageByUrl = new GameUtil.GetImageByUrl(result['headimgurl'],44,44);
                headimg.x = 37;
                headimg.y = 26 + (pic.texture.textureHeight+10)*i;
                rankitem.addChild(headimg);
                //头像框
                //var playerimgframe: egret.Bitmap = GameUtil.createBitmapByName("playerImg_png");
                //playerimgframe.x = 37;
                //playerimgframe.y = 26 + (pic.texture.textureHeight+10)*i;
                //rankitem.addChild(playerimgframe);

                //名字
                var playername: egret.TextField = GameUtil.createTextField(70,26+ (pic.texture.textureHeight+10)*i,20,0,0.5,egret.HorizontalAlign.LEFT);
                playername.text = result['username'] + "";
                playername.textColor = 0x000000;
                rankitem.addChild(playername);

                //人参图
                var seng: egret.Bitmap = GameUtil.createBitmapByName("rankseng_png");
                seng.x = 275;
                seng.y = 26+ (pic.texture.textureHeight+10)*i;
                rankitem.addChild(seng);

                //排名
                var rankText: egret.TextField = GameUtil.createTextField(310,26+(pic.texture.textureHeight+10)*i,15,0,0.5,egret.HorizontalAlign.LEFT);
                rankText.text = "" + result['ginsengcount'];
                rankText.textColor = 0x000000;
                rankitem.addChild(rankText);


                //为滚动条添加排名
                this.mscrollview.putItem(rankitem);
            }
        }
    }
}