/*step3*/
/*
1.切换主菜单延迟问题————>用户行为预判，向量积。如果鼠标移动范围在三角形内，则用户极大可能是想要浏览子菜单，若不在范围内，则不需要使用延迟
*/

var mouseTrack = [];
var moveHanlder = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    //console.log(e.pageX,e.pageY);
    if (mouseTrack.length == 0) {
        mouseTrack.push({
            /*放入起始点*/
            x: x,
            y: y
        });
    }
    if (x != mouseTrack[mouseTrack.length - 1].x && y != mouseTrack[mouseTrack.length - 1].y) {
        mouseTrack.push({
            /*把当前坐标放入这个数组*/
            x: x,
            y: y
        });
    }
    if (mouseTrack.length > 3) {
        //取鼠标经过的2个点即可
        mouseTrack.shift(); //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。如果为空，则返回undefined
    };
    //console.log(mouseTrack);

}
$(function () {
    var sub = $(".sub");
    sub.addClass('none');
    $(".sub-content").addClass("none");

    var subNav;
    var mainNav;
    var mouseInSub = false; //判断鼠标是否在子导航内
    var time1; //计时器
    var time2; //计时器
    sub.on('mouseenter', function () {
        mouseInSub = true;
        $(this).removeClass('none');

    }).on('mouseleave', function () {
        mouseInSub = false;
        $(this).addClass("none");
    });
    $("#test").on("mouseenter", function () {
        $(document).on('mousemove', moveHanlder) //绑定事件
        sub.removeClass("none")

    }).on("mouseleave", function () {
        sub.addClass('none');

    }).on("mouseenter", 'li', function () {
        var li = $(this);
        if (time1) {
            clearTimeout(time1);
        }
        if (time2) {
            clearTimeout(time2);
        }
        id = li.attr("id");
        subNav = $("#sub-" + id);
        var currMousePos = mouseTrack[mouseTrack.length - 1]; //鼠标当前位置
        var leftCorner = mouseTrack[0]; //鼠标上次停留的位置

        /*判断是否需要延时*/
        var delay = needDelay(subNav, leftCorner, currMousePos);
        var text = document.getElementById("text")
        if (delay) {
            text.innerHTML = "needDelay";
            console.log('needDelay!');
            time1 = setTimeout(function () {
                if (mouseInSub) {
                    return;
                }
                $(".sub-content").addClass("none");
                subNav.removeClass("none");
                setTimeout(function () {
                    li.on("mouseleave", function () {
                        let li = $(this);
                        li.removeClass('active');
                    })
                });
                time1 = null
            }, 500);
        } else {
            time2 = setTimeout(function () {
                
                text.innerHTML = "don't needDelay!";
                $(".sub-content").addClass("none");
                subNav.removeClass("none");
                setTimeout(function () {
                    li.on("mouseleave", function () {
                        let li = $(this);
                        li.removeClass('active');
                    })
                });
                time2 = null
            });
        }
    }).on("mouseleave", 'li', function () {
        $(document).off('mousemove', $(this), moveHanlder) //解绑事件
    });
});