/*
var conf = ( () => {
    var credentials = {
      user: 'vialactea\\usrgis',
      pass: 'N3L4y5HZ'
    }
    return () => {return credentials}
  })();
  */
  var conf = ( () => {
    var credentials = {
      user: 'vialactea\\ehernanr',
      pass: 'Chilquinta19'
    }
    return () => {return credentials}
  })();

  var layers = ( ()=>{
      var layer = {
        token_layer: "https://gisredeo.chilquinta.cl/portal/sharing/rest/generatetoken",
        pole_layer: "https://gisredeo.chilquinta.cl/public/rest/services/STANDARD/Nodos/MapServer/0"
      }
     return () => {return layer} 
  })();
  

function login(kernel){
    return new Promise((resolve,reject)=>{

        const url = layers().token_layer;
        
        //console.log(conf().pass, conf().user, layers())
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

            kernel.id.registerToken(t);

            resolve([myToken.token, layers()])
        })
        .fail(error => {
            reject("Error obteniendo token", error)
        });
        
        //console.log('gisred login done');
        })
    
};
