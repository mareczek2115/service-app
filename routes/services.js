const express = require('express');
const router = express.Router();
const activeService = require('../models/Services').activeService;
const completedService = require('../models/Services').completedService;

router.get('/:status/nowy', (req, res) => {
  const status = req.params.status;
  res.render('new', { status: status });
});

router.post('/:status/nowy', (req, res) => {
  const status = req.params.status;
  const { title, servicer, description } = req.body;
  let startDate;
  let finishDate;
  if (req.body.startDate) {
    startDate = Date.parse(req.body.startDate);
  }
  if (req.body.finishDate) {
    finishDate = Date.parse(req.body.finishDate);
  }
  if (status === 'aktywne') {
    const newService = new activeService({
      title: title,
      servicer: servicer,
      description: description,
      status: status,
    });
    if (startDate) {
      newService.startDate = startDate;
    }
    newService
      .save()
      .then(service => {
        res.redirect(`/serwis/${service.status}/${service.id}`);
      })
      .catch(err => console.log(err));
  } else {
    const newService = new completedService({
      title: title,
      servicer: servicer,
      description: description,
      status: status,
    });
    if (startDate) {
      newService.startDate = startDate;
    }
    if (finishDate) {
      newService.finishDate = finishDate;
    }
    newService
      .save()
      .then(service => {
        res.redirect(`/serwis/${service.status}/${service.id}`);
      })
      .catch(err => console.log(err));
  }
});

router.get('/:status/:id/edytuj', (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  if (status === 'aktywne') {
    activeService
      .findById(id)
      .then(service => {
        res.render('edit', { status: status, service: service });
      })
      .catch(err => console.log(err));
  } else {
    completedService
      .findById(id)
      .then(service => {
        res.render('edit', { status: status, service: service });
      })
      .catch(err => console.log(err));
  }
});

router.post('/:status/:id/edytuj', (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  const { title, servicer, description, startDate } = req.body;
  if (status === 'aktywne') {
    activeService
      .findByIdAndUpdate(id, {
        title: title,
        servicer: servicer,
        description: description,
        startDate: startDate,
      })
      .then(service => {
        res.redirect(`/serwis/${status}/${id}`);
      })
      .catch(err => console.log(err));
  } else {
    const finishDate = req.body.finishDate;
    completedService
      .findOneAndUpdate(id, {
        title: title,
        servicer: servicer,
        description: description,
        startDate: startDate,
        finishDate: finishDate,
      })
      .then(service => {
        res.redirect(`/serwis/${status}/${id}`);
      })
      .catch(err => console.log(err));
  }
});

router.get('/:status/:id', (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  if (status === 'aktywne') {
    activeService
      .findById(id)
      .then(service => {
        res.render('service', { service: service, status: status });
      })
      .catch(err => console.log(err));
  } else if (status === 'zakonczone') {
    completedService
      .findById(id)
      .then(service => {
        res.render('service', { service: service, status: status });
      })
      .catch(err => console.log(err));
  }
});

router.delete('/:status/:id', (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  if (status === 'aktywne') {
    activeService
      .findByIdAndDelete(id)
      .then(() => {
        res.redirect(`/serwis/${status}`);
      })
      .catch(err => console.log(err));
  } else {
    completedService
      .findByIdAndDelete(id)
      .then(() => {
        res.redirect(`/serwis/${status}`);
      })
      .catch(err => console.log(err));
  }
});

router.get('/aktywne/:id/przenies', (req, res) => {
  const id = req.params.id;
  activeService
    .findById(id)
    .then(service => {
      res.render('remove', { service: service, status: 'przenoszone' });
    })
    .catch(err => console.log(err));
});

router.post('/aktywne/:id/przenies', (req, res) => {
  const id = req.params.id;
  const { title, servicer, description, startDate, finishDate } = req.body;
  activeService
    .findOneAndDelete(id)
    .then(() => {
      const removedService = new completedService({
        title: title,
        startDate: startDate,
        servicer: servicer,
        description: description,
        status: 'zakonczone',
      });
      if (finishDate) {
        removedService.finishDate = finishDate;
      }
      removedService
        .save()
        .then(service => {
          res.redirect(`/serwis/zakonczone/${service._id}`);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
