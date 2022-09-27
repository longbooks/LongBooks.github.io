(function (){
    var OAUTH_CLIENT_ID ='753974637646-7met11ffa1ru608a6saauqgcpf451dhq.apps.googleusercontent.com';
    var OAUTH_SCOPES=['http://www.googleapis.com/auth/yt-analytics.readonly',
                      'http://www.googleapis.com/auth/youtube.readonly',
                      'http://www.googleapis.com/auth/yt-analytics-monetary.readonly'];
    
    var CHANNELID;
    window.onJSClientLoad=function(){
        gapi.auth.init(function(){
            window.setTimeout(checkAuth,1);
        });
    }; 

    function checkAuth(){
        gapi.auth.authorize({
            client_id: OAUTH_CLIENT_ID,
            scope : OAUTH_SCOPES,
            immediate :true

        },handleAuthResult);

    }

    function handleAuthResult(authResult){
        if(authResult){
            $('.pre-auth').hide();
            $('post-auth').show();
            loadAPI();
        }else{
            $('.pre-auth').show();
            $('post-auth').hide();
            $('#login-link').click(function(){
                gapi.auth.authorize({
                    client_id: OAUTH_CLIENT_ID,
                    scope : OAUTH_SCOPES,
                    immediate :false
        
                },handleAuthResult);

            });
        }
    }

 function loadAPI(){
    gapi.client.load('youtube','v3',function(){
        gapi.client.load('youtubeAnalytics','v1',function(){
            getuserchannel();
        });
    });
 }  
 
 function getuserchannel(){
    var request=gapi.client.youtube.channels.list(
    {
        mine:true,
        part:'id,contentDetails'
    });
    request.execute(function(response){
        if('error' in response){
            displayMessage(response.error.message);
        }else{
            CHANNELID=response.items[0].id;
            displaychannelid(CHANNELID);
        }
    });
 }

 function displaychannelid(channel){
    alert(channel);
 }

})();




