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
        var ViewManager = function(){

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
            //轮播速度
            speed : 1000,
            //轮播方向
            direction : "horizontal",
            //view容器的宽度
            width:0,
            //view容器的高度
            height:0,
            //
            datas:[],
            //视图数组
            views:[],
            //是否循环轮播
            isCircle:false,
            //是否自动轮播，一般用于轮播静态内容
            isAuto:false,
            curIndex:-1,
            domElement:"",
            beforeViewSwitch:null,
            afterViewSwitch:null,
            beforeFinish:null,
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
                //
                this.datas = [];
                //视图数组
                this.views = [];
                //是否循环轮播
                this.isCircle = false;
                //是否自动轮播，如果是动态获取视图数据，建议禁用该项
                this.isAuto = false;
                this.curIndex = -1;
                this.domElement = null;
                this.beforeViewSwitch = null;
                this.this.afterViewSwitch = null;
                this.beforeFinish = null;
                this.disabled = true;

                if(options.id&&(typeof options.id === "string")){
                    this.domElement = document.getElementById(options.id);
                    var obj = $(this.domElement);
                    this.width = obj.width();
                    this.height = obj.height();
                }


            },
            /**
             * 启动轮播器
             */
            startup:function(){

            },
            /**
             * 切换view
             */
            switch:function(){
                this.onSwitching();

                this.onSwitched();
            },
            onSwitching:function(){
                if (typeof (this.beforeViewChange) === 'function') {
                    try {
                        this.beforeViewChange();
                    }
                    catch (e) {

                    }
                }
            },
            onSwitched:function(){
                if (typeof (this.afterViewChange) === 'function') {
                    try {
                        this.afterViewChange();
                    }
                    catch (e) {

                    }
                }
            },
            onFinish:function(){
                if (typeof (this.beforeFinish) === 'function') {
                    try {
                        this.beforeFinish();
                    }
                    catch (e) {

                    }
                }
            },
            getViewData:function(){

            }

        };

        //覆盖init的原型对象
        ViewSwitcher.fn.init.prototype = ViewSwitcher.fn;

        return ViewSwitcher;
    })();

    window.ViewSwitcher = ViewSwitcher;

})(window);