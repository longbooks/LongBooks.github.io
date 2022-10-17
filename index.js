var client;
var access_token;

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

function disconnect() {
  let responce=confirm("Are you sure,you want disconnect");
  if(responce){
    document.write("disconnect");
    google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
  }else{
    document.write("Not disconnect");
  }
}

function showchanneldata(data){
  const channeldatashow=document.getElementById('channel-data');
  channeldatashow.innerHTML=data;
}

function channeldata(xhr){
  const channel=xhr.items[0];
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
  showchanneldata(output);
}

function loadCalendar(){
  fetch('https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true&key=AIzaSyBTJnaY-IbClJu84zEEv1lGYQlXHvQeLu0',{
    method:'get',
    headers:{
        'Authorization' : 'Bearer ' + access_token
    }
}).then(responce => responce.json())
  .then(json => channeldata(json))
  .catch(function(error){
    console.log(error);
  });
}

