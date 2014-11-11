/**
 * Created by Administrator on 14-11-6.
 */
(function(window,undefined){

    /**
     * 定义视图
     */
    var View = (function(){

        function prepareView(){

        }

        /*------ 预定义轮播动画 ---------*/
        function move(direction,views){
            var viewToShow = view.Views
            viewOne.animate({ "left": "-=600px" }, 500, function() {

                if (parseInt(viewOne.css("left")) < 0) {
                    viewOne.hide();
                    viewOne.animate({ "left": "600px" }, 10);
                    viewOne.show();
                    btn.removeAttr("disabled");
                }
            });
            viewTwo.animate({ "left": "-=600px" }, 500, function() {
                if (parseInt(viewTwo.css("left")) < 0) {
                    viewTwo.hide();
                    viewTwo.animate({ "left": "600px" }, 10);
                    viewTwo.show();
                    btn.removeAttr("disabled");
                }
            });
        }

        var View = function(){
            this.curPosition = ""; //curPosition:"top","right","bottom","left","center"
            this.direction = "";
            this.originalWidth = 0;
            this.originalHeight = 0;
            this.visible = false;
            this.domElement = "";
            this.animates = [];   //存放view可以执行的动画
        }

        View.prototype = {
            show:function(){

            },
            hidden:function(){

            }
        };
        return View;
    })();

    /**
     * 视图管理器
     */
    var ViewManager = (function(){
        var animates = {
            //移动
            move:function(direction){

            },
            //
            slide:function(){

            },
            fade:function(){

            }
        };

        var ViewManager = function(){
            this.Views = [];    //view数组
            this.animates = {}; //动画执行函数集合
            this.actions = [];  //动画指令
            this.viewContainer = { //视图容器的相关属性
                width:0,
                height:0
            };
        };

        ViewManager.prototype = {
            self:this,
            //动画定义
            animateOptions:{
                //params in ["left","right","top","bottom"]
                move:function(params){ //平移

                },
                //params in ["in","out"]
                fade:function(params){ //淡入淡出

                }
            }
        };

        return ViewManager;
    })();

    /**
     * 轮播器
     */
    var ViewSwitcher = (function(options){

        var ViewSwitcher = function(options){
            return new ViewSwitcher.fn.init();
        };

        ViewSwitcher.fn = ViewSwitcher.prototype = {

            //构造函数
            init : function(options){
                //视图数组
                this.views = [];
                this.status = "";
                this.domElement = "";//(typeof options.id==='string'&&options.wrapid.length>0)?document.getElementById(options.id):document.getElementById("viewSwitcherWrap");

                /*-- 定义相关事件 --*/
                this.beforeViewSwitch = null;
                this.afterViewSwitch = null;
                this.beforeFinish = null;
                this.fillViewData = null;

                //状态
                this.disabled = true;

                //动画
                this.viewAnimate = null;

                if(options.id&&(typeof options.id === "string")){
                    this.domElement = document.getElementById(options.id);
                    var obj = $(this.domElement);
                    this.width = obj.width();
                    this.height = obj.height();
                }


            },
            /**
             * 启动轮播器，显示第一个view
             */
            startup:function(){

            },
            /**
             * 切换view
             */
            switch:function(){
                //是否禁用轮播
                if(this.disabled){
                    return;
                }else{
                    this.disabled = true; //防止频繁点击
                }

                this.onSwitching();

            },
            onSwitching:function(){
                var self = this;
                if (typeof (this.beforeViewSwitch) === 'function') {
                    try {
                        this.beforeViewSwitch(function(){
                            self.onDataBinding();
                        });
                    }
                    catch (e) {

                    }
                }
                else{
                    this.onDataBinding();
                }

            },
            onSwitched:function(){
                var self = this;
                if (typeof (this.afterViewSwitch) === 'function') {
                    try {
                        this.afterViewSwitch(function(){
                            self.disabled = false;
                        });
                    }
                    catch (e) {

                    }
                }
                else{
                    self.disabled = false;
                }
            },
            onClose:function(){
                if (typeof (this.beforeFinish) === 'function') {
                    try {
                        this.beforeFinish(function(){
                            self.domElement.style.display = "none";
                        });
                    }
                    catch (e) {

                    }
                }
            },
            //填充数据
            onDataBinding:function(){
                var self = this;

                var view = getBackgroundView(this.views);

                if(typeof (this.fillViewData) === 'function'){
                    this.fillViewData(function(){

                        //判断是否有数据，如果没有需要关闭轮播器
                        if(self.status == "close"){
                            self.onClose();
                            return;
                        }

                        //TODO 调用轮播动画，需使用者自己实现
                        if(typeof (this.viewAnimate) === 'function'){
                            self.viewAnimate(function(){
                                self.onSwitched();
                            });
                        }

                    });
                }


            },

            /**
             * 获取不可见view
             * @param views
             * @returns {*}
             */
            getBackgroundView:function(){
            var count = views.length;
            var result;
            for(var i =0 ;i <count;i++){
                if(views[i].visible == false){
                    result = views[i];
                }
            }
            return result;
        }

        };



        //覆盖init的原型对象
        ViewSwitcher.fn.init.prototype = ViewSwitcher.fn;

        return ViewSwitcher;
    })();

    window.ViewSwitcher = ViewSwitcher;

})(window);