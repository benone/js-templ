function loadJS(src, cbFn){
  var headEl = document.getElementsByTagName("head")[0];
  var newScript = document.createElement('script');
  newScript.type = "text/javascript";
  if(typeof cbFn == 'function'){
    newScript.onload = cbFn;
  }
  newScript.src = src;
  headEl.appendChild(newScript);
}

function loadCSS(src, cbFn){
  var headEl = document.getElementsByTagName("head")[0];
  var newScript = document.createElement('link');
  if(typeof cbFn == 'function'){
    newScript.onload = cbFn;
  }
  newScript.rel = "stylesheet";
  newScript.href = src;
  newScript.type = "text/css";
  headEl.appendChild(newScript);
}


loadCSS("style.css");
loadJS("https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js", function(){
  loadJS("http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js", function(){
    loadJS("lib/jquery.observehashchange.min.js", function(){
      loadJS("lib/jquery.url.js", function(){
        loadJS("templates.js", function(){
          start();
        });
      });
    });
  })
});

function runEvent(anchor){
  if (anchor=="#/collages"){
    $('#dre_content').html("");
    $.tmpl( templates['collages'], { "catalog" : "1" }).appendTo($('#dre_content'));
    $('#dre_menu li').removeClass("active");
    $("#menu_collages").addClass("active");
    
  }
  if (anchor=="#/catalog"){
    $('#dre_content').html("");
    $.tmpl( templates['catalog'], { "catalog" : "1" }).appendTo($('#dre_content'));
    $('#dre_menu li').removeClass("active");
    $("#menu_catalog").addClass("active");
  }
  
}

function openCollages(){
  
}
function openCatalog(){
  
}


function start(){
  script = $('#editor_script');
  base = $("<div/>").insertAfter(script);
  base.attr("id", "editor_base");
  $.tmpl( templates['main'], { "Name" : "John Doe" }).appendTo(base);
  $.tmpl( templates['menu'], { "catalog" : "1" }).appendTo($('#dre_menu'));
  $.tmpl( templates['footer'], { "text" : "Dressed LLC" }).appendTo($('#dre_footer'));
  
  jQuery.observeHashChange({interval:100});
  jQuery(window).hashchange(function(e, data) {
    runEvent(data.after);
  });
  
  
  $('#dre_editor_wrapper a').each(function(id, el){
    //$(el).attr("href", "#" + $(el).attr("href"));
    $(el).bind("click", function(){
      base_href = document.location.href;
      if (bh_a = document.location.href.match(/(.*)\#/))
        base_href = bh_a[1];
      document.location.href = base_href +  "#" + $(el).attr("href");
      return false;
      //alert('a');
    })
  })
  //document.write(jQuery.fn.jquery);
}
//
//https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js