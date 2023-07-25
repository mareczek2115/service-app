const express = require('express');
const router = express.Router();
const activeService = require('../models/Services').activeService;
const completedService = require('../models/Services').completedService;

router.get('/:status', (req, res) => {
  let status = req.params.status;
  if (status === 'aktywne') {
    activeService
      .find({ status: status })
      .sort({ startDate: 'desc' })
      .then(services => {
        res.render('services', { services: services, status: status });
      })
      .catch(err => console.log(err));
  } else {
    completedService
      .find({ status: status })
      .sort({ startDate: 'desc' })
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
  if (status === 'aktywne') {
    activeService
      .find({ title: regExp })
      .then(services => {
        activeService
          .find({ description: regExp })
          .then(nextServices => {
            if (services.length || nextServices.length) {
              if (services.length) {
                services.forEach(serviceOne => {
                  nextServices.forEach(serviceTwo => {
                    if (serviceOne._id == serviceTwo._id) {
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
  } else {
    completedService
      .find({ title: regExp })
      .then(services => {
        completedService
          .find({ description: regExp })
          .then(nextServices => {
            if (services.length || nextServices.length) {
              if (services.length) {
                services.forEach(serviceOne => {
                  nextServices.forEach(serviceTwo => {
                    if (serviceOne._id == serviceTwo._id) {
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
