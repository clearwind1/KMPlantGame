/**
 * 获取网络图片
 * Created by pior on 15/11/13.
 */
var GameUtil;
(function (GameUtil) {
    var GetImageByUrl = (function (_super) {
        __extends(GetImageByUrl, _super);
        function GetImageByUrl(url) {
            _super.call(this);
            this.imgUrl = url;
            this.init();
        }
        var __egretProto__ = GetImageByUrl.prototype;
        __egretProto__.init = function () {
            RES.getResByUrl(this.imgUrl, this.comp, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.comp = function (data) {
            this.imag = new egret.Bitmap();
            this.imag.texture = data;
            this.imag.anchorX = this.imag.anchorY = 0.5;
            this.addChild(this.imag);
        };
        __egretProto__.getimg = function () {
            return this.imag;
        };
        return GetImageByUrl;
    })(egret.DisplayObjectContainer);
    GameUtil.GetImageByUrl = GetImageByUrl;
    GetImageByUrl.prototype.__class__ = "GameUtil.GetImageByUrl";
})(GameUtil || (GameUtil = {}));
