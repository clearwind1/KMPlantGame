/**
 * 游戏数据
 * Created by pior on 15/11/5.
 */

module PlantGame
{

    export enum GingSengKind {
        gaoliseng,
        dangseng,
        danseng,
        shizhuseng,
        dongyangseng,
        xinkaiheseng
    };
    export enum SeedKind{
        normalseed = 1,
        bestseed
    };


    export class GameData
    {
        public ginsendNum: number[];            //各个人参数量
        public seednumber: number;              //优品种子数量
        public bestSeednumber: number;          //臻品种子数量

        public landstate:number[];              //各个土地状态
        public landSeedKind:number[];           //各个土地种子种类
        public haveSeendland:number[];          //各个土地是否有种子

        public playerNickname:string;
        public playerID: number;
        public playerName:string;
        public playerCity:string;
        public playerOpenID:string;
        public playerImgUrl:string;
        public isRegister:boolean;

        public weekrank: number;
        public lastweekrank: number;

        public rewardNum: number;

        public constructor()
        {
            this.ginsendNum = [];
            this.landSeedKind = [];
            this.landstate = [];
            this.haveSeendland = [];
            this.init();
        }

        public init():void
        {
            for(var i:number=0;i < 6;i++)
            {
                this.ginsendNum[i] = 0;
                this.landSeedKind[i] = 0;
                this.landstate[i] = 0;
                this.haveSeendland[i] = 0;
            }
            this.seednumber = 3;
            this.bestSeednumber = 1;
            this.isRegister = false;

            this.playerName = "";

            this.rewardNum = 7;
            this.weekrank = 0;
            this.lastweekrank = 0;
        }

        public setData(data:any):void
        {
            var result: any = data['result'];
            //console.log("result========",result);

            GameData.getInstance().playerID = result['userid'];
            GameData.getInstance().playerName = result['username'];
            GameData.getInstance().playerImgUrl = result['headimgurl'];
            GameData.getInstance().playerNickname = result['realname'];
            GameData.getInstance().playerCity = result['address'];
            GameData.getInstance().bestSeednumber = result['especiallycount'];
            GameData.getInstance().seednumber = result['finecount'];

            GameData.getInstance().ginsendNum[PlantGame.GingSengKind.gaoliseng] = result['gaolishencount'];
            GameData.getInstance().ginsendNum[PlantGame.GingSengKind.dangseng] = result['dangshencount'];
            GameData.getInstance().ginsendNum[PlantGame.GingSengKind.danseng] = result['danshencount'];
            GameData.getInstance().ginsendNum[PlantGame.GingSengKind.shizhuseng] = result['shizhushencount'];
            GameData.getInstance().ginsendNum[PlantGame.GingSengKind.dongyangseng] = result['dongyangshencount'];
            GameData.getInstance().ginsendNum[PlantGame.GingSengKind.xinkaiheseng] = result['heshencount'];

            for(var i:number=0;i < 6;i++){
                var soilresult:any = result['soilresult'][i];
                GameData.getInstance().landstate[i] = soilresult['status'] - 1;
                GameData.getInstance().landSeedKind[i] = soilresult['seedtype'];
                if(GameData.getInstance().landstate[i] == 0){
                    GameData.getInstance().haveSeendland[i] = 0;
                }
                else{
                    GameData.getInstance().haveSeendland[i] = 1;
                }
            }

            GameData.getInstance().weekrank = result['weekrank'];
            GameData.getInstance().lastweekrank = result['lastweekrank'];

            GameData.getInstance().isRegister = true;
        }

        private static _instance:GameData;
        public static getInstance():GameData
        {
            if(this._instance == null)
            {
                this._instance = new PlantGame.GameData();
            }

            return this._instance;
        }
    }
}