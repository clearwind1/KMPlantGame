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
            var cover = GameUtil.createRect(0, 0, 480, 800, 0.6);
            this.addChild(cover);
            //背景框
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
                if (i == 1) {
                    this.radiobtn = new GameUtil.RadioButton("rabtnu_png", "rabtn_png");
                    this.addChild(this.radiobtn);
                    var ratext = GameUtil.createTextField(0, 0, 20);
                    ratext.text = "男";
                    ratext.textColor = 0x000000;
                    this.radiobtn.addItem(ratext, 168, 325 + 50 * i);
                    var ratext2 = GameUtil.createTextField(0, 0, 20);
                    ratext2.text = "女";
                    ratext2.textColor = 0x000000;
                    this.radiobtn.addItem(ratext2, 162 + 100, 325 + 50 * i);
                }
                else {
                    if (i != 3) {
                        var inputframe = GameUtil.createBitmapByName("registerFrame_png");
                        inputframe.x = 270;
                        inputframe.y = 325 + 50 * i;
                        this.addChild(inputframe);
                        this.textinput[i] = GameUtil.createInputText(162, 315 + 50 * i, 20, 240, 20, maxchar[i]);
                        this.addChild(this.textinput[i]);
                    }
                }
            }
            //省
            var sheninput = GameUtil.createBitmapByName("registerFrame_png");
            sheninput.anchorX = 0;
            sheninput.scaleX = 0.5;
            sheninput.x = 149;
            sheninput.y = 325 + 50 * 3;
            this.addChild(sheninput);
            var shentext = GameUtil.createTextField(260, 325 + 50 * 3, 20);
            shentext.text = "省";
            this.addChild(shentext);
            this.textinput[3] = GameUtil.createInputText(162, 315 + 50 * 3, 20, 90, 20, 5);
            this.addChild(this.textinput[3]);
            //市
            var shiinput = GameUtil.createBitmapByName("registerFrame_png");
            shiinput.anchorX = 0;
            shiinput.scaleX = 0.5;
            shiinput.x = 270;
            shiinput.y = 325 + 50 * 3;
            this.addChild(shiinput);
            var shitext = GameUtil.createTextField(380, 325 + 50 * 3, 20);
            shitext.text = "市";
            this.addChild(shitext);
            this.textinput[4] = GameUtil.createInputText(283, 315 + 50 * 3, 20, 90, 20, 5);
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
            sureBtn.setScaleMode();
            sureBtn.x = 240;
            sureBtn.y = 610;
            this.addChild(sureBtn);
            var textip = GameUtil.createTextField(20, 670, 20, 0, 0.5, egret.HorizontalAlign.LEFT);
            textip.text = "请认真填写你的资料,该资料与你获奖所得相关,如果因资料问题拿不到应有奖励,本公司概不负责";
            textip.width = 440;
            textip.textColor = 0xff0000;
            textip.bold = true;
            this.addChild(textip);
        };
        __egretProto__.sureRegister = function () {
            var tip;
            if (this.textinput[0].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "姓名不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[2].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "手机号不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[3].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "省份不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (this.textinput[4].text == "") {
                tip = new GameUtil.TipsPanel("alertBg_png", "城市不能为空", true, 1500);
                this.addChild(tip);
                return;
            }
            if (!GameUtil.isPhoneNum(this.textinput[2].text)) {
                tip = new GameUtil.TipsPanel("alertBg_png", "不是正确的手机号", true, 1500);
                this.addChild(tip);
                return;
            }
            var len = this.textinput[4].text.length - 1;
            if (this.textinput[4].text[len] != "市") {
                this.textinput[4].text += "市";
            }
            this.upLoadData();
        };
        /**
         * 提交注册内容
         */
        __egretProto__.upLoadData = function () {
            var ipstr = window['getIP'];
            console.log("ip=====", ipstr);
            var parm = {
                openid: PlantGame.GameData.getInstance().playerOpenID,
                username: PlantGame.GameData.getInstance().playerNickname,
                headimgurl: PlantGame.GameData.getInstance().playerImgUrl,
                realname: this.textinput[0].text,
                sex: this.radiobtn.getCurSelectTag() + 1,
                phone: this.textinput[2].text,
                address: this.textinput[4].text,
                ip: ipstr.substring(1)
            };
            GameUtil.Http.getinstance().send(parm, "/api/reg.ashx", this.registerOK, this);
        };
        __egretProto__.registerOK = function (data) {
            console.log("data=========", data);
            if (data['code'] == 1) {
                PlantGame.GameData.getInstance().setData(data);
                GameUtil.GameScene.runscene(new PlantGame.MainGameScene(), GameUtil.GameConfig.TransAlpha);
            }
            else {
                var tip = new GameUtil.TipsPanel("alertBg_png", data['msg']);
                this.addChild(tip);
            }
        };
        return RegisterPanel;
    })(GameUtil.BassPanel);
    PlantGame.RegisterPanel = RegisterPanel;
    RegisterPanel.prototype.__class__ = "PlantGame.RegisterPanel";
})(PlantGame || (PlantGame = {}));
