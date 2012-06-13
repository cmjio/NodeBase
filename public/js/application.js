	
window.application = {

	// Socket
	socket:null,
	// Elements
	// 
	// Boolean Values
	// 
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
		}
	}

}