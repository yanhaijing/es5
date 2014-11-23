(function ($) {
	var $window = $(window);
	$(function (e) {
		var
			acs = $('.content a[id]'),
			offsets = [],
			len = acs.length,
			scrollH = 0,
			cur = 0,
			$nav = $('#nav'),
			lis = $nav.find('.toc a').parent(),
			i;
		var storage = new window.Storage();
		function scroll(i) {
			var $cur = lis[i];
			var scrollTop = 0;
			while($cur.id !== 'nav') {
				scrollTop += $cur.offsetTop;
				$cur = $cur.offsetParent; 
			}
			$nav.scrollTop(scrollTop);
		}
		function translate(i) {
			if (i === cur) {
				return 0;
			}
			lis.eq(cur).removeClass('active');
			lis.eq(i).addClass('active');
			scroll(i);
		}
		function checkDown(x) {
			var i;
			for (i = cur + 1; i < len; i++) {
				if (x < offsets[i]) {
					return i - 1;
				}
			}
			return len - 1;
		}
		function checkUp(x) {
			var i;
			for (i = cur; i > -1; i--) {
				if (x > offsets[i]) {
					return i;
				}
			}

			return 0;
		}
		function update(e) {
			var tempH = $window.scrollTop();
			var sub = tempH - scrollH;
			var i;
			var temp;

			if (Math.abs(sub) < 50) {
				return 0;				
			}

			scrollH = tempH;
 			
 			if (sub > 0) {
 				temp = checkDown(scrollH);				
 			} else {
 				temp = checkUp(scrollH);				
 			}
 			translate(temp);
			cur = temp;
			
			return 1;
		}
		function switchNav(status) {
			if (!status) {
				$nav.css('left', '-400px');
				$('#switch').css('left', 0).html('目录');
				$('.content').removeClass('hasNav');
				return false;
			}
			$nav.css('left', '0');
			var width = $nav.width();
			$('#switch').css('left', width).html('收起');
			$('.content').addClass('hasNav');
			
			return true;
		}

		for(i = 0; i < len; i++) {
			offsets[i] = acs.eq(i).offset().top;
		}

		var isShow = $(window).width() >= 1300;
		var hash = storage.load('es5/tag');
		location.hash = hash;
		switchNav(isShow);

		$window.on('scroll', update);	
		
 		$('#switch').on('click', function (e) {
			isShow = switchNav(!isShow);
		});

	    $(window).unload(function(e){
	        storage.save('es5/tag', acs.eq(cur).attr('id'));
	    });
	});
}(jQuery));