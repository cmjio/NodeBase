	
window.application = {

	// Socket
	socket:null,
	// Elements
	videoElm: $('#live'),
	// Boolean Values
	canStream:false,
	// Variables
	userID:null,
	userCount:0,
	selfVideo:null,
	selfStream:null,
	// Arrays
	params:[],

	// Methods
	oldinit:function(){
		var _ = this;
		if(navigator.webkitGetUserMedia || navigator.getUserMedia){
			_.canStream = true;
			_.getUserMedia();
			$('#self').show();
			$('#friend').show();
		}else{
			_.canStream = false;
			$('#friend').show();
		}
	},

	// Start Own Webcam
	oldgetUserMedia:function(){
		var _ = this;
		navigator.webkitGetUserMedia({'video':true},function(stream){
			this.canStream = true;
			_.selfStream = stream;
			if (navigator.webkitGetUserMedia) {
				var video = $('#self');
				var blobUrl = window.webkitURL.createObjectURL(stream);
      			video.attr('src',blobUrl);
      			video.controls = false;
      			_.selfVideo = blobUrl;
      			_.socketBroadcastStream(blobUrl);
      			video.onloadedmetadata = function(e) {
      				// Ready to go. Do some stuff.
      				console.log(e);
    			};
    		} else {
    			var video = $('#self');
     			video.src = stream; // Opera
     			video.controls = false;
    		}
		},function(err) {
            console.log("Unable to get video stream!");
            this.canStream = false;
        });
				
	},

	olddisplayUsersStreams:function(){
		var _ = this;
		$.each(_.videoStreams,function(index, videoStream){
			console.log('stream:', videoStream.stream);
			var friendVideo = $('#friend');
			friendVideo.attr('src',videoStream.stream);
			console.log(friendVideo);
		});
	},

	oldrequestingStreams:function(userID){
		var _ = this;
		console.log(userID+' requested stream');
		_.socket.emit('sendingVideoStream', { video:_.selfVideo, requestedUser:userID });
	},

	// Socket Methods
	oldsocketBroadcastStream:function(blob){
		var _ = this;
		_.socket.emit('stream',blob);
	},

	oldsocketStoreStreams:function(data){
		var _ = this;
		_.videoStreams.push(data);
		console.log(_.videoStreams);
	},

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	init:function(){
		var _ = this;
		document.title = _.params.application_name;
	},


	pushParams:function(data){
		var _ = this;
		var params = JSON.parse(data);
		$.each(params,function(i,param){
			 _.params[param.name] = param.value;
		});
	}	

}