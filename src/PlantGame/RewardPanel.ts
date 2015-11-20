/**
 * 奖励
 * Created by pior on 15/11/4.
 */

module PlantGame
{
    export class RewardPanel extends GameUtil.BassPanel
    {

        private rewardNum: number;            //奖励数量
        private youhuijuancon: egret.DisplayObjectContainer;        //优惠券容器
        private shopaddObj: Object[];           //门店地址（某个地区的所有门店）
        private shopaddText: egret.TextField;   //门店地址显示文字
        private curShopAddTag: number[] = [0,0,0,0,0,0,0,0,0,0];   //当前优惠券选择的门店（-1表示玩家还没有选择）
        private shopaddScroll: GameUtil.ScrollView = null;      //门店下拉框滚动部分
        private Playeradd: string = 'PN';           //玩家所在城市
        private curSelectYhj: number;               //当前选择优惠券代号
        private rewardKind: number[] = [1,2,1,1,1,1,1,1,1,1];   //优惠券各类
        private yhjID: number[] = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];


        public constructor()
        {
            super();
        }
        public init():void
        {
            var param: Object = {
                userid: GameData.getInstance().playerID
            }
            GameUtil.Http.getinstance().send(param,"/api/prize.ashx?action=query",this.showPanel,this);
        }

        private showPanel(data:any):void
        {
            if(data['code'] == 1){
                GameData.getInstance().rewardNum = data['recordcount'];
                this.rewardNum = GameData.getInstance().rewardNum;

                if(GameData.getInstance().playerCity == "深圳市"){
                    this.Playeradd = 'SZ';
                }
                if(GameData.getInstance().playerCity == "普宁市"){
                    this.Playeradd = 'PN';
                }

                var result:any[] = data['result'];

                this.touchEnabled = true;
                var cover: egret.Shape = GameUtil.createRect(0,0,480,800,0.4);
                this.addChild(cover);

                //背景框
                var Frame: egret.Bitmap = GameUtil.createBitmapByName("ItemFrame_png");
                Frame.x = this.mStageW/2;
                Frame.y = this.mStageH/2 + GameConfig.gameFrameOffY;
                this.addChild(Frame);

                //名字
                var frameName: egret.TextField = GameUtil.createTextField(240,257 + GameConfig.gameFrameOffY,25);
                frameName.text = "奖励";
                this.addChild(frameName);

                //优惠券滚动框
                var rewardScrollview: GameUtil.ScrollView = new GameUtil.ScrollView(390,237);
                rewardScrollview.x = 47;
                rewardScrollview.y = 304 + GameConfig.gameFrameOffY;
                this.addChild(rewardScrollview);

                //优惠券内容
                for(var i:number = 0;i < this.rewardNum;i++)
                {
                    this.yhjID[i] = result[i]['id'];
                    //优惠券图
                    var getitemtype: any = GameConfig.checkRewardItemType(result[i]['prizetype']);
                    var rewardItemId:string = "rewardItem"+getitemtype['itemtype']+"_png";
                    var reward: GameUtil.Menu = new GameUtil.Menu(this,rewardItemId,rewardItemId,this.showginseng,[i,result[i]]);
                    //reward.setScaleMode();
                    reward.x = 94 + 198*(i%2);
                    reward.y = 46 + 120*Math.floor(i/2);
                    rewardScrollview.putItem(reward);

                    //优惠券内容
                    var finance: egret.TextField = GameUtil.createTextField(94+198*(i%2),26+120*Math.floor(i/2),22);
                    finance.text = getitemtype['financet'];
                    rewardScrollview.putItem(finance);
                    var itemtext: egret.TextField = GameUtil.createTextField(94+198*(i%2),69+120*Math.floor(i/2),22);
                    itemtext.text = getitemtype['itemtext'];
                    itemtext.textColor = 0x000000;
                    rewardScrollview.putItem(itemtext);
                }

                //关闭按钮
                var closebtn: GameUtil.Menu = new GameUtil.Menu(this,"closebtn_png","closebtn_png",this.close);
                closebtn.setScaleMode();
                closebtn.x = 450;
                closebtn.y = 275 + GameConfig.gameFrameOffY;
                this.addChild(closebtn);
            }
            else
            {
                console.log("查询优惠券错误======",data['msg']);
            }
        }

        /**
         * 显示某张优惠券的内容
         * @param data1 优惠券代号
         */
        private showginseng(data1:any,data2:any):void
        {
            console.log("data1============",data1,"data2=============",data2);
            this.curSelectYhj = data1;

            var getitemtype: any = GameConfig.checkRewardItemType(data2['prizetype']);

            var playeradd: string = "shopaddress"+this.Playeradd+"_json";

            this.shopaddObj = RES.getRes(playeradd);        //取门店地址配置表

            this.youhuijuancon = new egret.DisplayObjectContainer;
            this.addChild(this.youhuijuancon);

            this.youhuijuancon.addChild(GameUtil.WaitServerPanel.getInstace());
            GameUtil.WaitServerPanel.getInstace().setAlpha(0.5);

            //优惠券内容背景
            var yhjbg: egret.Bitmap = GameUtil.createBitmapByName("bestsengTipFrame_png");
            yhjbg.x = this.mStageW/2;
            yhjbg.y = this.mStageH/2 + GameConfig.gameFrameOffY;
            this.youhuijuancon.addChild(yhjbg);

            var yhjkind: egret.TextField = GameUtil.createTextField(this.mStageW/2,306 + GameConfig.gameFrameOffY,25);
            yhjkind.text = getitemtype['itemtext'];
            yhjkind.textColor = 0x7d4406;
            this.youhuijuancon.addChild(yhjkind);

            //优惠券具体内容
            var yhjcodepoy: number = 370;
            if(getitemtype['itemtype'] == 3){
                yhjcodepoy = 400;
            }
            var yhjCode: egret.TextField = GameUtil.createTextField(40,yhjcodepoy + GameConfig.gameFrameOffY,20,0,0.5,egret.HorizontalAlign.LEFT);
            yhjCode.text = "券       码:";
            yhjCode.textColor = 0x7d4406;
            this.youhuijuancon.addChild(yhjCode);

            var yhjCodenumber: egret.TextField = GameUtil.createTextField(240,yhjcodepoy + GameConfig.gameFrameOffY,20);
            yhjCodenumber.text = data2['code'];
            yhjCodenumber.textColor = 0x7d4406;
            this.youhuijuancon.addChild(yhjCodenumber);

            if(getitemtype['itemtype'] != 3){
                var shopaddress: egret.TextField = GameUtil.createTextField(40,420 + GameConfig.gameFrameOffY,20,0,0.5,egret.HorizontalAlign.LEFT);
                shopaddress.text = "门店地址:";
                shopaddress.textColor = 0x7d4406;
                this.youhuijuancon.addChild(shopaddress);

                var shopframe: egret.Bitmap = GameUtil.createBitmapByName("registerFrame_png");
                shopframe.anchorX = 0;
                shopframe.scaleX = 1.25;
                if(this.Playeradd != "PN"){
                    shopframe.scaleY = 2;
                }
                shopframe.x = 130;
                shopframe.y = 420 + GameConfig.gameFrameOffY;
                this.youhuijuancon.addChild(shopframe);

                this.shopaddText = GameUtil.createTextField(140,420 + GameConfig.gameFrameOffY,15,0,0.5,egret.HorizontalAlign.LEFT);
                if(data2['ispre'] == 0){
                    this.shopaddText.text = this.shopaddObj[0]['add'];
                }
                else
                {
                    this.shopaddText.text = data2['preshopaddr'];
                }
                if(this.Playeradd != "PN"){
                    this.shopaddText.width = 270;
                }
                this.youhuijuancon.addChild(this.shopaddText);

                var tiptext: egret.TextField = GameUtil.createTextField(240,460 + GameConfig.gameFrameOffY,15);
                tiptext.text = "门店地址选择确定后,不可修改";
                tiptext.textColor = 0xff0000;
                this.youhuijuancon.addChild(tiptext);
            }

            //是否显示下拉框按钮
            if(data2['ispre'] == 0 && getitemtype['itemtype'] != 3) {
                var shopaddbtn:GameUtil.Menu = new GameUtil.Menu(this, "shopbtn_png", "shopbtn_png", this.showShopAdd);
                shopaddbtn.x = 418;
                shopaddbtn.y = 420 + GameConfig.gameFrameOffY;
                this.youhuijuancon.addChild(shopaddbtn);
            }

            //跳转游戏说明
            var morebtn: GameUtil.Menu = new GameUtil.Menu(this,"morebtn_png","morebtn_png",this.morehhj);
            morebtn.addButtonText("使用说明");
            morebtn.setScaleMode();
            morebtn.x = 135;
            morebtn.y = 490 + GameConfig.gameFrameOffY;
            this.youhuijuancon.addChild(morebtn);

            //确定选择门店并关闭
            var closebtn: GameUtil.Menu = new GameUtil.Menu(this,"morebtn_png","morebtn_png",this.closeyouhuijuan,[data2['ispre'],getitemtype['itemtype'],data2['prizetype']]);
            closebtn.addButtonText("确定");
            closebtn.setScaleMode();
            closebtn.x = 346;
            closebtn.y = 490 + GameConfig.gameFrameOffY;
            this.youhuijuancon.addChild(closebtn);

        }

        /**
         * 下拉框按钮
         */
        private showShopAdd():void
        {
            if(this.shopaddScroll == null)
            {
                this.shopaddScroll = new GameUtil.ScrollView(350,175);
                this.shopaddScroll.x = 130;
                if(this.Playeradd != "PN"){
                    this.shopaddScroll.y = 455 + GameConfig.gameFrameOffY;
                }
                else{
                    this.shopaddScroll.y = 438 + GameConfig.gameFrameOffY;
                }
                this.youhuijuancon.addChild(this.shopaddScroll);

                //下拉框内容
                for(var i:number = 0;i < this.shopaddObj.length;i++){

                    var shopadditem: GameUtil.Menu = new GameUtil.Menu(this,"registerFrame_png","registerFrame_png",this.getChooseTag,[i]);
                    if(this.Playeradd != "PN"){
                        shopadditem.addButtonText(this.shopaddObj[i]['add'],-115,15);
                        shopadditem.setBtnScale(1.25,2);
                        shopadditem.y = 35 + 70*i;
                    }
                    else{
                        shopadditem.addButtonText(this.shopaddObj[i]['add'],-115);
                        shopadditem.setBtnScale(1.25,1);
                        shopadditem.y = 17 + 35*i;
                    }

                    shopadditem.getBtnText().size = 15;
                    shopadditem.getBtnText().width = 270;
                    shopadditem.getBtnText().anchorX = 0;
                    shopadditem.getBtnText().textAlign = egret.HorizontalAlign.LEFT;
                    shopadditem.x = 154;
                    this.shopaddScroll.putItem(shopadditem);
                }
            }
            else
            {
                this.youhuijuancon.removeChild(this.shopaddScroll);
                this.shopaddScroll = null;
            }
        }

        /**
         * 选择下拉框内容，门店选择
         * @param tag 下拉框内容下标
         */
        private getChooseTag(tag:any):void
        {
            console.log("tag====",tag);
            this.shopaddText.text = this.shopaddObj[tag]['add'];

            this.youhuijuancon.removeChild(this.shopaddScroll);
            this.shopaddScroll = null;
        }

        /**
         * 关闭优惠券内容显示
         */
        private closeyouhuijuan(data:any,data2:any,data3:any):void
        {
            if(data2 != 3 && data == 0){
                var param: Object = {
                    id: this.yhjID[this.curSelectYhj],
                    userid: GameData.getInstance().playerID,
                    address: GameData.getInstance().playerCity,
                    prizetype: data3,
                    preshopaddr: this.shopaddText.text
                }
                GameUtil.Http.getinstance().send(param,"/api/prize.ashx?action=preshopaddr",this.preyhj,this);

                this.close();
            }
            else
            {
                this.removeChild(this.youhuijuancon);
            }

        }
        private preyhj(data:any):void
        {
            if(data['code'] == 1){
                var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel("alertBg_png","门店预约完成");
                this.addChild(tip);
            }
            else
            {
                console.log("门店预约错误=======",data['msg']);
            }
        }

        /**
         * 跳转游戏说明
         */
        private morehhj():void
        {
            GameUtil.GameScene.runscene(new PlantGame.GameDescribeScene());
        }

        /**
         * 退出奖励
         */
        private close():void
        {
            this.parent.removeChild(this);
        }
    }
}