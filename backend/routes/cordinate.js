const express = require('express'); // we need express for the router
const router = express.Router(); // obtain router in oder to manipulate datas
const cordinateCtrl = require('../controllers/cordinate'); //relation between two files

router.post('/', cordinateCtrl.createPark); //road to create resource
router.get('/', cordinateCtrl.getAllPark);  // road to get all resources
router.get('/:name', cordinateCtrl.getAllNearbyParks); // road to get several nearby parks
router.delete('/:id', cordinateCtrl.deleteResource); // road to delete resource 
module.exports = router; // export file in oder to use it in our application