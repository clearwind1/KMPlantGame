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
                var lanimg:string = "diamod" + this.landstate[i] +"_png";
                this.lanpic[i] = new GameUtil.Menu(this,lanimg,lanimg,this.ChangeLandState,[data[i]]);
                this.lanpic[i].x = lanpox[i];
                this.lanpic[i].y = lanpoy[i];
                this.addChild(this.lanpic[i]);

                if(this.landstate[i] == 0)
                {
                    this.lanpic[i].visible = false;
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
            else if(this.landstate[landID] == 4)
            {
                //收获
                var sengk:number;
                this.landstate[landID] = 0;
                this.lanpic[landID].visible = false;
                //console.log("收获=======",this.landSeedKind[landID]);
                this.updatastate(landID);
                if(this.landSeedKind[landID] == 0)
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
            }
            else
            {
                //种上种子状态
                this.landstate[landID]++;
                //console.log("当前状态=======",this.landstate[landID]);
                this.updatastate(landID);
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
        }

        private updatastate(lanid:number):void
        {
            var lanimg:string = "diamod" + this.landstate[lanid] +"_png";
            this.lanpic[lanid].setButtonTexture(lanimg,lanimg);
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
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","收获了"+sengkind+"品种的人参");
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