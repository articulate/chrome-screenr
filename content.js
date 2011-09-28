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

function insertScreenrEmbed(link) {
   
    var src = $(link).attr('href');
	var iframe = $("<iframe width='650' height='396' frameborder='0'></iframe>");
	iframe.attr("src", src.replace('.com/', '.com/embed/'));
	iframe.insertAfter(link);
}

 var screencasts = $("a:regex(href, viewscreencasts.com/[a-z0-9-])");
 
 for (var i=0;i < screencasts.length; i++) {
	insertScreenrEmbed(screencasts[i]);
 }
	
	
    
	

