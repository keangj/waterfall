waterfall('main', 'box');

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

// 滚动加载
window.onscroll = function() {
    if (checkScrollSlide()) {
        var parent = document.getElementById('main');
        for (var i = 0; i < data.data.length; i++) {
            var box = document.createElement('div');
            var pic = document.createElement('div');
            var img = document.createElement('img');
            box.className = 'box';
            pic.className = 'pic';
            img.src = 'images/' + data.data[i].src;
            pic.appendChild(img);
            box.appendChild(pic);
            parent.appendChild(box);
            waterfall('main', 'box');
        }


    }
};

function waterfall(parent, box) {
    //获取所有box元素
    var oparent = document.getElementById(parent);
    var boxs = getEles(box, oparent);
    //计算图片列数；
    var boxw = boxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/boxw);
    var boxH = [];
    for (var i = 0; i < boxs.length; i++) {
        if (i < cols) {
            // 获取第一排元素的高度
            boxH.push(boxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, boxH);//?计算数组最小值
            // console.log(minH);
            var index = getIndex(boxH, minH);
            boxs[i].style.position = 'absolute';
            boxs[i].style.top = minH + 'px';
            boxs[i].style.left = index * boxw + 'px';
            // boxs[i].style.left = boxs[index].offsetLeft + 'px';
            boxH[index] += boxs[i].offsetHeight;
        }
    }
}

//获得最小图片的索引
function getIndex(arr, minH) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === minH) {
            return i;
        }
    }
}

// 获取所以box元素
function getEles(box, parent) {
    parent = parent || document;
    var eles = parent.getElementsByClassName(box);
    return eles;
}

// 检测是否需要加载内容
function checkScrollSlide() {
    var parent = document.getElementById('main');
    var boxs = getEles('box', parent);
    //最后一个元素距离页面顶部距离
    var lateBoxT = boxs[boxs.length - 1].offsetTop + Math.floor(boxs[boxs.length - 1].offsetHeight / 2);
    // ?浏览器滚动距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // ?屏幕高度
    var height = document.documentElement.clientHeight || document.body.clientHeight;
    return (lateBoxT < scrollTop + height)?true:false;
}