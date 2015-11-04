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
            var data:Object[] = [{"lanID":0},{"lanID":1},{"lanID":2},{"lanID":3},{"lanID":4},{"lanID":5}];
            for(var i:number=0;i < 6;i++)
            {
                var lanimg:string = "diamod" + this.landstate[i] +"_png";
                this.lanpic[i] = new GameUtil.Menu(this,lanimg,lanimg,this.ChangeLandState,[data[i]]);
                this.lanpic[i].x = 160 + 160*(i%2);
                this.lanpic[i].y = 320 + 80*Math.floor(i/2);
                this.addChild(this.lanpic[i]);
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
                this.landstate[landID] = 0;
                //console.log("收获=======",this.landSeedKind[landID]);
                this.updatastate(landID);
                if(this.landSeedKind[landID] == 0)
                {
                    var sengk:number = Math.floor(Math.random()*1000)%6;
                    console.log("sengk========",sengk);
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","收获了"+sengk+"品种的人参",true);
                    this.addChild(tip);
                }
                else
                {
                    var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","收获了新开河参",true);
                    this.addChild(tip);
                }
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