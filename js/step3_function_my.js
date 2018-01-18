function vector(a,b){
    //传入两个点，生成这两个点构成的向量
    return {
        x:a.x-b.x,
        y:a.y-b.y
    }
}

function vectorProduct(v1,v2){
    //传入两个向量，获取向量积
    var mul = v1.x * v2.y - v2.x * v1.y;
    return mul;
}

function flag(v,A,O,P){
    var flag = -1;
    var PA = vector(P,A);
    var OA = vector(O,A);
    var mul1 = vectorProduct(PA,v);
    var mul2 = vectorProduct(OA,v);
    if(mul1 * mul2< 0 ){
        //两点不同向
        flag = -1;
    }else{
        //两点同向
        flag = 1;
    }
        return flag
}

function needDelay(elem,O,P){
	var A = {
		x:250,
		y:100
	}
	var B = {
		x:A.x,
		y:A.y + 200
	}
    var V1 = vector(A,B);
    var V2 = vector(B,O);
    var V3 = vector(O,A);
    var x = flag(V1,A,O,P);
    var y = flag(V2,B,A,P);
    var z = flag(V3,O,B,P);
    if(x == 1 && y == 1 && z == 1){
        return true;
    }else{
         return false;
    }
}