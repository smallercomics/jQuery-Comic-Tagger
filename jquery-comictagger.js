/**
 * jquery version of the comictagger script
 * originally written by Ash Young (http://evoluted.net)
 * this version by Andrew Fulton (http://mumblier.com)
 */
(function($){
 $.fn.comicTagger = function(_options) {
    
    var defaults = {
      cl:31,
      class_button:"comictag_button",
      separator:" | ",
      class_tag:"add_tag",        //equivalent of imgTag
      class_clearoff:"clear_off", //imgClearOff
      class_gotooff:"goto_off",   //imgGotoOff
      class_clearon:"clear_on",   //imgClearOn
      class_gotoon:"goto_on",     //imgGotoOn
      class_info:"info",          //imgInfo
      comic_dir:"/",              //comicDir
      text_tag:"Tag this comic",
      text_goto:"Goto tag",
      text_clear:"Clear tag",
      text_info:"Info?",
      text_info_pop:"To remember where you are, select 'Tag this comic', then later select 'Go to tag' to return to where you left off."
    };
    var options = $.extend(defaults, _options);
    
    /**
     * The following two functions have been borrowed from Peter-Paul Koch.
     * Please find them here: http://www.quirksmode.org
     */
    var createCookie= function(name,value,days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
      } else {
        var expires = "";
      }
      document.cookie = name+"="+value+expires+"; path="+options.comic_dir;
    }
    
    var readCookie = function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
     return null;
    }
    
    var do_tag = function(o){
      createCookie("bm", window.location, options.cl);
      $(o).parent().find(".ct_goto").removeClass(options.class_gotooff).addClass(options.class_gotoon);
      $(o).parent().find(".ct_clear").removeClass(options.class_clearoff).addClass(options.class_clearon);
    }
    var do_clear = function(o){
      createCookie("bm","",-1);
      $(o).parent().find(".ct_goto").removeClass(options.class_gotoon).addClass(options.class_gotooff);
      $(o).parent().find(".ct_clear").removeClass(options.class_clearon).addClass(options.class_clearoff);
    }
    var do_goto = function(){
      var g = readCookie('bm');
      if(g) {
        window.location = g;
      }	
    }
    var do_info = function(o){
      
      $(o).parent().find(".ct_pop").show();
    }
    var hide_info = function(o){
      $(o).parent().find(".ct_pop").hide();
    }
    return this.each(function() {
      createCookie('t', 1);
      var c = readCookie('t');
      if (c){
        var l = readCookie('bm');
        var _goto,_clear;
        if (l){
          _goto = options.class_gotoon;
          _clear = options.class_clearon;
        }else{
          _goto = options.class_gotooff;
          _clear = options.class_clearoff;
        }
        obj = $(this);
        var buttons = "<span class='"+options.class_tag+"'>"+options.text_tag+"</span>" + options.separator
                    + "<span class='ct_goto "+_goto+"'>"+options.text_goto+"</span>" + options.separator
                    + "<span class='ct_clear "+_clear+"'>"+options.text_clear+"</span>" + options.separator
                    + "<span class='"+options.class_info+"'>"+options.text_info+"</span>";
        var info_pop = "<div class='ct_pop'>"+ options.text_info_pop+"</div>";
        obj.html(buttons + info_pop);
        obj.addClass('_comictagger');
        // add actions
        obj.find('.' + options.class_tag).click(function(){
          do_tag( this );
        });
        obj.find('.' + _goto).click(function(){ do_goto() });
        obj.find('.' + _clear).click(function(){ do_clear(this) });
        obj.find('.' + options.class_info).hover(function(){ do_info(this)},function(){ hide_info(this)});
        obj.find('.ct_pop').hide();
      }
      
    });
 };
})(jQuery);