	
window.application = {

	// Socket
	socket:null,
	// Elements
	
	// Boolean Values
	loggedIn:false, 
	// Variables
	userID:null,
	userCount:0,
	// Arrays
	params:[],

	// Methods

	init:function(data){
		var _ = this;

		var params = JSON.parse(data);
		$.each(params,function(i,param){
			 _.params[param.name] = param.value;
		});

		if(_.params != null){
			document.title = _.params.application_name;
			_.clock();
		}
	},

	clock:function(){
		var d = new Date();
			var hh = d.getHours();
			var mm = d.getMinutes();
			$('#time').text(hh+':'+mm);
		setInterval(function(){
			var d = new Date();
			var hh = d.getHours();
			var mm = d.getMinutes();
			$('#time').text(hh+':'+mm);
		},60000);
	},




}