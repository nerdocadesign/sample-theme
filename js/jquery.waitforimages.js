(function($){var eventNamespace='waitForImages';$.waitForImages={hasImageProperties:['backgroundImage','listStyleImage','borderImage','borderCornerImage']};$.expr[':'].uncached=function(obj){if(!$(obj).is('img[src!=""]')){return false;}var img=new Image();img.src=obj.src;return!img.complete;};$.fn.waitForImages=function(finishedCallback,eachCallback,waitForAll){var allImgsLength=0;var allImgsLoaded=0;if($.isPlainObject(arguments[0])){waitForAll=arguments[0].waitForAll;eachCallback=arguments[0].each;finishedCallback=arguments[0].finished;}finishedCallback=finishedCallback||$.noop;eachCallback=eachCallback||$.noop;waitForAll=!!waitForAll;if(!$.isFunction(finishedCallback)||!$.isFunction(eachCallback)){throw new TypeError('An invalid callback was supplied.');}return this.each(function(){var obj=$(this);var allImgs=[];var hasImgProperties=$.waitForImages.hasImageProperties||[];var matchUrl=/url\(\s*(['"]?)(.*?)\1\s*\)/g;if(waitForAll){obj.find('*').andSelf().each(function(){var element=$(this);if(element.is('img:uncached')){allImgs.push({src:element.attr('src'),element:element[0]});}$.each(hasImgProperties,function(i,property){var propertyValue=element.css(property);var match;if(!propertyValue){return true;}while(match=matchUrl.exec(propertyValue)){allImgs.push({src:match[2],element:element[0]});}});});}else{obj.find('img:uncached').each(function(){allImgs.push({src:this.src,element:this});});}allImgsLength=allImgs.length;allImgsLoaded=0;if(allImgsLength===0){finishedCallback.call(obj[0]);}$.each(allImgs,function(i,img){var image=new Image();$(image).bind('load.'+eventNamespace+' error.'+eventNamespace,function(event){allImgsLoaded++;eachCallback.call(img.element,allImgsLoaded,allImgsLength,event.type=='load');if(allImgsLoaded==allImgsLength){finishedCallback.call(obj[0]);return false;}});image.src=img.src;});});};}(jQuery));
