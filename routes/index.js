const express = require('express');
const router = express.Router();
const beingService = require('../models/Services').beingService;
const doneService = require('../models/Services').doneService;

router.get('/:status', (req, res) => {
    let status = req.params.status;
    if(status === 'aktywne'){
        beingService.find({ status: status }).sort({ startDate: 'desc' })
            .then(services => {
                res.render('services', { services: services, status: status });
            })
            .catch(err => console.log(err));
    } else {
        doneService.find({ status: status }).sort({ startDate: 'desc' })
            .then(services => {
                res.render('services', { services: services, status: status });
            })
            .catch(err => console.log(err));
    }
});

router.post('/:status', (req, res) => {
    const status = req.params.status;
    const { findService } = req.body;
    const regExp = new RegExp(`.*${findService}.*`, 'gi');
    if(status === 'aktywne'){
        beingService.find({ title: regExp })
            .then(services => {
                beingService.find({ description: regExp })
                    .then(nextServices => {
                        if(services.length || nextServices.length){
                            if(services.length){
                                services.forEach(serviceOne => {
                                    nextServices.forEach(serviceTwo => {
                                        if(serviceOne._id == serviceTwo._id){
                                            const index = nextServices.indexOf(serviceTwo);
                                            nextServices.splice(index, 1);
                                        }
                                    });
                                });
                                services = [...services, ...nextServices];
                            } else services = [...nextServices];
                            res.render('services', { services: services, status: status });                     
                        } else {
                            res.redirect(`/serwis/${status}`);
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    } 
    else{
        doneService.find({ title: regExp })
            .then(services => {
                doneService.find({ description: regExp })
                    .then(nextServices => {
                        if(services.length || nextServices.length){
                            if(services.length){
                                services.forEach(serviceOne => {
                                    nextServices.forEach(serviceTwo => {
                                        if(serviceOne._id == serviceTwo._id){
                                            const index = nextServices.indexOf(serviceTwo);
                                            nextServices.splice(index, 1);
                                        }
                                    });
                                });
                                services = [...services, ...nextServices];
                            } else services = [...nextServices];
                            res.render('services', { services: services, status: status });                     
                        } else {
                            res.redirect(`/serwis/${status}`);
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
});

module.exports = router;