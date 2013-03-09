
var App = function (aMain) {
	var app = this;
	
	var 	handler,
			main
	;

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
				main.hide();
				main.html(html);
				main.fadeIn(750);
		  };

		app.runQuery("/stories", "html", success);

	};


	app.resizeMain = function() {
		main.width = window.innerWidth;
		main.height = window.innerHeight;
	};
	// Constructor
	(function(){
		main = aMain;
		app.resizeMain();

	})();
}

var initApp = function() {
	app = new App($('div#listStories'));

	app.loadStoriesList();
}
initApp();