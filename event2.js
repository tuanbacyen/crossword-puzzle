var lst_images = [
    "url(images/pear.jpg)",
    "url(images/cho1.jpg)",
    "url(images/dance.jpg)",
    "url(images/meo.jpg)",
    "url(images/thinking.jpg)",
    "url(images/tl.jpg)"
];

var index = 0;

$('.itemxx').click(function() {
    $(this).fadeTo('slow', 0, function() {});
});

$('#answer').click(function() {
    clear();
});

$('#next').click(function() {
    if (index == lst_images.length - 1) {
        clear();
        $('#img-main').css('background-image', 'url(images/win.gif)');
    } else {
        index += 1;
        load_image(index);
    }
});

$('#prev').click(function() {
    if (index > 0) {
        index -= 1;
        load_image(index);
        clear();
    }
});

function load_image(index) {
    $('#img-main').css('background-image', lst_images[index]);
    $('.itemxx').css('opacity', 1);
}

function clear() {
    $('.itemxx').css('opacity', 0);
}

$(document).ready(function() {
    load_image(index);
});