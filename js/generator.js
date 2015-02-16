/**
 * Created by gkardas on 27/10/14.
 */


$(document).on('ready',function(){

    var  undoActionHTML=[];
    var currentIndex = 0;

    $(document).keydown(function(e){
        if ( e.ctrlKey && e.keyCode == 90 ) {
            currentIndex --;
            $('#container')[0].innerHTML = undoActionHTML[currentIndex];
            undoActionHTML.pop();
        }
    });

    $('.selectable-content').live('click',function(e){
        e.stopPropagation();

        $('#target-area').html($(this).attr('id'));

    });

    $('.button-open-close').bind('click',function(){

        var targetContent = $('#editor');
        var _this = $(this);

        if(targetContent.hasClass('hidden')){

            targetContent.removeClass('hidden');
            _this.removeClass('rotate');
        }else{
            targetContent.addClass('hidden');
            _this.addClass('rotate');
        }

    });

    $('#add-button').bind('click',function(){
        // do add things

        var wGridValue = $('.w-grid-val').val();
        var dGridValue = $('.d-grid-val').val();
        var tGridValue = $('.t-grid-val').val();
        var mGridValue = $('.m-grid-val').val();


        var height =  $('.height-grid-val').val();
        var isPaddingDefault =  ($("input:radio:checked").val() == 'default') ? true : false;

        generateGrid(wGridValue,dGridValue,tGridValue,mGridValue,isPaddingDefault,height);

    });

    $('#clear-button').bind('click',function(){
        $('.fly-layout').find('.container .inside').empty();
        $('#target-area').html('container')
    });

    function generateGrid(wGridValue,dGridValue,tGridValue,mGridValue,isPaddingDefault,height){

        var wClassName = 'col-lg-'+wGridValue;
        var dClassName = 'col-md-'+dGridValue;
        var tClassName = 'col-sm-'+tGridValue;
        var mClassName = 'col-xs-'+mGridValue;
        var height = height;
        var id = guidGenerator();

        var containerId =  $('#target-area').html();
        var container = $('#'+containerId).find('.inside').eq(0);

        currentIndex++;
        undoActionHTML.push($('#container')[0].innerHTML);

        if(isPaddingDefault){
            container.append('<div id="'+id+'"  class="selectable-content h-m-t '+wClassName+' '+dClassName+' '+tClassName+' '+mClassName+'"><div class="inside" style="height: '+height+'px">'+'</div></div>');
        }else{
            container.append('<div id="'+id+'" class="selectable-content h-m-t '+wClassName+' '+dClassName+' '+tClassName+' '+mClassName+'"><div class="row"><div class="inside" style="height: '+height+'px">'+'</div></div></div>')
        }
    }

    calculateWidth();

    function calculateWidth(){

        $('.info-panel .inside div').empty();
        var _containerWidth = $('.fixed-layout').find('.container').outerWidth();
        var _containerUsageWidth = $('.fixed-layout').find('.container').width();
        var _gridWidth = $('.fixed-layout').find('.container').find('.col-md-1').eq(0).width();
        var _windowWidth = $(window).width();

        $('#container-width').append('<div class="col-md-12">Container panel <span>'+_containerWidth+'px</span></div>');
        $('#container-usage-width').append('<div class="col-md-12">Container usage panel <span>'+_containerUsageWidth+'px</span></div>');
        $('#grid-width').append('<div class="col-md-12">1 grid panel <span>'+_gridWidth+'px</span></div>');
        $('#window-width').append('<div class="col-md-12">Window size  <span>'+_windowWidth+'px</span></div>');

    }

    $( window ).resize(function() {
        calculateWidth();
    });



    var guidGenerator = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();


});