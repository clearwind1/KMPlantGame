/**
 * 获得新开河参提示
 * Created by pior on 15/11/6.
 */

module PlantGame
{
    export class BestginsengTip extends egret.DisplayObjectContainer
    {
        private mLight: egret.Bitmap;
        private sengkind: number;
        public constructor(sengkind:number)
        {
            super();
            this.sengkind = sengkind;
            this.init();
        }

        private init()
        {
            var stageW: number = egret.MainContext.instance.stage.stageWidth;
            var stageH: number = egret.MainContext.instance.stage.stageHeight;

            var coverbg:egret.Shape = GameUtil.createRect(0, 0, 480, 800, 0.4);
            this.addChild(coverbg);
            this.touchEnabled = true;

            var tipbg: egret.Bitmap = GameUtil.createBitmapByName("bestsengTipFrame_png");
            tipbg.x = stageW/2;
            tipbg.y = stageH/2;
            this.addChild(tipbg);

            this.mLight = GameUtil.createBitmapByName("tiplight2_png");
            this.mLight.x = stageW/2;
            this.mLight.y = stageH/2;
            this.addChild(this.mLight);

            this.showLight();

            var ginsengpox:number[] = [233,233,233,233,233,233];
            var ginsengpoy:number[] = [383,383,383,383,383,383];
            var ginsengname:string[] = ["gaoliseng_png","dangseng_png","danseng_png","shizhuseng_png","dongyangseng_png","xinkaiheseng_png"];
            var ginseng: egret.Bitmap = GameUtil.createBitmapByName(ginsengname[this.sengkind]);
            ginseng.x = ginsengpox[this.sengkind];
            ginseng.y = ginsengpoy[this.sengkind];
            this.addChild(ginseng);

            var getsengName:string[] = ["高丽参","党参","丹参","石柱参","东洋参","新开河参"];
            var textcon: egret.TextField = GameUtil.createTextField(stageW/2,435,20);
            textcon.text = "恭喜您,挖到了"+getsengName[this.sengkind]+"!太棒了!";
            textcon.textColor = 0x000000;
            this.addChild(textcon);

            var morebtn: GameUtil.Menu = new GameUtil.Menu(this,"morebtn_png","morebtn_png",this.openMore);
            morebtn.setScaleMode();
            morebtn.addButtonText("了解详情");
            morebtn.x = 150;
            morebtn.y = 485;
            this.addChild(morebtn);

            var returnbtn: GameUtil.Menu = new GameUtil.Menu(this,"tipreturnbtn_png","tipreturnbtn_png",this.close);
            returnbtn.setScaleMode();
            returnbtn.addButtonText("返回游戏");
            returnbtn.x = 345;
            returnbtn.y = 485;
            this.addChild(returnbtn);

        }

        private openMore():void
        {
            var data:Object[] = RES.getRes("describeURL_json");
            window.location.href = data[this.sengkind]['url'];
        }

        private close():void
        {
            egret.Tween.removeTweens(this.mLight);
            this.parent.removeChild(this);
        }


        private showLight():void
        {
            var rota: number = this.mLight.rotation;

            rota += 10;
            var tw = egret.Tween.get(this.mLight);
            tw.to({rotation:rota},300).call(this.showLight,this);
        }
    }
}