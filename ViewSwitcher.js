/**
 * Created by zhaojinghao on 14-9-24.
 */

//内容轮播器
(function(window) {

    var ViewSwitcher = (function() {

        //view模版
        var tpl = document.getElementById("tpl_table").innerHTML;

        //相对屏幕居中显示
        function makeCenter(id) {
            document.getElementById(id).style.display = "block";
            $('#' + id).css("top", Math.max(0, (($(window).height() - $('#' + id).outerHeight()) / 2) + $(window).scrollTop()) + "px");
            $('#' + id).css("left", Math.max(0, (($(window).width() - $('#' + id).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        }

        //相对父元素居中
        function makeCenterInParent(id) {
            document.getElementById(id).style.display = "block";
            var obj = $("#" + id);
            var parent = obj.parent();
            var parentWidth = parent.width();
            var parentHeight = parent.height();
            var selfWidth = obj.width();
            var selfHeight = obj.height();
            var left = (parentWidth - selfWidth) / 2;
            var top = (parentHeight - selfHeight) / 2;
            $('#' + id).css("top", top + "px");
            $('#' + id).css("left", left + "px");
        }

        var ViewSwitcher = function() {
            //属性定义
            this.curIndex = 0;
            this.pids = [];
            this.viewOneId = "";
            this.viewTwoId = "";

            this.cbCollection = []; //额外属性，用来控制所选checkbox的状态

            //事件定义
            this.beforeViewChange = null; //轮换view前调用，需要自己实现
            this.afterViewChange = null; //轮换view后调用，需要自己实现
            this.beforeFinish = null;    //轮换结束时调用，需要自己实现
        };

        ViewSwitcher.prototype = {
            //初始化轮播器
            init: function() {

                var view1 = document.getElementById(this.viewOneId);
                var view2 = document.getElementById(this.viewTwoId);
                view1.innerHTML = "";
                view2.innerHTML = "";
                view1.style.left = "0px";
                view2.style.left = "600px";

                if (this.pids.length == 0) {
                    this.onFinish();
                    return false;
                }

                var switchObj = this;

                this.curIndex = 0;
                var pid = this.pids[this.curIndex];

                this.getDataForView(this.viewOneId, makeCenter, "carousel");
            },
            //轮换view
            switchView: function() {

                this.curIndex++;

                if (this.curIndex >= this.pids.length || this.curIndex < 0) {

                    this.onFinish();

                    return false;
                }

                //调用切换view开始事件
                this.onViewSwitching();

                var switchObj = this;

                var viewOne = $("#" + this.viewOneId);
                var viewTwo = $("#" + this.viewTwoId);

                var btn = $("#confirmCheckBtn");

                btn.attr("disabled", "disabled");

                var viewId = parseInt(this.curIndex) % 2 == 0 ? this.viewOneId : this.viewTwoId;

                this.getDataForView(viewId, function() {
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

                    //调用切换view结束事件
                    switchObj.onViewSwitched();

                });

            },
            //切换view开始事件
            onViewSwitching: function() {
                if (typeof (this.beforeViewChange) === 'function') {
                    try {
                        this.afterViewChange();
                    }
                    catch (e) {

                    }
                }
            },
            //切换view结束事件
            onViewSwitched: function() {
                if (typeof (this.afterViewChange) === 'function') {
                    try {
                        this.afterViewChange();
                    }
                    catch (e) {

                    }
                }
            },
            //轮播结束处理事件
            onFinish: function() {

                if (typeof (this.beforeFinish) === 'function') {

                    try {
                        this.beforeFinish();
                    }
                    catch (e) {

                    }

                }

                this.resetStatus();

            },
            resetStatus: function() {
                //重置轮播器状态
                this.curIndex = -1;
                this.pids = [];
                var view1 = document.getElementById(this.viewOneId);
                var view2 = document.getElementById(this.viewTwoId);
                view1.innerHTML = "";
                view2.innerHTML = "";
                view1.style.left = "0px";
                view2.style.left = "600px";

                document.getElementById("carousel").style.display = "none";
            },
            /*
            给指定的view填充数据
            可以将数据获取部分定义出来供调用者自己实现，同时定义好返回数据的格式，
            这样既能够达到获取数据方式的多样化，还可以保证以定义好的格式返回数据，不过这样需要在该类中添加一个格式验证方法
            日后再优化吧
            */
            getDataForView: function(viewId, callback, param) {

                var switchObj = this;
                var pid = this.pids[this.curIndex];

                $.ajax({
                    type: "POST",
                    url: "UploadHandler.ashx",
                    data: {
                        uncheckpid: pid,
                        action: "GetConfirmInfo"
                    },
                    dataType: "json",
                    success: function(result) {

                        //switchObj.curIndex++;
                        console.debug("getDataForView success:" + switchObj.curIndex);

                        if (result.status == "success") {
                            var html = Mustache.render(tpl, result.data);
                            document.getElementById(viewId).innerHTML = html;
                            callback(param);
                        }
                        else {
                            alert(result.message);
                        }

                    },
                    beforeSend: function() {
                        console.debug("beforeSend");
                        makeCenterInParent("ajax-loader");
                    },
                    complete: function() {
                        console.debug("complete");
                        $("#ajax-loader").hide();

                    },
                    error: function() {

                    }
                });
            }
        };

        return function() {
            return new ViewSwitcher();
        };

    })();

    window.ViewSwitcher = ViewSwitcher;

})(window, undefined);
