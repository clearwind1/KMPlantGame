/**
 * 农田
 * Created by pior on 15/11/4.
 */
module PlantGame
{
    export class LandPanel extends GameUtil.BassPanel
    {

        private landstate:number[] = [0,0,0,0,0,0];
        private landSeedKind:number[] = [0,0,0,0,0,0];
        private haveSeendland:number[] = [0,0,0,0,0,0];
        private lanpic:GameUtil.Menu[] = [];
        private seedImg: egret.Bitmap[] = [];

        public constructor()
        {
            super();
        }
        public init():void
        {
            for(var i:number= 0;i < 6;i++)
            {
                this.landSeedKind[i] = GameData.getInstance().landSeedKind[i];
                this.landstate[i] = GameData.getInstance().landstate[i];
                this.haveSeendland[i] = GameData.getInstance().haveSeendland[i];
            }

            var lanpox: number[] = [95,230,170,310,250,390];
            var lanpoy: number[] = [340,320,420,390,505,465];
            var data:Object[] = [{"lanID":0},{"lanID":1},{"lanID":2},{"lanID":3},{"lanID":4},{"lanID":5}];
            for(var i:number=0;i < 6;i++)
            {
                if(this.landSeedKind[i] == PlantGame.SeedKind.normalseed)
                {
                    this.seedImg[i] = GameUtil.createBitmapByName("diamod1_png");
                    this.seedImg[i].x = lanpox[i];
                    this.seedImg[i].y = lanpoy[i];
                    this.addChild(this.seedImg[i]);
                }
                else
                {
                    this.seedImg[i] = GameUtil.createBitmapByName("diamod1_1_png");
                    this.seedImg[i].x = lanpox[i];
                    this.seedImg[i].y = lanpoy[i];
                    this.addChild(this.seedImg[i]);
                }

                var lanimg:string = "seedActionBtn_png";
                this.lanpic[i] = new GameUtil.Menu(this,lanimg,lanimg,this.ChangeLandState,[data[i]]);
                this.lanpic[i].addButtonImg("Action1_png",0,-5);
                this.lanpic[i].setScaleMode();
                this.lanpic[i].x = lanpox[i];
                if(this.landstate[i]==5){
                    this.lanpic[i].y = lanpoy[i] - 70;
                }
                else{
                    this.lanpic[i].y = lanpoy[i] - 50;
                }
                this.addChild(this.lanpic[i]);

                if(this.landstate[i] == 0)
                {
                    this.lanpic[i].visible = false;
                    this.seedImg[i].visible = false;
                }


            }
        }

        private ChangeLandState(data:any):void
        {
            var landID:number = <number>data['lanID'];
            //console.log("lanid========",landID);
            if(this.landstate[landID] == 0)
            {
                //没有种植
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","请先种上种子",true);
                this.addChild(tip);
            }
            else if(this.landstate[landID] == 5)
            {
                //收获
                var sengk:number;
                this.landstate[landID] = 0;
                this.lanpic[landID].visible = false;
                //console.log("收获=======",this.landSeedKind[landID]);
                this.updatastate(landID);

                if(this.landSeedKind[landID] == PlantGame.SeedKind.normalseed)
                {
                    sengk = Math.floor(Math.random()*1000)%6;
                }
                else
                {
                    sengk = 5;
                }

                GameData.getInstance().ginsendNum[sengk]++;
                this.getsengAnimata(sengk,landID);
                this.haveSeendland[landID] = 0;
                this.seedImg[landID].visible = false;
            }
            else
            {
                //种上种子状态
                this.landstate[landID]++;
                console.log("当前状态=======",this.landstate[landID]);
                this.updatastate(landID);
                if(this.landstate[landID]==5)
                {
                    this.seedImg[landID].texture = RES.getRes("diamod4_png");
                }
            }
        }

        public getlandNum():number
        {
            return this.checkhaveland();
        }
        public plantSeed(seedkind:number):void
        {
            var landid:number = this.checkhaveland();
            this.landSeedKind[landid] = seedkind;
            this.landstate[landid]++;
            this.updatastate(landid);
            this.haveSeendland[landid] = 1;
            this.lanpic[landid].visible = true;

            if(this.landSeedKind[landid] == PlantGame.SeedKind.normalseed)
            {
                this.seedImg[landid].texture = RES.getRes("diamod1_png");
            }
            else
            {
                this.seedImg[landid].texture = RES.getRes("diamod1_1_png");
            }
            this.seedImg[landid].visible = true;

        }

        private updatastate(lanid:number):void
        {
            var lanimg:string = "Action" + this.landstate[lanid] +"_png";
            this.lanpic[lanid].setAddImgTexture(lanimg);
            var lanpoy: number[] = [340,320,420,390,505,465];
            if(this.landstate[lanid]==5)
            {
                this.lanpic[lanid].y = lanpoy[lanid] - 70;
            }
            else
            {
                this.lanpic[lanid].y = lanpoy[lanid] - 50;
            }
        }

        private checkhaveland():number
        {
            var landid:number = -1;
            for(var i:number = 0;i < 6;i++)
            {
                if(this.haveSeendland[i] == 0)
                {
                    landid = i;
                    break;
                }
            }

            return landid;
        }

        private getsengAnimata(sengkind,landID:number):void
        {
            var lanpox: number[] = [95,230,170,310,250,390];
            var lanpoy: number[] = [340,320,420,390,505,465];

            var sengName:string;
            if(sengkind==5)
            {
                sengName = "bestginseng_png";
            }
            else
            {
                sengName = "ginseng_png";
            }
            var seng: egret.Bitmap = GameUtil.createBitmapByName(sengName);
            seng.x = lanpox[landID];
            seng.y = lanpoy[landID];
            this.addChild(seng);

            var getsengName:string[] = ["党参","丹参","东洋参","高丽参","石柱参","新开河参"];

            var self:any = this;
            var tw = egret.Tween.get(seng);
            tw.to({y:seng.y-50},500).to({x:60,y:747,scaleX:0.2,scaleY:0.2},500).call(function(){
                self.removeChild(seng);
                if(sengkind == 5)
                {
                    var besttip: PlantGame.BestginsengTip = new PlantGame.BestginsengTip();
                    self.addChild(besttip);
                }
                else
                {
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","收获了"+getsengName[sengkind]);
                    self.addChild(tip);
                }
            });

        }

        private static _instance:LandPanel;

        public static getinstance():LandPanel
        {
            if( null == LandPanel._instance )
            {
                LandPanel._instance = new LandPanel();
            }
            return LandPanel._instance;
        }
    }
}