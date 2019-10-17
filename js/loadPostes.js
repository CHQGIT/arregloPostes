  //LoadPoster fx: gets elements for arcgis js api and the poles array.
function loadPostes(Query, QueryTask, map, layers, rotulos){
    var entregas = "";
    //Making where clausule
    for (let index = 0; index < rotulos.length; index++) {
       
        (index == rotulos.length-1) ? entregas = entregas + `rotulo  = '${rotulos[index]}'` :  entregas = entregas + `rotulo  = '${rotulos[index]}' or `;
        
    }

    var promise = new Promise((resolve,reject)=>{
        //Querying on the service.
        var qTaskInterruptions = new QueryTask(layers.pole_layer);
        var qInterruptions = new Query();
        qInterruptions.returnGeometry = true;
        qInterruptions.outFields=["*"];
        qInterruptions.where = entregas;
        qInterruptions.outSpatialReference = map.spatialReference;

        qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
       
            if(!featureSet.features.length){
                reject([]);
            }
           
            resolve(featureSet.features)
                
            }, (Errorq)=>{
              console.log(Errorq,"Error doing query for rotulos");
              reject([]);
            });
          
    });
        
    return promise;
    
}