//原理

//鼠标当前点坐标p、鼠标上一次的坐标a、子导航左上b、左下c，四个点。
//判断鼠标当前坐标是否位于由a,b,c构成的三角形内，如果位于三角形内，则进行导航延时，否则不进行延时

//判断点P是否位于三角形内，使用向量叉乘的方法，PA向量*PB向量，PB向量*PC向量，判断这两个向量的数量积正负是否一致，如果一致，p点在三角形abc内

//向量积:数学中又称外积、叉积，物理中称矢积、叉乘，是一种在向量空间中向量的二元运算。与点积不同，它的运算结果是一个向量而不是一个标量。并且两个向量的叉积与这两个向量和垂直


//位运算，判断两个数符号是否相同
function sameSign(a, b) {
	//二进制正负表示在最高位，使用'^'运算,有一个为1则返回true
	return (a ^ b) >= 0
}
//向量计算函数
function vector(a, b) {
	//传入两个点，返回这两个点构成的向量
	if(a && b){
		return {
			x: b.x - a.x,
			y: b.y - a.y
		}
	}
}
/*向量叉乘公式*/
function vectorProduct(v1, v2) {
	//
	return v1.x * v2.y - v2.x * v1.y;
}


//叉乘判断方法
function isPointInTrangle(p, a, b, c) {
	/*传入三个向量*/
	var pa = vector(p, a);
	var pb = vector(p, b);
	var pc = vector(p, c);
	//将三个向量叉乘
	var t1 = vectorProduct(pa, pb);
	var t2 = vectorProduct(pa, pc);
	var t3 = vectorProduct(pb, pc);

	//判断叉乘结果正负
	//console.log(t1,t2,t3);
	return sameSign(t1, t2) && sameSign(t2, t3);
}


//判断菜单是否需要延时
function needDelay(elem, leftCorner, currMousePos) {
	var offset = elem.offset();
	var topLeft = {
		x: offset.left+$(".nav ul").width()+50,
		y: offset.top+100
	}
	var bottonLeft = {
		x: topLeft.x,
		y: topLeft.y + elem.height()
	}
	//console.log(currMousePos, leftCorner);
	return isPointInTrangle(currMousePos, leftCorner, topLeft, bottonLeft);

}