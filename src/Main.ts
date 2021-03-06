//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {

        //GameUtil.GameScene.init(this.stage);
        //GameUtil.GameScene.runscene(new GameUtil.LoadingPanel(this.createGameScene,this));
        //
        //return;

        var params= window.location.search;//params:?id,date
        var arr:any = params.substring(1).split("&");

        if(arr[1] == null)
        {
            //console.log("fdsa");
           // window.open("http://rs.kangmei.17188.com/api/weixin.ashx");
            window.location.href = "http://"+GameUtil.GameConfig.IP+"/api/weixin.ashx";
        }
        else
        {
            GameUtil.GameScene.init(this.stage);
            GameUtil.GameScene.runscene(new GameUtil.LoadingPanel(this.createGameScene,this));
        }

    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        PlantGame.GameData.getInstance();
        GameUtil.Http.getinstance();

        //GameUtil.GameScene.runscene(new PlantGame.GameRankScene());
        //return;

        var params= window.location.search;//params:?id,date
        var arr = params.substring(1).split("&");
        //console.log("params====",params);

        PlantGame.GameData.getInstance().playerOpenID = arr[0];
        PlantGame.GameData.getInstance().playerName = arr[1];
        PlantGame.GameData.getInstance().playerImgUrl = arr[2];

        //开始游戏
        GameUtil.GameScene.runscene(new PlantGame.StartGameScene());


        return;
    }
}


