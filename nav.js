/*2017年11月25日*/

/*step1*/
/*可优化点：
1.想要选择子导航上的选项，鼠标移动时不能触碰到主导航的其他tab。只能折线移动。这是很多网站没有优化的地方——>为子导航显示设置阶段计时器，触发事件时若鼠标在子导航内，则继续执行，若不在子导航内，则不执行

2.快速移动时子导航也会快速切换*/
/*$(function() {
	var sub = $(".sub");
	sub.addClass('none');
	$(".sub-content").addClass("none");

	var subNav;
	var mainNav;
	$("#test").on("mouseenter", function() {
		sub.removeClass("none")

	}).on("mouseleave", function() {
		sub.addClass('none');
	});
	$("#test").on("mouseenter", 'li', function() {
		$(".sub-content").addClass("none");
		$(this).addClass('active');
		id = $(this).attr("id");
		subNav = $("#sub-" + id);
		subNav.removeClass("none");

	}).on("mouseleave", "li", function() {
		$(this).removeClass('active');
	});
	sub.on('mouseenter', function() {
		$(this).removeClass('none');

	}).on('mouseleave', function() {
		$(this).addClass("none");
	})
});


*/


/*step2*/
/*
1.想要选择子导航上的选项，鼠标移动时不能触碰到主导航的其他tab。只能折线移动。这是很多网站没有优化的地方——>为子导航显示设置阶段计时器，触发事件时若鼠标在子导航内，则继续执行，若不在子导航内，则不执行

2.快速移动时子导航也会快速切换——>去抖，计时器代码段还未执行完就触发了二次事件时，立即清空计时器。即只执行最后一次代码段

新问题：
1.切换主菜单延迟问题
*/
/*$(function() {
	var sub = $(".sub");
	sub.addClass('none');
	$(".sub-content").addClass("none");

	var subNav;
	var mainNav;
	var mouseInSub = false; //判断鼠标是否在子导航内
	var time; //计时器
	$("#test").on("mouseenter", function() {
		sub.removeClass("none")

	}).on("mouseleave", function() {
		sub.addClass('none');
	});
	sub.on('mouseenter', function() {
		mouseInSub = true;
		$(this).removeClass('none');

	}).on('mouseleave', function() {
		mouseInSub = false;
		$(this).addClass("none");
	});



	$("#test").on("mouseenter", 'li', function() {

		var li = $(this);
		if (time) {
			clearTimeout(time);
		}

		time = setTimeout(function() {
			if (mouseInSub) {
				return;
			}
			$(".sub-content").addClass("none");
			id = li.attr("id");
			subNav = $("#sub-" + id);
			subNav.removeClass("none");
			setTimeout(function() {
				li.on("mouseleave", function() {
					let li = $(this);
					li.removeClass('active');
				})
			});
			time = null
		}, 500);
	});


});*/



/*step3*/
/*
1.切换主菜单延迟问题————>用户行为预判，向量积。如果鼠标移动范围在三角形内，则用户极大可能是想要浏览子菜单，若不在范围内，则不需要使用延迟
*/

var mouseTrack = [];
var moveHanlder = function(e) {
	var x = e.pageX;
	var y = e.pageY;
	//console.log(e.pageX,e.pageY);
	if(mouseTrack.length==0){
		mouseTrack.push({
			/*放入起始点*/
			x: x,
			y: y
		});
	}
	if (x != mouseTrack[mouseTrack.length - 1].x && y != mouseTrack[mouseTrack.length - 1].y){
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
$(function() {
	var sub = $(".sub");
	sub.addClass('none');
	$(".sub-content").addClass("none");

	var subNav;
	var mainNav;
	var mouseInSub = false; //判断鼠标是否在子导航内
	var time1; //计时器
	var time2; //计时器
	sub.on('mouseenter', function() {
		mouseInSub = true;
		$(this).removeClass('none');

	}).on('mouseleave', function() {
		mouseInSub = false;
		$(this).addClass("none");
	});
	$("#test").on("mouseenter", function() {
		$(document).on('mousemove', moveHanlder) //绑定事件
		sub.removeClass("none")

	}).on("mouseleave", function() {
		sub.addClass('none');

	}).on("mouseenter", 'li', function() {
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

		if (delay) {
			console.log('needDelay!');
			time1 = setTimeout(function() {
				if (mouseInSub) {
					return;
				}
				$(".sub-content").addClass("none");
				subNav.removeClass("none");
				setTimeout(function() {
					li.on("mouseleave", function() {
						let li = $(this);
						li.removeClass('active');
					})
				});
				time1 = null
			}, 500);
		} else {
			time2 = setTimeout(function () {
			console.log("don't needDelay!");
			$(".sub-content").addClass("none");
			subNav.removeClass("none");
			setTimeout(function() {
				li.on("mouseleave", function() {
					let li = $(this);
					li.removeClass('active');
				})
			});
			time2 = null
			});
		} 
	}).on("mouseleave", 'li', function() {
		$(document).off('mousemove', $(this), moveHanlder) //解绑事件
	});
});