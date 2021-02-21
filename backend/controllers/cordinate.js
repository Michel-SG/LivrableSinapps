const ArrayData = require('../StuffData/ArrayData');

// create Resource
exports.createPark = (req, res, next) => {
    if(req.body){
        let result = req.body;
        ArrayData.push(result);
        res.status(201).json({
            message: "Object has been created !"
        })
    }else{
        res.status(400).json({error: error});
        console.log('not datas')
    }
};
// get all resources
exports.getAllPark = (req, res, next) => {
    res.status(200).json(ArrayData);
};

// delete Resource
exports.deleteResource =  (req, res, next) => {
    let params = req.params.id;
    let deletedata = ArrayData.splice(ArrayData[params],1);
    res.status(200).json({
        message: "Object has been deleted !"
    });
};

// Middleware to get sereral nearby parks
exports.getAllNearbyParks = (req, res, next) => {
    let params = encodeURI(req.params.name);
    let arrayObject = [];
        ArrayData.forEach((data)=>{
            let cordinateElement = data.featureMember;
            for (let key in cordinateElement) {
                let nomArray = cordinateElement['nom'].split(' ');
                let adresseArray = cordinateElement['adresse'].split(' ');
                let sectorArray = cordinateElement['secteur'].split(' ');
                for (let i=0; i<nomArray.length; i++){
                    if(params === nomArray[i]){
                        arrayObject.push(cordinateElement);
                    }
                }
                for (let i=0; i<adresseArray.length; i++){
                    if(params === adresseArray[i]){
                        arrayObject.push(cordinateElement);
                    }
                }
                for (let i=0; i<sectorArray.length; i++){
                    if(params === sectorArray[i]){
                        arrayObject.push(cordinateElement);
                    }
                }  
            }
        })
    var withoutDouble = Array.from(new Set(arrayObject)); //we need to filter datas
    res.status(200).json(withoutDouble);
};