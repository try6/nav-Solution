/*$(document).ready(function() {
	var sub = $('.sub').addClass('none');
	var subContent = $('.sub-contant').addClass('none');
	var navAvtive;
	var subActive;


	if (navAvtive) {
		navAvtive.removeClass('active');
		navAvtive = null;
	}
	if (subActive) {
		subActive.addClass('none');
		subActive = null;
	}
	var time;
	var mouseInsub = false;
	//定义鼠标是否在子菜单内
	sub.on('mouseeter', function() {
		mouseInsub = true;
	}).on('mouseleave', function() {
		mouseInsub = false;
	});
	$('#test')
		.on('mouseenter', function() {
			e.stopPropagation();
			sub.removeClass('none');
		})
		.on('mouseleave', function(e) {
			e.stopPropagation();
			sub.addClass('none');
			if (navAvtive) {
				navAvtive.removeClass('active');
				navAvtive = null;
			}
			if (subActive) {
				subActive.addClass('none');
				subActive = null;
			}
		})
		.on('mouseenter', 'li', function(e) {
			e.stopPropagation();
			time = setTimeout(function() {
				if (mouseInsub) {
					//如果鼠标在子菜单内，不执行切换
					return;
				}


				navAvtive = $(e.target);
				navAvtive.addClass('active');
				subActive = $('#sub-' + navAvtive.data('id'));
				subActive.removeClass('none');
				time = null;
			}, 300)


		}).on('mouseleave', 'li', function(e) {
			e.stopPropagation();
			navAvtive = $(e.target);
			navAvtive.removeClass('active');
			subActive = $('#sub-' + navAvtive.data('id'));
			subActive.addClass('none');
		});
})*/

var mouseTrack = [];
var moveHanlder = function(e) {
	//把事件监听函数独立出来，方便后续进行解绑操作，从而不影响其他组件
	mouseTrack.push({
		/*把当前坐标放入这个数组*/
		x: e.pageX,
		y: e.pageY
	});
	if (mouseTrack.length > 3) {
		//取鼠标经过的两个点即可
		mouseTrack.shift(); //shift() 把数组的第一个元素从其中删除，并返回第一个元素的值。如果为空，则返回undefined
	};
	//console.log(mouseTrack)

}
$(document).ready(function() {
	var sub = $('.sub').addClass('none');
	var subContent = $('.sub-content').addClass('none');
	var navAvtive;
	var subActive;

	/*moveHanlder
	alert(mouseTrack.length)
*/

	var time;
	var mouseInsub = false;
	//定义鼠标是否在子菜单内

	sub.on('mouseenter', function() {
		mouseInsub = true;
		$(this).removeClass('none');

	}).on('mouseleave', function() {
		$(this).addClass("none");
		mouseInsub = false;
	});

	$('#test')
		.on('mouseenter', function() {
			sub.removeClass('none');
			$(document).bind('mousemove', moveHanlder) //绑定事件
		})
		.on('mouseleave', function(e) {
			sub.addClass('none');
			if (navAvtive) {
				navAvtive.removeClass('active');
				navAvtive = null;
			}
			if (subActive) {
				subActive.addClass('none');
				subActive = null;
			}
			$(document).unbind('mousemove', moveHanlder) //解绑事件
		})
		.on('mouseenter', 'li', function(e) {
			if (!navAvtive) {
				navAvtive = $(e.target).addClass('active');
				subActive = $('#sub-' + navAvtive.attr('id'));
				subActive.removeClass('none');
				return;
			}
			//debounce去抖技术，当事件被频繁触发时，只执行一次，一般是最后一次
			//事件触发的时候，如果计时器并没有执行，就把计时器清除
			//保证当事件触发停止的时候，还没有执行到time=null，那么之前的操作全部被忽略
			if (time) {
				clearTimeout(time);
			}

			var currMousePos = mouseTrack[mouseTrack.length - 1]; //鼠标当前位置
			var leftCorner = mouseTrack[mouseTrack.length - 2]; //鼠标上次停留的位置

			/*判断是否需要延时*/
			//var needDelay = needDelay(sub, leftCorner, currMousePos);
			//if (needDelay) {
			time = setTimeout(function() {
					if (mouseInsub) {
						//如果鼠标在子菜单内，不执行切换
						return;
					}
					//移除上一次的操作
					$(".nav li").removeClass('active');
					$(".sub-content").addClass('none');
					navAvtive = $(e.target);
					subActive = $('#sub-' + navAvtive.attr('id'));

					navAvtive.addClass('active');
					subActive.removeClass('none');
					time = null;
				}, 300)
				/*	} else {

						var navAvtive_new = navAvtive;
						var subAvtive_new = subActive;
						navAvtive.removeClass('active');
						subActive.addClass('none');

						navAvtive_new = $(e.target);
						navAvtive_new.addClass('active');
						subAvtive_new = $('#sub-' + navAvtive_new.attr('id'));
						subAvtive_new.removeClass('none');
					}*/



		})
})