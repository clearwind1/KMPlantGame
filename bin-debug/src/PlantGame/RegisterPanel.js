/**
 * 注册界面
 * Created by pior on 15/11/6.
 */
var PlantGame;
(function (PlantGame) {
    var RegisterPanel = (function (_super) {
        __extends(RegisterPanel, _super);
        function RegisterPanel() {
            _super.call(this);
        }
        var __egretProto__ = RegisterPanel.prototype;
        __egretProto__.init = function () {
            this.textinput = [];
            this.touchEnabled = true;
            var cover = GameUtil.createRect(0, 0, 480, 800, 0.4);
            this.addChild(cover);
            var Frame = GameUtil.createBitmapByName("ItemFrame_png");
            Frame.x = this.mStageW / 2;
            Frame.y = this.mStageH / 2;
            this.addChild(Frame);
            //名字
            var frameName = GameUtil.createTextField(240, 257, 25);
            frameName.text = "注册";
            this.addChild(frameName);
            //注册内容
            var maxchar = [5, 1, 11];
            var textcon = ["姓名:", "性别:", "手机号:", "联系地址:"];
            for (var i = 0; i < 4; i++) {
                var text = GameUtil.createTextField(143, 325 + 50 * i, 20, 1, 0.5, egret.HorizontalAlign.RIGHT);
                text.text = textcon[i];
                text.textColor = 0x000000;
                this.addChild(text);
                if (i != 3) {
                    var inputframe = GameUtil.createBitmapByName("registerFrame_png");
                    inputframe.x = 270;
                    inputframe.y = 325 + 50 * i;
                    this.addChild(inputframe);
                    this.textinput[i] = GameUtil.createInputText(162, 315 + 50 * i, 20, 240, 20, maxchar[i]);
                    this.addChild(this.textinput[i]);
                }
            }
            //省
            var sheninput = GameUtil.createBitmapByName("registerFrame_png");
            sheninput.anchorX = 0;
            sheninput.scaleX = 0.5;
            sheninput.x = 149;
            sheninput.y = 325 + 50 * 3;
            this.addChild(sheninput);
            this.textinput[3] = GameUtil.createInputText(162, 315 + 50 * 3, 20, 120, 20, 5);
            this.textinput[3].text = "省";
            this.addChild(this.textinput[3]);
            //市
            var shiinput = GameUtil.createBitmapByName("registerFrame_png");
            shiinput.anchorX = 0;
            shiinput.scaleX = 0.5;
            shiinput.x = 270;
            shiinput.y = 325 + 50 * 3;
            this.addChild(shiinput);
            this.textinput[4] = GameUtil.createInputText(283, 315 + 50 * 3, 20, 120, 20, 5);
            this.textinput[4].text = "市";
            this.addChild(this.textinput[4]);
            //详细地址
            var moreinput = GameUtil.createBitmapByName("registerFrame_png");
            moreinput.x = 270;
            moreinput.y = 325 + 50 * 4;
            this.addChild(moreinput);
            this.textinput[5] = GameUtil.createInputText(162, 315 + 50 * 4, 20, 220, 20);
            this.addChild(this.textinput[5]);
            var sureBtn = new GameUtil.Menu(this, "morebtn_png", "morebtn_png", this.sureRegister);
            sureBtn.addButtonText("确定");
            sureBtn.x = 240;
            sureBtn.y = 610;
            this.addChild(sureBtn);
        };
        __egretProto__.sureRegister = function () {
            var tip;
            if (this.textinput[0].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "姓名不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[1].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "性别不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[2].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "手机号不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[3].text == "省" || this.textinput[3].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "省份不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[4].text == "市" || this.textinput[3].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "城市不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (!GameUtil.isPhoneNum(this.textinput[2].text)) {
                tip = new GameUtil.TipsPanel("alertBg_png", "不是正确的手机号", true, 1500);
                this.addChild(tip);
                return;
            }
            this.upLoadData();
        };
        __egretProto__.upLoadData = function () {
            PlantGame.GameData.getInstance().playerName = this.textinput[0].text;
            PlantGame.GameData.getInstance().isRegister = true;
            GameUtil.GameScene.runscene(new PlantGame.MainGameScene(), GameUtil.GameConfig.TransAlpha);
        };
        return RegisterPanel;
    })(GameUtil.BassPanel);
    PlantGame.RegisterPanel = RegisterPanel;
    RegisterPanel.prototype.__class__ = "PlantGame.RegisterPanel";
})(PlantGame || (PlantGame = {}));