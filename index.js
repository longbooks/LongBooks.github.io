var client;
var access_token;
var login_hint;
var id_token;

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: '141290470186-e63pmerr4gft8cep5gptbbjlo3gcqn5u.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    callback: (tokenResponse) => {
      access_token = tokenResponse.access_token
    },
  });
}

function getToken() {
  client.requestAccessToken()
}
function revokeToken() {
  google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
}

function showChanneldata(data){
  const channeldata=document.getElementById('channel-data');
  channeldata.innerHTML=data;
};

function loadCalendar(){
  fetch('https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true&key=AIzaSyBTJnaY-IbClJu84zEEv1lGYQlXHvQeLu0',{
    method:'get',
    headers:{
        'Authorization' : 'Bearer ' + access_token
    }
}).then(responce => responce.json())
  .then(json => console.log(json))
  .catch(error => console.log(error))
}
