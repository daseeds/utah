
var App = function (aMain) {
	var app = this;
	
	var 	handler,
			main,
			mainContent
	;
	app.story = new Array();

	app.runQuery = function(aUrl, aDataType, aHandler) {

		$.ajax({
 
		  // the URL for the request
		  url : aUrl, 
		  // the data to send
		  // (will be converted to a query string)
		  data : {
		  },
		 
		  // whether this is a POST or GET request
		  type : "GET",
		 
		  // the type of data we expect back
		  dataType : aDataType,
		 
		  // code to run if the request succeeds;
		  // the response is passed to the function
		  success : function( html ) {
		  		aHandler(html);
		  },
		 
		  // code to run if the request fails;
		  // the raw request and status codes are
		  // passed to the function
		  error : function( xhr, status ) {
		    alert("Sorry, there was a problem!");
		  },
		 
		  // code to run regardless of success or failure
		  complete : function( xhr, status ) {
		    //alert("The request is complete!");
		  }
		 
		});
	};

	app.loadStoriesListJSON = function() {
		var success = function( html ) {
				mainContent = html;

				//main.hide();
				app.ImagesJsonAdd();
				app.resize();
				//main.fadeIn(500);	
		  };

		app.runQuery("/stories/json", "json", success);
	};

	app.loadStoriesListHTML = function() {
		var success = function( html ) {
				mainContent = html;

				//main.hide();
				main.html(html);
				app.resize();
				//main.fadeIn(500);	
		  };

		app.runQuery("/stories", "html", success);
	};

	app.loadPerksListHTML = function() {
		var success = function( html ) {
				mainContent = html;

				//main.hide();
				$('div.sidebar').html(html);
				app.resize();
				//main.fadeIn(500);	
		  };

		app.runQuery("/perks", "html", success);
	};

	app.loadStoryDetail = function(id) {
		var success = function( html ) {
				app.story[parseInt(id)] = html;

				
				$('div#oneStory').html(html);
				
		  };

		app.runQuery("/stories/" + id, "html", success);
	};




	HEIGHTS = [];

	app.getheight = function (images, width) {
	  width -= images.length * 5;
	  var h = 0;
	  for (var i = 0; i < images.length; ++i) {
	    h += $(images[i]).data('width') / $(images[i]).data('height');
	  }
	  return width / h;
	};

	app.setheight = function (images, height) {
	  HEIGHTS.push(height);
	  for (var i = 0; i < images.length; ++i) {
	    $(images[i]).css({
	      width: height * $(images[i]).data('width') / $(images[i]).data('height'),
	      height: height
	    });
	    $(images[i]).attr('src', $(images[i]).attr('src').replace(/w[0-9]+-h[0-9]+/, 'w' + $(images[i]).width() + '-h' + $(images[i]).height()));
	  }
	};

	app.resize = function (images, width) {
	  setheight(images, getheight(images, width));
	};

	app.run = function (max_height) {
	  var size = main.width();

	  console.log("Pagination main.width()=" + main.width());
	  var n = 0;
	  var images = $('img.story');
	  w: while (images.length > 0) {
	    for (var i = 1; i < images.length + 1; ++i) {
	      var slice = images.slice(0, i);
	      var h = app.getheight(slice, size);
	      if (h < max_height) {
	        app.setheight(slice, h);
	        n++;
	        images = images.slice(i);
	        continue w;
	      }
	    }
	    app.setheight(slice, Math.min(max_height, h));
	    n++;
	    break;
	  }
	  console.log(n);
	};

	app.ImagesJsonAdd = function(storyId) {

		for(i in mainContent)
		{
	//		var newsection = "<section class='story' style='position: absolute; left: "+pagginatorLeft[i]+"px; top: "+pagginatorTop[i]+"px' id=" + mainContent[i].id + ">\
	//		<img src=" + mainContent[i].image + "   height='"+mainHeight+"px'/>\
	//		<h3>" + mainContent[i].title + "</h3></section>";
	//		var section = main.append(newsection);

			var link = $("<a href='#story-" + mainContent[i].id + "'></a>").appendTo(main);
			var section = $("<img id="+ mainContent[i].id +" src=" + mainContent[i].image + " data-width="+ mainContent[i].width +" data-height="+mainContent[i].height+" />\
			").appendTo(link);
			var id = mainContent[i].id;

			section.bind('click', function() {
				app.storySelect($(this).attr('id'));
			});
		}		

	};

	app.storySelect = function(storyId) {

		app.loadStoryDetail(storyId);

		$('div#oneStory').addClass('selected');
		main.removeClass('selected');

	};

	app.resize = function() {
		app.run(340);
		//$("footer").css({"top": main.height() + "px"});
	};
	// Constructor
	(function(){
		main = aMain;
		main.addClass('selected');

	})();
}

$(function(){
  
  // Bind an event to window.onhashchange that, when the hash changes, gets the
  // hash and adds the class "selected" to any matching nav link.
  $(window).hashchange( function(){
    var hash = location.hash;
    
    // Set the page title based on the hash.
    document.title = 'The hash is ' + ( hash.replace( /^#/, '' ) || 'blank' ) + '.';
    
    // Iterate over all nav links, setting the "selected" class as-appropriate.
    $('#nav a').each(function(){
      var that = $(this);
      that[ that.attr( 'href' ) === hash ? 'addClass' : 'removeClass' ]( 'selected' );
    });
  })
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  $(window).hashchange();
  
});


var initApp = function() {
	app = new App($('div#listStories'));

	window.addEventListener('resize', app.resize, false);
	app.loadStoriesListHTML();
	app.loadPerksListHTML();
}
initApp();