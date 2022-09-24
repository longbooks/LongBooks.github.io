const CLIENT_ID = '1005661807012-3crllm5h5d33s61spu5m4b3fv9t513dh.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton=document.getElementById('enter-button');
const signoutButton=document.getElementById('exit-button');
const content=document.getElementById('content');

const defaultchannel='GrantCardone';

function handleClientLoad(){
    gapi.load('client:auth2',initClient);
}

function initClient(){
    gapi.client.init({
        discoveryDocs:DISCOVERY_DOCS,
        clientId:CLIENT_ID,
        scope:SCOPES
    }).then(()=>{
        gapi.auth2.getAuthInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick=handleAuthClick;
        signoutButton.onclick=handleSignouClick;
    });
}

function updateSigninStatus(){
    if(isSignedIn){
        authorizeButton.style.display='none';
        signoutButton.style.display='block';
        content.style.display='block';
        getchannel(defaultchannel);
    }else{
        authorizeButton.style.display='block';
        signoutButton.style.display='none';
        content.style.display='none';
    }
}

function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignouClick(){
    gapi.auth2.getAuthInstance().signOut();
}

function getchannel(channel){
    gapi.client.youtube.channels.list({
        part : 'snippet,contentDetails,statistics',
        forUsername:channel
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => alert('NO channel by that name'));
}
