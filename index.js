const CLIENT_ID = '316244741974-m4otm3490uhieom1ovcn0n00v2eq5c9j.apps.googleusercontent.com';
const DISCOVERY_DOCS= ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES =  'https://www.googleapis.com/auth/youtube.readonly';


const authorizeButton = document.getElementById('authorize');

// function handleClientLoad(){
//   gapi.load("client:auth2",initClient);
// };

gapi.load("client:auth2", function() {
  gapi.auth2.init({
    discoveryDocs:DISCOVERY_DOCS,
    client_id:CLIENT_ID,
    scope: SCOPES
  }).then(function(){
    console.log("load");
    authorizeButton.onclick = handleAuthClick;
  });

});

// function initClient() {
//   gapi.client.init({
//     discoveryDocs:DISCOVERY_DOCS,
//     clientid: CLIENT_ID,
//     scope: SCOPES
//   }).then(function(){
//     console.log("load");
//     authorizeButton.onclick = handleAuthClick;
//   });
// };

function handleAuthClick(){
  return gapi.auth2.getAuthInstance()
  .signIn()
  .then(function() { 
    console.log("Sign-in successful");
    getUserChannel();
  },
  function(err) { 
     console.error("Error signing in", err);
    });
};

function getUserChannel() {
  var request = gapi.client.youtube.channels.list({
    mine: true,
    part: 'id,contentDetails'
  });
  request.execute(function(response) {
      if ('error' in response) {
        console.log(response.error.message);
      } else {
        channelId = response.items[0].id;
        displayId(channelId);
      }
    });
};

function displayId(channelidshow){
  alert(channelidshow);
};

