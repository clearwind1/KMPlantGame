/**
 * 游戏数据
 * Created by pior on 15/11/5.
 */

module PlantGame
{
    export class GameData
    {
        public ginsendNum: number[];            //各个人参数量
        public seednumber: number;              //优品种子数量
        public bestSeednumber: number;          //臻品种子数量

        public landstate:number[];             //各个土地状态
        public landSeedKind:number[];          //各个土地种子种类
        public haveSeendland:number[];         //各个土地是否有种子

        public playerName:string;
        public isRegister:boolean;

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