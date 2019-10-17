  //Add your credentials (domain: vialactea\user)
  var conf = ( () => {
    var credentials = {
      user: '',
      pass: ''
    }
    return () => {return credentials}
  })();
//Layers used on app
  var layers = ( ()=>{
      var layer = {
        token_layer: "https://gisredeo.chilquinta.cl/portal/sharing/rest/generatetoken",
        pole_layer: "https://gisredeo.chilquinta.cl/public/rest/services/STANDARD/Nodos/MapServer/0"
      }
     return () => {return layer} 
  })();
  
//Login fx : get the token and register service layers for rest services.
function login(kernel){
    return new Promise((resolve,reject)=>{

        const url = layers().token_layer;
        
        const data = {  
            "username": conf().user,  
            "password": conf().pass,  
            "expiration": 1440,  
            "referer": "file:///I:/ProyectosReact_2019/ArregloPostes/index.html",  
            "f": "json"  
        };  
    
        $.ajax({
            method: 'POST',
            url: url,
            data: data,
            dataType: 'json'
        })
        .done(myToken => {
            
            var t = {
                "server": "https://gisredeo.chilquinta.cl/public/rest/services/",
                "userId": conf().user,
                "token": myToken.token,
                "ssl": false,
                "expires": 7200
            };
            //Register token for the service for the next layers to be loaded
            kernel.id.registerToken(t);
            resolve([myToken.token, layers()])
        })
        .fail(error => {
            reject("Error obteniendo token", error)
        });
        
    })
    
};
