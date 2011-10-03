//http://fotis.posterous.com/regex-selector-for-jquery-james-padolsey
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

$(window).resize($.debounce(500, function() {

	var screencasts = $("iframe:regex(src, viewscreencasts.com)");

	for (var i=0;i < screencasts.length; i++) {
		resizeScreenr(screencasts[i]);
	}
	

}));

$(".expand_screenr").live('click', function(e) {
	
	var el = $(e.target);
	//get screenr
	var screenr = $("#" + el.data('screenr'));
	
	if (screenr.data('expand') === false) {
		el.text('Minimize Screenr');
		screenr.data("expand", true);
		resizeScreenr(screenr);
		return false;
	}
	
	el.text('Expand Screenr');
	screenr.data("expand", false);
	screenr.height(396);
	screenr.width(650);
	return false;	
	
});

function resizeScreenr(screenr) {
	
	if ($(screenr).data("expand") === true) {
		
		var newWidth = (window.innerWidth - 30 )- $(screenr).position().left
		var ratio = newWidth / $(screenr).width();
		$(screenr).width(newWidth);
		$(screenr).height($(screenr).height() * ratio);   
	}

}

function insertScreenrEmbed(link) {
   
    var id = new Date().getTime();
   
    var src = $(link).attr('href');
	var iframe = $("<iframe data-expand='false'  id='" + id +"' width='650' height='396' frameborder='0'></iframe>");
	iframe.attr("src", src.replace('.com/', '.com/embed/'));
	iframe.insertBefore(link);
    
    var div = $("<div></div>");
	div.insertBefore(iframe);
	
    var expand = $('<a style="font-size:10pt" href="#" data-screenr="' + id + '" class="expand_screenr">Expand Screenr</a>');
	expand.appendTo(div);
}

if (window.location.href.indexOf(".viewscreencasts.com") == -1) {

	var screencasts = $("a:regex(href, viewscreencasts.com/[a-z0-9-])");
 
	 for (var i=0;i < screencasts.length; i++) {
		insertScreenrEmbed(screencasts[i]);
	 }
 }
	
	
    
	

