(function ($) {
	var
		$window = $(window);
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
		function scroll(i) {
			var 
				cur = lis[i],
				scrollTop = 0;
			while(cur.id !== 'nav') {
				scrollTop += cur.offsetTop;
				cur = cur.offsetParent; 
			}
			$nav.scrollTop(scrollTop - 100);
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
			var 
				tempH = $(window).scrollTop(),
				sub = tempH - scrollH,
				i,
				temp;

			if (Math.abs(sub) < 50) {
				return 0;				
			}

			scrollH = tempH;
 			
 			if (sub > 0) {
 				temp = checkDown(scrollH);				
				translate(temp);
				cur = temp;
 			} else if (sub < 0) {
 				temp = checkUp(scrollH);				
				translate(temp);
				cur = temp;
 			}
		}
		for(i = 0; i < len; i++) {
			offsets[i] = acs.eq(i).offset().top;
		}

		$window.on('scroll', update);	
		$('#switch').on('click', function () {
			var
				$this = $(this),
				width = $nav.width();
			if (parseInt($nav.css('margin-left'), 10) === 0) {
				$nav.css('margin-left', -width);
				$this.css('left', 0).html('目录');
			} else {
				$nav.css('margin-left', 0);
				$this.css('left', width).html('收起');
			}
		});
	})
}(jQuery));