$(function() {
    // Stuff to do as soon as the DOM is ready;

    var socket = io.connect('http://192.168.1.20:1234');
    application.socket = socket;

    var users = [];
    var counter; 

    socket.on('connect',function() {
        application.init();
        console.log('Get Application Params');
        socket.emit('get_params');
    });
    
    socket.on('userCount',function(data) {
        counter = data.count;
    });

    socket.on('params',function(data){
        //console.log(JSON.parse(data));
        console.log('Application Params Received',data);
        application.pushParams(data);
    });

    setInterval(function(){
        if(counter != application.userCount){
            application.userCount = counter;
            if(application.userCount){
                console.log('current users: ',application.userCount);
            }
        }
    },1000);
    

});