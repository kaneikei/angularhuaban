var huaban=angular.module('huaban',[]);
huaban.controller('huabancontroller', ['$scope', function($scope){
	$scope.canvasWH={width:1356,height:509}

	$scope.csstate={style:'stroke',fillcolor:'black',strokecolor:'black',linewidth:1}
	$scope.tianmiao=function(i,c)
	{
		$scope.csstate.style=i;
		$scope.csstate.fillcolor=c;
		$scope.csstate.strokecolor=c;
	}
	$scope.kuandu=function(i)
	{
		$scope.csstate.linewidth=i;
	}

	var huahua=document.querySelector('.huaban');
	ctx=huahua.getContext('2d');
	var current;
	// var yuanxing=document.querySelector('.yuanxing');
	// var xiangpi=document.querySelector('.xiangpi');

	var setgongju={arc:function(e)
		{
			huahua.onmousemove=function(ev)
			{	
				// yuanxing.style.display='block';
				// yuanxing.style.left=ev.clientX-20+'px';
				// yuanxing.style.top=ev.clientY-20+'px';
				ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
				if(current)
				{
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				var r=Math.abs(ev.offsetX-e.offsetX);
				ctx.arc(e.offsetX-0.5,e.offsetY-0.5,r,0,Math.PI*2);
				if(ctx.style=='fill')
				{
					ctx.fill()
				}
				else
				{
					ctx.stroke();
				}
			}
		},line:function(e)
		{
			huahua.onmousemove=function(ev)
			{	
				ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
				if(current)
				{
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.moveTo(e.offsetX,e.offsetY);
				ctx.lineTo(ev.offsetX,ev.offsetY);
				ctx.stroke();
			}
		},pen:function(e)
		{
			huahua.onmousemove=function(ev)
			{	
				ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
				if(current)
				{
					ctx.putImageData(current,0,0)
				}
				ctx.lineTo(ev.offsetX-0.5,ev.offsetY-0.5);
				ctx.stroke();
			}
		},rect:function(e)
		{
			huahua.onmousemove=function(ev)
			{	
				ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
				if(current)
				{
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				if(ctx.style=='fill')
				{
					ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY)
				}
				else
				{
					ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY)
				}
			}
		},eraser:function(e)
		{
			huahua.onmousemove=function(ev)
			{	
				// xiangpi.style.display='block';
				// xiangpi.style.left=ev.clientX-20+'px';
				// xiangpi.style.top=ev.clientY-20+'px';
				ctx.clearRect(ev.offsetX,ev.offsetY,30,30)
			}
		}}

	$scope.fnname='arc';
	$scope.tools={'直线':'line','圆形':'arc','铅笔':'pen','矩形':'rect','橡皮':'eraser'};
	//console.log(setgongju[$scope.fnname]);
	huahua.onmousedown=function(e)
	{	
		ctx.style=$scope.csstate.style;
		ctx.strokeStyle=$scope.csstate.strokecolor;
		ctx.fillStyle=$scope.csstate.fillcolor;
		ctx.lineWidth=$scope.csstate.linewidth;
		if($scope.fnname=='pen')
		{
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
		}
		setgongju[$scope.fnname](e);
		document.onmouseup=function()
		{	
			huahua.onmousemove=null;
			huahua.onmouseup=null;
			current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			yuanxing.style.display='none';
			xiangpi.style.display='none';
		}
	}
	$scope.choose=function(value)
	{
		$scope.fnname=value;
	}
	$scope.baocun=function(ev)
	{
		if(current)
		{
			ev.srcElement.href=huahua.toDataURL();
			ev.srcElement.download='mypic.png';
		}
		else
		{
			alert("请绘画后再保存")
		}
	}
	$scope.xinjian=function()
	{
		if(current)
		{
			if(confirm('是否保存'))
			{
				location.href=(huahua.toDataURL().replace("data:image/png","data:strem/octet"));//创建png图片 有兼容问题
			}
		}
		ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		current=null;
	}



	  /*document.onmousedown=function(ev)
	  {
	  	if (ev.preventDefault)
		{
			ev.preventDefault(); //阻止默认浏览器动作(W3C)
		}
		else
		{
			ev.returnValue=false;//IE中阻止函数器默认动作的方式
		}
	  	
	  }*/

}])