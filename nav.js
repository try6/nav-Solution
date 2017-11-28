/*2017年11月25日*/

/*step1*/
/*可优化点：
1.想要选择子导航上的选项，鼠标移动时不能触碰到主导航的其他tab。只能折线移动。这是很多网站没有优化的地方——>为子导航显示设置阶段计时器，触发事件时若鼠标在子导航内，则继续执行，若不在子导航内，则不执行

2.快速移动时子导航也会快速切换*/
$(function() {
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





