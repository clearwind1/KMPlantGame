/**
 * 获取网络图片
 * Created by pior on 15/11/13.
 */

module GameUtil
{
    export class GetImageByUrl extends egret.DisplayObjectContainer
    {
        private imgUrl:string;
        private imag: egret.Bitmap;

        public constructor(url:string)
        {
            super();
            this.imgUrl = url;
            this.init();
        }

        private init():void
        {
            RES.getResByUrl(this.imgUrl,this.comp,this,RES.ResourceItem.TYPE_IMAGE);
        }
        private comp(data:any):void
        {
            this.imag = new egret.Bitmap();
            this.imag.texture = <egret.Texture>data;
            this.imag.anchorX = this.imag.anchorY = 0.5;
            this.addChild(this.imag);
        }

        public getimg():egret.Bitmap
        {
            return this.imag;
        }
    }
}