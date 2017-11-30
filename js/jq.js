$(function() {
    waterfall();
    var data = {
    'data': [
        {'src': '20.jpg'},
        {'src': '21.jpg'},
        {'src': '22.jpg'},
        {'src': '23.jpg'},
        {'src': '24.jpg'},
        {'src': '25.jpg'},
        {'src': '26.jpg'}
    ]
    };

    $(window).scroll(function() {
        $.each(data.data, function(index, element) {
            if (checkScrollSlide()) {
            var box = $('<div>').addClass('box').appendTo($('#main'));
            var pic = $('<div>').addClass('pic').appendTo(box);
            $('<img>').attr('src', 'images/' + $(element).attr('src')).appendTo(pic);
            waterfall();
        }
        });
    });
});

function waterfall() {
    // 获取box元素
    var $boxs = $('#main>.box');
    var boxH = [];
    // 计算图片列数
    var boxW = $boxs.first().outerWidth();
    var cols = Math.floor($(window).width()/boxW);
    $boxs.each(function(index, element) {
        if (index < cols) {
            // 获得第一排元素高度
            boxH[index] = $boxs.eq(index).outerHeight();
        } else {
            //获得第一排最小高度元素，并把第一排之后接着的元素放到其后
            var minH = Math.min.apply(null, boxH);
            var minHIndex = $.inArray(minH, boxH);
            $(element).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * boxW + 'px'
            });
            boxH[minHIndex] += $(element).outerHeight();
        }
    });
}

// 检测是否需要加载内容
function checkScrollSlide() {
    var $lastEle = $('#main>.box').last();
    var lastTop = $lastEle.offset().top;
    var scroll = $(window).height() + $(window).scrollTop();
    return lastTop < scroll;
}