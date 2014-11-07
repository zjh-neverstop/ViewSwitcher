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

        //在动画开始之前，将view放到合适的位置
        var setup =  function(){

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

        };

        return ViewManager;
    })();

    /**
     * 轮播器
     */
    var ViewSwitcher = (function(){

        var ViewSwitcher = function(){
            return new ViewSwitcher.fn.init();
        };

        ViewSwitcher.fn = ViewSwitcher.prototype = {

            //构造函数
            init : function(options){
                //轮播速度
                this.speed = options.speed||1000;
                //轮播方向
                this.direction = options.direction||"horizontal";
                this.datas = options.datas||[];
                //view容器的宽度
                this.width = 0;
                //view容器的高度
                this.height = 0;
                //静态数据
                this.staticDatas = [];
                //视图数组
                this.views = [];
                //是否循环轮播
                this.isCircle = false;
                //是否自动轮播，如果是动态获取视图数据，建议禁用该项
                this.isAuto = false;
                //是否动态获取数据
                this.useDynamicData = false;
                this.curIndex = -1;
                this.domElement = null;
                this.beforeViewSwitch = null;
                this.afterViewSwitch = null;
                this.beforeFinish = null;
                this.getViewData = null;
                this.disabled = true;

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
                this.curIndex = 0;

            },
            /**
             * 切换view
             */
            switch:function(){
                //是否禁用轮播
                if(this.disabled){
                    return;
                }

                this.onSwitching();

            },
            onSwitching:function(){
                var self = this;
                if (typeof (this.beforeViewSwitch) === 'function') {
                    try {
                        this.beforeViewSwitch(function(){
                            //关闭轮播器
                            if(self.useDynamicData == true && (self.curIndex==(self.staticDatas.length-1))&&self.isCircle==false){
                                self.onClose();
                            }
                            self.fillViewData();
                        });
                    }
                    catch (e) {

                    }
                }else if(this.beforeViewSwitch == null){
                    this.fillViewData();
                }
            },
            onSwitched:function(){
                if (typeof (this.afterViewSwitch) === 'function') {
                    try {
                        this.afterViewSwitch();
                    }
                    catch (e) {

                    }
                }
            },
            onClose:function(){
                if (typeof (this.beforeFinish) === 'function') {
                    try {
                        this.beforeFinish();
                    }
                    catch (e) {

                    }
                }
            },
            //填充数据
            fillViewData:function(){
                var self = this;
                if(this.useDynamicData == true && (this.curIndex!=(this.staticDatas.length-1))){
                    this.onViewSwitched();
                }

                var view = getBackgroundView(this.views);
                if(this.useDynamicData == false){
                    view.innerHTML = this.staticDatas[++this.curIndex];
                }
                else if(typeof (this.getViewData) === 'function'){
                    this.getViewData(function(data){
                        view.innerHTML = data;
                        //TODO 调用轮播动画
                        self.onSwitched();
                    });
                }
            }

        };

        /**
         * 获取不可见view
         * @param views
         * @returns {*}
         */
        function getBackgroundView(views){
            var count = views.length;
            var result;
            for(var i =0 ;i <count;i++){
                if(views[i].visible == false){
                    result = views[i];
                }
            }
            return result;
        }

        //覆盖init的原型对象
        ViewSwitcher.fn.init.prototype = ViewSwitcher.fn;

        return ViewSwitcher;
    })();

    window.ViewSwitcher = ViewSwitcher;

})(window);