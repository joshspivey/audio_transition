// Audio - Main JavaScript Document

//based on slide number?
//header
//current slide ??
//product name
//product description
//if photos,
    //build photo gallery
    //show photos tab
//price
//quick look link

//subheader
//learn more


var AUDIO_APP = {
    //list of pages
    pages: ["whats_hot_section", "headphones_section", "docks_section", "wireless_section", "soundbars_section", "theater_section"],
    //starts with what's hot
    currentPage: 0,
    ////productListGlobal: JAMON.model.data.products,

    init: function () {
        debug.log("init to win it");
        debug.log('CURRENT PAGE: ' + AUDIO_APP.pages[AUDIO_APP.currentPage]);
        var productsList = JAMON.model.data.products;
        debug.log(productsList);

        $("#day_to_night_slider").slider({
            range: "max",
            min: 1,
            max: 4,
            value: 1,
            slide: function (event, ui) {
                debug.log(ui.value);
                AUDIO_APP.changeDtnSlider(ui.value);
            }
        });

        //init product prices 
        //theater page init price **NUMBER WILL CHANGE
        debug.log(productsList[0].price);
        $('#whats_hot_section .product_price').html(productsList[0].price);
        $('#headphones_section .product_price').html(productsList[1].price);
        $('#docks_section .product_price').html(productsList[4].price);
        $('#wireless_section .product_price').html(productsList[7].price);
        $('#soundbars_section .product_price').html(productsList[9].price);
        $('#theater_section .product_price').html(productsList[12].price);

        $('.item1 a').click(function () {
            AUDIO_APP.gotoPage('item1', 0);
            $('#global_up_arrow').attr('href', '#theater');
            $('#global_down_arrow').attr('href', '#headphones');
        });
        $('.item2 a').click(function () {
            AUDIO_APP.gotoPage('item2', 1);
            $('#global_up_arrow').attr('href', '#hot');
            $('#global_down_arrow').attr('href', '#docks');
        });
        $('.item3 a').click(function () {
            AUDIO_APP.gotoPage('item3', 2);
            $('#global_up_arrow').attr('href', '#headphones');
            $('#global_down_arrow').attr('href', '#wireless');
        });
        $('.item4 a').click(function () {
            AUDIO_APP.gotoPage('item4', 3);
            $('#global_up_arrow').attr('href', '#docks');
            $('#global_down_arrow').attr('href', '#soundbars');
        });
        $('.item5 a').click(function () {
            AUDIO_APP.gotoPage('item5', 4);
            $('#global_up_arrow').attr('href', '#soundbars');
            $('#global_down_arrow').attr('href', '#hot');
        });
        $('.item6 a').click(function () {
            AUDIO_APP.gotoPage('item6', 5);
            $('#global_up_arrow').attr('href', '#soundbars');
            $('#global_down_arrow').attr('href', '#hot');
        });

        //AUDIO_APP.globalArrows();

        //WHATS HOT PAGE
        //init slider
        $('#hot_slides').slides({
            preload: true,
            //generateNextPrev: true,
            play: 0
        });
        //init product info tabs
        $("#hottabs").tabs();

        //HEADPHONES PAGE
        //init slider
        $('#headphones_slides').slides({
            preload: true,
            generateNextPrev: true,
            play: 0
        });
        //init product info tabs
        $("#headphones_tabs").tabs();

        //DOCKS PAGE
        //init slider
        $('#docks_slides').slides({
            preload: true,
            //generateNextPrev: true,
            play: 0
        });
        //init product info tabs
        $("#docks_tabs").tabs();

        //WIRELESS PAGE
        //init slider
        $('#wireless_slides').slides({
            preload: true,
            //generateNextPrev: true,
            play: 0
        });
        //init product info tabs
        $("#wireless_tabs").tabs();

        //SOUNDBAR PAGE
        //init slider
        $('#soundbar_slides').slides({
            preload: true,
            //generateNextPrev: true,
            play: 0
        });
        //init product info tabs
        $("#soundbar_tabs").tabs();

        //THEATER PAGE
        //init slider
        $('#theater_slides').slides({
            preload: true,
            //generateNextPrev: true,
            play: 0
        });
        //init product info tabs
        $("#theatertabs").tabs();




        //        //init tooltips
        $(".tooltip_link").hover(
        function () {
            $('.tooltip').fadeIn();
        },
        function () {
            $('.tooltip').stop(true).fadeOut();
        });


        AUDIO_APP.initQuickLookModel();
    },

    changeDtnSlider: function (val) {
        debug.log(val);
        if (val == 1) {
            $('#dtn_image').attr('src', 'ui/img/products/docks-speakers/yamaha/main_image.png');
        }
        else if (val == 2) {
            $('#dtn_image').attr('src', 'ui/img/products/docks-speakers/yamaha/daynight_1.png');
        }
        else if (val == 3) {
            $('#dtn_image').attr('src', 'ui/img/products/docks-speakers/yamaha/daynight_2.png');
        }
        else if (val == 4) {
            $('#dtn_image').attr('src', 'ui/img/products/docks-speakers/yamaha/daynight_3.png');
        }
    },

    globalDownArrow: function () {
        debug.log("global down arrow");
        //if current page is page one 
        //change the nav
        //change the arrow links

        if (AUDIO_APP.currentPage == 0) {
            AUDIO_APP.gotoPage('item2', 1);
            $('#global_up_arrow').attr('href', '#hot');
            $('#global_down_arrow').attr('href', '#docks');
        }
        else if (AUDIO_APP.currentPage == 1) {
            AUDIO_APP.gotoPage('item3', 2);
            $('#global_up_arrow').attr('href', '#headphones');
            $('#global_down_arrow').attr('href', '#wireless');
        }
        else if (AUDIO_APP.currentPage == 2) {
            AUDIO_APP.gotoPage('item4', 3);
            $('#global_up_arrow').attr('href', '#docks');
            $('#global_down_arrow').attr('href', '#soundbars');
        }
        else if (AUDIO_APP.currentPage == 3) {
            AUDIO_APP.gotoPage('item5', 4);
            $('#global_up_arrow').attr('href', '#wireless');
            $('#global_down_arrow').attr('href', '#theater');
        }
        else if (AUDIO_APP.currentPage == 4) {
            AUDIO_APP.gotoPage('item6', 5);
            $('#global_up_arrow').attr('href', '#soundbars');
            $('#global_down_arrow').attr('href', '#hot');
        }
        else if (AUDIO_APP.currentPage == 5) {
            AUDIO_APP.gotoPage('item1', 0);
            $('#global_up_arrow').attr('href', '#theater');
            $('#global_down_arrow').attr('href', '#headphones');
        }

    },

    globalUpArrow: function () {
        debug.log("global up arrow");
        if (AUDIO_APP.currentPage == 0) {
            AUDIO_APP.gotoPage('item6', 5);
            $('#global_up_arrow').attr('href', '#soundbars');
            $('#global_down_arrow').attr('href', '#hot');
        }
        else if (AUDIO_APP.currentPage == 1) {
            AUDIO_APP.gotoPage('item1', 0);
            $('#global_up_arrow').attr('href', '#theater');
            $('#global_down_arrow').attr('href', '#headphones');
        }
        else if (AUDIO_APP.currentPage == 2) {
            AUDIO_APP.gotoPage('item2', 1);
            $('#global_up_arrow').attr('href', '#hot');
            $('#global_down_arrow').attr('href', '#docks');
        }
        else if (AUDIO_APP.currentPage == 3) {
            AUDIO_APP.gotoPage('item3', 2);
            $('#global_up_arrow').attr('href', '#headphones');
            $('#global_down_arrow').attr('href', '#wireless');
        }
        else if (AUDIO_APP.currentPage == 4) {
            AUDIO_APP.gotoPage('item4', 3);
            $('#global_up_arrow').attr('href', '#docks');
            $('#global_down_arrow').attr('href', '#soundbars');
        }
        else if (AUDIO_APP.currentPage == 5) {
            AUDIO_APP.gotoPage('item5', 4);
            $('#global_up_arrow').attr('href', '#wireless');
            $('#global_down_arrow').attr('href', '#theater');
        }
    },

    gotoPage: function (item, page) {
        debug.log('clicked hot');
        AUDIO_APP.currentPage = page;
        debug.log('CURRENT PAGE: ' + AUDIO_APP.pages[AUDIO_APP.currentPage]);
        //AUDIO_APP.changeProductContent(9);
        $('.active').removeClass('active');
        $('.' + item + ' a').addClass('active');
    },

    findProductToDisplay: function (current_slide) {
        debug.log('change prod info');
        debug.log(current_slide);
        var productList = JAMON.model.data.products;
        debug.log(productList);

        for (i = 0; i < productList.length; i++) {
            debug.log("loop" + i);
            if ((productList[i].page == AUDIO_APP.pages[AUDIO_APP.currentPage]) &&
                (productList[i].slide_number == current_slide)) {
                //alert(productList[i].name);
                AUDIO_APP.changeProductContent(i);
                return false;
            }
        }
    },

    changeProductContent: function (product) {
        debug.log(product);
        var productList = JAMON.model.data.products;
        debug.log(productList[product].name);
        var thispage = '#' + AUDIO_APP.pages[AUDIO_APP.currentPage];
        debug.log(thispage);

        //product info
        $(thispage + ' .product_name').html(productList[product].name);
        $(thispage + ' .product_description').html(productList[product].description);
        $(thispage + ' .product_price').html(productList[product].price);
        $(thispage + ' .product-quicklook').attr('qlindex', productList[product].toolId);

        //render lightbox images
        var lightboxImages = "";
        var imagecount = productList[product].imagecount;
        var imageURL = productList[product].imagepath;
        debug.log('image count = ' + imagecount);
        for (j = 1; j <= imagecount; j++) {
            lightboxImages += '<div class="single">';
            lightboxImages += '<a href="' + imageURL + 'lg_image_0' + j + '.jpg" rel="lightbox[' + thispage + ']" title="' + productList[product].name + '"><img src="' + imageURL + 'thumb_0' + j + '.png" /></a>';
            lightboxImages += '</div>';
        }
        $(thispage + ' .set').html(lightboxImages);

        //only on certain pages
        if (thispage == "#headphones_section") {
            debug.log('change bg image');
            $(thispage).css('background', 'url(' + productList[product].background + ')no-repeat');
            $(thispage + ' h1 span').text(productList[product].headline);
        }
        if (thispage == "#docks_section") {
            debug.log('change see all');
            //debug.log(thispage + '.see_all_link');
            //debug.log(thispage + '.see_all_link span');
            $(thispage + ' .see_all_link').attr('href', productList[product].seealllink);
            $(thispage + ' .see_all_link span').text(productList[product].seeallname);

            if (product == 4) {
                $('#dtn_slider_container').show();
            }
            else {
                $('#dtn_slider_container').hide();
            }
        }
    },

    initQuickLookModel: function () {
        $('a[name=modal]').click(function (e) {
            debug.log('work man');
            e.preventDefault();

            // iFrame.
            var qlId = $(this).attr('qlindex');
            var productIframe = "<iframe src='http://www.walmart.com/catalog/quicklook.do?itemId=" + qlId + "' frameborder='0' height='490' width='800' marginheight='0' marginwidth='0' scrolling='no'></iframe><a name='close' class='close quicklook-modal-close'>X</a>";

            $('#quicklook-modal').html(productIframe);

            var id = $(this).attr('data-info');

            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            $('#mask-overlay').css({ 'width': maskWidth, 'height': maskHeight });

            $('#mask-overlay').fadeIn(500);
            $('#mask-overlay').fadeTo("250", 0.8);

            var winH = $(window).height();
            var winW = $(window).width();

            $(id).css('top', winH / 2 - $(id).height() / 2);
            $(id).css('left', winW / 2 - $(id).width() / 2);
            $(id).fadeIn(1000);
        });

        // Close modal.
        $('a.quicklook-modal-close').live('click', function (e) {
            e.preventDefault();

            $('#mask-overlay').hide();
            $('.window').hide();
        });

        // Background overlay.
        $('#mask-overlay').click(function () {
            $(this).hide();
            $('.window').hide();
        });

        // Positioning modal window.
        $(window).resize(function () {
            var box = $('#quicklook-container .window');
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            $('#mask-overlay').css({ 'width': maskWidth, 'height': maskHeight });

            var winH = $(window).height();
            var winW = $(window).width();

            box.css('top', winH / 2 - box.height() / 2);
            box.css('left', winW / 2 - box.width() / 2);

        });
    }


}