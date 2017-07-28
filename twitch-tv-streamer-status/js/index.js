var channel=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function(){
  $("#online-result").html("");
  $("#offline-result").html("");
  getResults();
    $("#online-result").attr("hidden",false);
    $("#offline-result").attr("hidden",false);
  $(".selected").click(function(){
    var id=$(this).attr('id');
    switch(id){
      case 'all':$("#online-result").attr("hidden",false);
                 $("#offline-result").attr("hidden",false);break;
      case 'online': $("#online-result").attr("hidden",false);
                     $("#offline-result").attr("hidden",true);break;
        case 'offline': $("#online-result").attr("hidden",true);
                        $("#offline-result").attr("hidden",false);break;
             }
  });
});


function getResults(){
  var api_channel="https://wind-bow.gomix.me/twitch-api/channels/";
  var api_stream="https://wind-bow.gomix.me/twitch-api/streams/";
  channel.forEach(function(channels){
    $.getJSON(api_stream+channels+"?callback=?",function(data){
      // console.log(data);
      var game,status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      // $("#online-result").append('<div id="'+data.);
    $.getJSON(api_channel+channels+"?callback=?",function(data){
      // console.log("Channel :"+data1);
      
      var name = data.display_name != null ? data.display_name : channel;
      var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
      $("#"+status+"-result").append('<a href="'+data.url+'" target="__blank"><div class="row channels" ><div class="col-xs-4"><img src="'+logo+'"></img></div><div class="col-xs-4"><p>'+name+'</p><p>'+(status=="online"?game:status)+'</p></div><div class="col-xs-4 text-center"><i class="fa fa-circle status-indicator"></i></div></div></a>');
      if(status==="online")
        {
          $("#"+status+"-result i").css("color","green");
        }
      else{
        $("#"+status+"-result i").css("color","red");
      }
    });
    });
  });
}