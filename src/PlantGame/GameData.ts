/**
 * 游戏数据
 * Created by pior on 15/11/5.
 */

module PlantGame
{

    //人参种类
    export enum GingSengKind {
        gaoliseng,
        dangseng,
        danseng,
        shizhuseng,
        dongyangseng,
        xinkaiheseng
    };

    //种子类型
    export enum SeedKind{
        normalseed = 1,
        bestseed
    };

    //配置
    export class GameConfig
    {
        public static gameFrameOffY: number = -30;
        //优惠券类型
        public static KMRS100:string = "KMRS100";
        public static KMRS50:string = "KMRS50";
        public static KMZL:string = "KMZL";
        public static KMDS:string = "KMDS";
        public static GinsengTicket1:string = "GinsengTicket1";
        public static GinsengTicket2:string = "GinsengTicket2";
        public static MOVIE:string = "MOVIE";

        public static checkRewardItemType(type:string):any
        {
            var item: Object;
            if(type == this.KMRS100 || type == this.KMRS50){
                var fina: string = "￥100";
                if(type == this.KMRS50){
                    fina = "￥50";
                }
                item = {
                    itemtype: 1,
                    financet: fina,
                    itemtext: "康美人生代金券"
                }
                return item;
            }
            else if(type == this.KMZL){
                item = {
                    itemtype: 2,
                    financet: "￥5",
                    itemtext: "康美之恋代金券"
                }
                return item;
            }
            else if(type == this.KMDS){
                item = {
                    itemtype: 3,
                    financet: "￥10",
                    itemtext: "康美电商代金券"
                }
                return item;
            }
            else{
                var tex:string = "一张";
                if(type == this.GinsengTicket2){
                    tex = "两张";
                }
                item = {
                    itemtype: 4,
                    financet: tex,
                    itemtext: "人参提货券"
                }
                return item;
            }
        }
    }


    export class GameData
    {
        public ginsendNum: number[];            //各个人参数量
        public seednumber: number;              //优品种子数量
        public bestSeednumber: number;          //臻品种子数量

        public landstate:number[];              //各个土地状态
        public landSeedKind:number[];           //各个土地种子种类
        public haveSeendland:number[];          //各个土地是否有种子

        public playerNickname:string;           //玩家昵称
        public playerID: number;                //玩家ID
        public playerName:string;               //玩家名字
        public playerCity:string;               //玩家所在城市
        public playerOpenID:string;             //玩家微信OpenID
        public playerImgUrl:string;             //玩家头像地址
        public isRegister:boolean;              //玩家是否注册过

        public weekrank: number;                //本周排名
        public lastweekrank: number;            //上周排名

        public rewardNum: number;               //奖励数量

        public ispremovie: number;              //是否预约电影票
        public moviePreshopaddr: string;        //预约电影票门店地址

        public isPlantAnimation: boolean = false;
        public isRewardAnimation: boolean = false;
        public isToolPage: boolean = true;

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
            console.log("result========",data);

            GameData.getInstance().playerID = result['userid'];
            GameData.getInstance().playerName = result['username'];
            if(GameData.getInstance().playerName.length > 5)
            {
                console.log("len======",GameData.getInstance().playerName.substr(0,5));
                GameData.getInstance().playerName = GameData.getInstance().playerName.substr(0,5);
            }
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

            GameData.getInstance().ispremovie = result['ispremovie'];
            GameData.getInstance().moviePreshopaddr = result['preshopaddr'];

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