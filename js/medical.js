$(document).ready(function(){

	$(".Tmenu>li").hover(function(){
		$(this).find(">ul").stop(true, true).slideDown();
	},function(){
		$(this).find(">ul").stop(true, true).slideUp();
	});


	var oldidx=0; //기존이미지
	var idx=0;    //새로 바뀌는 이미지
	var img_n= $(".main_visual ul li").length;

	function changeImg(idx){

		if(oldidx!=idx){

			$(".dot ul li").eq(idx).addClass("active"); //선택된 하단 버튼 활성화 ->active 클래스 불러냄
			$(".dot ul li").eq(oldidx).removeClass("active"); //기존 하단 버튼 비활성화->active 클래스 삭제함
			$(".main_visual ul li").eq(idx).stop(true,true).fadeIn(300); //선택된 이미지 나타남
			$(".main_visual ul li").eq(oldidx).stop(true,true).fadeOut(300); //기존 이미지 사라짐
		}
		oldidx=idx; //선택된 이미지는 다시 기존이미지로 저장되어서 Fade Out...
	}

	function changeAuto(){
		idx++;

		//선택한 이미지가 마지막일때 다시 처음 이미지부터 시작
		if(idx>img_n-1){ //index는 0부터 시작하고 length는 1부터 시작하므로 1을 빼주어야 마지막 숫자가 맞음
			idx=0;
		}
		changeImg(idx);

	}

	timer=setInterval(changeAuto,3000); //4초 간격으로 함수를 자동생성

/*자동으로 롤링되는 순간 버튼을 클릭할때 동시에 움직여서 충돌이 날 수 있음
->모든 버튼을 클릭할때는 자동으로 이미지가 바뀌는 함수를 잠시 멈추어야 함.*/

	//하단버튼 클릭시...
	$(".dot ul li").click(function(){

		clearInterval(timer); //버튼클릭시 자동함수 해지 -> clearInterval(변수);
		idx=$(this).index();  //0,1,2...
		changeImg(idx);
		timer=setInterval(changeAuto,2000);  //버튼을 클릭안할 때는 다시 함수 자동재생
	});


	//좌우버튼 클릭시.....
	$(".arrow_bt .lbtn").click(function(){

		clearInterval(timer);
		idx--;
		if(idx<0){ //선택한 이미지가 첫번째일때 다시 맨뒤부터 다시 시작
		  idx=img_n-1;  //총개수 5-1=4(index 0,1,2,3,4)
		}
		changeImg(idx);
		timer=setInterval(changeAuto,4000); 

	});

	$(".arrow_bt .rbtn").click(function(){

		clearInterval(timer);
		idx++;
		if(idx>img_n-1){ //선택한 이미지가 0,1,2...4 마지막일때 맨처음부터 다시 시작
		  idx=0;
		}
		changeImg(idx);	
		timer=setInterval(changeAuto,4000); 

	});

	$(".content_icon ul li").hover(function(){

		var num=$(this).index()+1;
		$(this).find("a img").attr({"src":"img/iconover_"+num+".png"});

	},function(){

		var num=$(this).index()+1;
		$(this).find("a img").attr({"src":"img/icon_"+num+".png" });

	});

});