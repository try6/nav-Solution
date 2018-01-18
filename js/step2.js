/*step2*/
/*
1.想要选择子导航上的选项，鼠标移动时不能触碰到主导航的其他tab。只能折线移动。这是很多网站没有优化的地方——>为子导航显示设置阶段计时器，触发事件时若鼠标在子导航内，则继续执行，若不在子导航内，则不执行

2.快速移动时子导航也会快速切换——>去抖，计时器代码段还未执行完就触发了二次事件时，立即清空计时器。即只执行最后一次代码段

*/
$(function() {
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


});
/*
新问题：
1.切换主菜单延迟问题 
*/