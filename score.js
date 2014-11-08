var client = new Dropbox.Client({key:'gotth5j8shw6vsc'});
client.authenticate({interactive:false},function(error){
  if(error){
    console.log("auth error: "+error);
  }
});
if(client.isAuthenticated()){
}
document.addEventListener("click",function(){
  client.authenticate();
});
var dsMan = client.getDatastoreManager();
dsMan.openDefaultDatastore(function(error,datastore){
  var tTable = datastore.getTable('hiscores');
  var hscore = tTable.insert({
    newScore: localStorage.getItem("hiscore");
  });
});
