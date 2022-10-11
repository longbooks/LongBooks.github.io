(function(){
    var OAUTH_CLIENT_ID='316244741974-m4otm3490uhieom1ovcn0n00v2eq5c9j.apps.googleusercontent.com';
    var OAUTH_SCOPES=['https://www.googleapis.com/auth/youtube.readonly'];
    var channelID;
     
    window.onJSClientLoad=function(){
        gapi.auth.init(function(){
        window.setTimeout(checkAuth,1);
    });};
    
    function checkAuth(){
        gapi.auth.authorize({
            client_id:OAUTH_CLIENT_ID,
            scope:OAUTH_SCOPES,
            immediate:true
        },handleAuthResult);
    }; 
    
    function handleAuthResult(authResult)
    {
        if(authResult)
        {
            $('.pre-auth').hide();
            $('post-auth').show();
            loadApi();
        }
        else{
            $('.pre-auth').show();
            $('post-auth').hide();
            $('#login-link').click(function()
            {
                gapi.auth.authorize({
                    client_id:OAUTH_CLIENT_ID,
                    scope:OAUTH_SCOPES,
                    immediate:false
                },handleAuthResult);
            });
        }
    };
    
    function loadApi(){
        gapi.client.load('youtube','v3',function()
        {
            getUserChannel();

        });
    };

    function getUserChannel(){
        var result=gapi.client.youtube.channels.list(
            {
                mine:true,
                part:'id,contentDetails'
            });
            result.execute(function(response)
            {
                if('error' in response)
                {
                    console.log(response.error.message);
                }
                else
                {
                    channelID=response.items[0].id;
                    displaychannel(channelID);
                }
            });
        };
        
    function displaychannel(chal)
    {
        alert(chal);
    };

})();
