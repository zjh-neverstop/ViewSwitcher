/**
 * Created by Administrator on 14-11-6.
 */
(function(window,undefined){

    //ViewSwitcher全局变量区域

    var animata = function(direction){

    };

    var View = (function(){



        var view = function(){
            this.curPosition = ""; //curPosition:"top","right","bottom","left","center"
            this.direction = "";
            this.visible = false;

        }

        view.prototype = {
            show:function(){

            },
            hidden:function(){

            }
        };
        return view;
    })();


    var ViewSwitcher = (function(){

        var ViewSwitcher = function(){
            return new ViewSwitcher.fn.init();
        };

        ViewSwitcher.fn = ViewSwitcher.prototype = {
            //轮播速度
            speed : 1000,
            //轮播方向
            direction : "left",
            //
            width:0,
            //
            height:0,
            datas:[],
            views:[],
            //构造函数
            init : function(options){
                this.speed = options.speed||1000;
                this.direction = options.direction||"left";
                this.datas = options.datas||[];
            }
        };

        //覆盖init的原型对象
        ViewSwitcher.fn.init.prototype = ViewSwitcher.fn;

        return ViewSwitcher;
    })();

    window.ViewSwitcher = ViewSwitcher;

})(window);