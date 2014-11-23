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
		for(i = 0; i < len; i++) {
			offsets[i] = acs.eq(i).offset().top;
		}

		$window.on('scroll', update);	
		var isShow = false;
 		$('#switch').on('click', function (e) {
			var $this = $(this);
			var $content = $('.content');
			if (isShow) {
				isShow = false;
				$nav.css('left', '-400px');
				$this.css('left', 0).html('目录');
				$content.removeClass('hasNav');
			} else {
				$nav.css('left', '0');
				var width = $nav.width();
				$this.css('left', width).html('收起');
				$content.addClass('hasNav');
				isShow = true;
			}
		});
	});
}(jQuery));