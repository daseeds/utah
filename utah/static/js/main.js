
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

	app.loadStoriesList = function() {
		var success = function( html ) {
				mainContent = html;

				main.hide();
				app.resize();
				main.fadeIn(500);	
		  };

		app.runQuery("/stories/json", "json", success);
	};

	app.loadStoryDetail = function(id) {
		var success = function( html ) {
				app.story[parseInt(id)] = html;

				
				$('div#oneStory').html(html);
				
		  };

		app.runQuery("/stories/" + id, "html", success);
	};

	app.resizeMain = function() {
		
		//main.html(html);
		
		var row = 3;
		var margin = 20;
		var mainHeight = (main.height() + margin) / row;
		var totalWidth = 0;
		var scaleRatio = new  Array();

		var currentPaddingLeft;
		var currentPaddingTop;
		for(i in mainContent)
		{
			totalWidth += parseInt(mainContent[i].width / scaleRatio);
			totalWidth += margin;
		}

		for(i in mainContent)
		{
			scaleRatio[i] = mainContent[i].height / mainHeight;
		}

		// Build rows
		var pagginatorLeft = new  Array();
		var pagginatorTop = new  Array();
		currentPaddingLeft = 0;
		currentPaddingTop = 0;
		for(i in mainContent)
		{
			pagginatorLeft[i] = currentPaddingLeft;
			pagginatorTop[i] = currentPaddingTop;
			currentPaddingLeft += parseInt(mainContent[i].width / scaleRatio[i]) + margin;
			if (currentPaddingLeft > main.width())
			{
				currentPaddingLeft = 0;
				currentPaddingTop += mainHeight + 20;
				pagginatorLeft[i] = currentPaddingLeft;
				pagginatorTop[i] = currentPaddingTop;
				currentPaddingLeft += parseInt(mainContent[i].width / scaleRatio[i]) + margin;
			}
			
		}

		// remove all child before adding new list
		main.empty();
		// TODO: update top / left configuration instead of recreating all if exist
		for(i in mainContent)
		{
	//		var newsection = "<section class='story' style='position: absolute; left: "+pagginatorLeft[i]+"px; top: "+pagginatorTop[i]+"px' id=" + mainContent[i].id + ">\
	//		<img src=" + mainContent[i].image + "   height='"+mainHeight+"px'/>\
	//		<h3>" + mainContent[i].title + "</h3></section>";
	//		var section = main.append(newsection);

			var link = $("<a href='#story-" + mainContent[i].id + "'></a>").appendTo(main);
			var section = $("<section class='story' style='position: absolute; left: "+pagginatorLeft[i]+"px; top: "+pagginatorTop[i]+"px' id=" + mainContent[i].id + ">\
			<img src=" + mainContent[i].image + "   height='"+mainHeight+"px'/>\
			<h3>" + mainContent[i].title + "</h3></section>").appendTo(link);
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
		app.resizeMain();
		$("footer").css({"top": main.height() + "px"});
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
	app.loadStoriesList();
}
initApp();