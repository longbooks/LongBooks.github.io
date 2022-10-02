let CLIENT_ID='753974637646-7met11ffa1ru608a6saauqgcpf451dhq.apps.googleusercontent.com';
let DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
let SCOPES='https://www.googleapis.com/auth/youtube.readonly';

let authorizeButton=document.getElementById('enter-button');
let signoutButton=document.getElementById('exit-button');
let content=document.getElementById('content');

let defaultchannel='GrantCardone';

// load auth2 library
function handelClientLoad(){
    gapi.load('client:auth2',initClient);
}

// init api client library and setr up sing in listeners
function initClient(){
    gapi.client.init({
        dicoveryDocs:DISCOVERY_DOCS,
        clientId:CLIENT_ID,
        scope:SCOPES
    }).then(() => {
        // listen for sing state changes
        gapi.auth2.getAuthInstance().isSignedIn.liste(updateSignStatus);
        // handle initial sign in state
        updateSignStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick=handleAuthClick;
        signoutButton.onclick=handleSignouClick;
    });
}

// update ui sign in state changes
function updateSignStatus(isSignedIn){
    if(isSignedIn){
        authorizeButton.style.display='none';
        signoutButton.style.display='block';
        content.style.display='block';
        getchannel();
    }else{
        authorizeButton.style.display='block';
        signoutButton.style.display='none';
        content.style.display='none';
    }
} 

// handle login
function handleAuthClick(){
    gapi.auth2.getAuthInstance.signIn();
}

// handle logout
function handleAuthClick(){
    gapi.auth2.getAuthInstance.signOut();
}

// get channel from api
function getchannel(channel){
    gapi.client.youtube.channels
    .list({
        part:'snippet,contentDetails,statistics',
        forUser:channel
    })
    .then(response => {
        console.log(response);
    }).catch(err => alert('no channel by name'));
}