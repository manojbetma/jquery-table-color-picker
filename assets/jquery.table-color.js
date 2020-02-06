/********
    
Author: Manoj Prajapat
	
****/
 
(function($){
   $.fn.tblcolor = function (options) 
   {
    
	    var defaults = {
			color:false,
		   background:false,
		   reset:false,
		   toLower:false,
		   toUpper:false,
		   toNormal:false
      }
	  
        var settings = $.extend({}, defaults, options);
		
		console.log(settings);
								
         return this.each(function()
		 {
              var obj  = $(this);
			  
			  if(!$(obj).find('td').hasClass('no-col'))
			  {
				  $(obj).find('td').on('mouseenter', function() 
				  {
					  td = $(this); 
					  var libj =  $($(td).find('li')); if(!libj.length) libj = td;
					  _t = libj.text();   
					  
					  var exist_td_font_color = tblcolor_rgb2hex(td.css("color"));
					  var exist_td_bg_color = tblcolor_rgb2hex(td.css("background-color"));
					  
					  var html = document.createElement("div");
					  html.setAttribute("class","tblcolor-picker");
					  
					  // for color.
					  var font_color_picker = document.createElement("input");
					  font_color_picker.setAttribute("type","color");
					  font_color_picker.setAttribute("class","tblcolor-col");
					  font_color_picker.setAttribute("value",exist_td_font_color);
					  font_color_picker.onchange = function() { td.css("color",(this.value)); }
					  
					  var color_label = document.createElement("i");
					  color_label.setAttribute("class","fa fa-font");
					  color_label.setAttribute("style","color:#000;position: relative;top: -5px;");
					  color_label.innerHTML=":";
					  
					  // for background.
					  var font_bg_picker = document.createElement("input");
					  font_bg_picker.setAttribute("type","color");
					  font_bg_picker.setAttribute("class","tblcolor-bg");
					  font_bg_picker.setAttribute("value",exist_td_bg_color);
					  font_bg_picker.onchange = function() { td.css("background-color",(this.value)); }
					  
					  var color_bg = document.createElement("i");
					  color_bg.setAttribute("class","fa fa-paint-brush");
					  color_bg.setAttribute("style","color:#000;position: relative;top: -5px;margin: 0px 5px;");
					  color_bg.innerHTML=":";
					  
					   var btn_reset_color = document.createElement("i");
					  btn_reset_color.setAttribute("class","fa fa-refresh");
					  btn_reset_color.setAttribute("style","color: #fff;position: relative;top: -5px;margin: 0px 5px;background: #2c5151;padding: 4px 7px;    cursor: pointer;");
					  btn_reset_color.innerHTML="";
					  btn_reset_color.onclick = function() { td.css("background-color",""); td.css("color",'');  }
					  
					   if(settings.color)
					   {
							html.appendChild(color_label);
							html.appendChild(font_color_picker);
					   }
					    
					  if(settings.background)
					   {
						    html.appendChild(color_bg);
					        html.appendChild(font_bg_picker);
					   }
					   
					   if(settings.reset)
					   {
						  html.appendChild(btn_reset_color);  
					   }
					
					  //text transformation :: Normal
					  var font_normal = document.createElement("img");
					  font_normal.setAttribute("src","assets/img/transform-normals.png");
					  font_normal.setAttribute("class","tt-normal short");
					  font_normal.onclick = function() { _t = tblcolor_Ucfirst(_t); libj.text(_t); }
					  
					   //text transformation :: Uppercase
					  var font_uppercase = document.createElement("img");
					  font_uppercase.setAttribute("src","assets/img/transform-ucs.png");
					  font_uppercase.setAttribute("class","tt-uppercase short");
					  font_uppercase.onclick = function() { _t = _t.toUpperCase(); libj.text(_t); }
					  
					  //text transformation :: lowercase
					  var font_lowercase = document.createElement("img");
					  font_lowercase.setAttribute("src","assets/img/transform-lcs.png");
					  font_lowercase.setAttribute("class","tt-lowercase short");
					  font_lowercase.onclick = function() { _t = _t.toLowerCase(); libj.text(_t); }
					  
					   var br = document.createElement("br");
					    if( (!settings.color) && (!settings.background) && (!settings.reset) )
						{ }
		                else if( settings.toLower || settings.toUpper || settings.toNormal ) 
							html.appendChild(br);	
					   
					    if( settings.toNormal) html.appendChild(font_normal);
					    if( settings.toUpper) html.appendChild(font_uppercase);
					    if( settings.toLower) html.appendChild(font_lowercase);
					  
					  
				  
					  if(td.find('.tblcolor-picker').length <= 0) { td.append(html);  }
					 
				 });
			 
				
			 $(obj).find('td').on('mouseleave', function() 
			  {
				  
				  td = $(this);
				  if(td.find('.tblcolor-picker').length > 0) td.find('.tblcolor-picker').remove();
			  });
			  }
			
         });
     };
 
   
})(jQuery);

function tblcolor_Ucfirst(string) 
{ return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); }

function tblcolor_rgb2hex(rgb) 
{
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgb != null)
    return "#" + tblcolor_hex(rgb[1]) + tblcolor_hex(rgb[2]) + tblcolor_hex(rgb[3]);
}

 function tblcolor_hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
function tbl_text_transform(target,type)
  {
     $(target+" tr td" ).each(function( index ) 
		   {
		        var obj  = $(this); 
				if(!obj.hasClass('no-col'))
				{  
				  
                 var iobj =  $($(obj).find('li'));
				 if(!iobj.length) iobj = obj;
				  
				  string = iobj.text(); 
				  if(type=="normal") string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
				  if(type=="uppercase") string = string.toUpperCase(); 
				  if(type=="lowercase") string = string.toLowerCase(); 
				  iobj.text(string); 
				}
		   });
  }
