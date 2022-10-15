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
  setInterval(function(){
    channeldata.innerHTML=data;
  },2000);
}

document.addEventListener('DOMContentLoaded',function(){
  showChanneldata();
})

function loadCalendar() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true&key=AIzaSyBTJnaY-IbClJu84zEEv1lGYQlXHvQeLu0',true);
  xhr.responseType="json";
  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  xhr.onload=()=>{
    if(xhr.status===200){
      console.log(xhr.response);
      const channel=xhr.response.items[0];
      const output=`
      <img src="${channel.snippet.thumbnails.medium.url}" height="${channel.snippet.thumbnails.medium.height}" width="${channel.snippet.thumbnails.medium.width}">
      <ul class='collection'>
        <li class='collection-item'>Id:${channel.id}</li>
        <li class='collection-item'>Title:${channel.snippet.title}</li>
        <li class='collection-item'>Subscribers:${channel.statistics.subscriberCount}</li>
        <li class='collection-item'>Views:${channel.statistics.viewCount}</li>
        <li class='collection-item'>Video:${channel.statistics.videoCount}</li>
      </ul>
      <hr>
      <a class='btn' target="_blank" href="https://youtube.com/channel/${channel.id}">Visit Channel</a>
      `;
      showChanneldata(output);
    }else{
      console.log("Error");
    }
  };
  xhr.send();
}
