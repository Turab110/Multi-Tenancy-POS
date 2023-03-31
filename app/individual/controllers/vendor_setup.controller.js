const db = require("../../central/models/user");
const Retailer = db.retailer;
const { body,validationResult  } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'createVendor': {
     return [ 
        body('vendor_name', 'Vendor name is required').notEmpty(),
        body('contact_no', 'Phone number is required').notEmpty(),
        body('contact_no', 'Invalid phone number').isInt(),
        body('contact_no', 'Minimum 10 and Maximum 12 number required in Phone number').isLength({ min: 10 ,max: 12 }),
        body('address','Address is required').notEmpty(),
        body('payment_mode','Payment mode is required').notEmpty(),
        body('user_id', 'User id is required').notEmpty(),
        body('user_id', 'User value must be in integer').isInt(),
        body('currency','Currency is required').notEmpty(),
        body('entity_type','Entity type is required').notEmpty(),
        body('federal_tax_no','Federal tax number is required').notEmpty(),
        body('regional_tax_no','Regional tax numberEntity type is required').notEmpty(),
        body('tax_filer_status','Tax filer status is required').notEmpty(),
        body('tax_region','Tax region is required').notEmpty(),
        body('sales_tax_no','Sales tax number is required').notEmpty(),
        body('sales_tax_exempted','Sales tax exempted is required').notEmpty(),
        body('with_holding','With holding is required').notEmpty(),
       ]   
    }
    case 'updateVendor': {
      return [ 
          body('vendor_name', 'Vendor name is required').notEmpty(),
          body('contact_no', 'Phone number is required').notEmpty(),
          body('contact_no', 'Invalid phone number').isInt(),
          body('contact_no', 'Minimum 10 and Maximum 12 number required in Phone number').isLength({ min: 10 ,max: 12 }),
          body('address','Address is required').notEmpty(),
          body('payment_mode','Payment mode is required').notEmpty(),
          body('currency','Currency is required').notEmpty(),
          body('entity_type','Entity type is required').notEmpty(),
          body('federal_tax_no','Federal tax number is required').notEmpty(),
          body('regional_tax_no','Regional tax numberEntity type is required').notEmpty(),
          body('tax_filer_status','Tax filer status is required').notEmpty(),
          body('tax_region','Tax region is required').notEmpty(),
          body('sales_tax_no','Sales tax number is required').notEmpty(),
          body('sales_tax_exempted','Sales tax exempted is required').notEmpty(),
          body('with_holding','With holding is required').notEmpty(),
          body('status','status is required').notEmpty(),
          body('status','Value must be in integer').isInt(),
        ]   
     }
  }
}

exports.create = (req, res) => {
  const db1=req.ret_db
  const Vendor_setup = db1.vendor_setup;

  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  else
  {
      const vendor_setup = {
        vendor_name: req.body.vendor_name,
        contact_no: req.body.contact_no,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        payment_mode: req.body.payment_mode,
        remarks: req.body.remarks,
        user_id: req.body.user_id,
        currency: req.body.currency,
        entity_type: req.body.entity_type,
        federal_tax_no: req.body.federal_tax_no,
        regional_tax_no: req.body.regional_tax_no,
        tax_filer_status: req.body.tax_filer_status,
        tax_region: req.body.tax_region,
        sales_tax_no: req.body.sales_tax_no,
        sales_tax_exempted: req.body.sales_tax_exempted,
        with_holding: req.body.with_holding,
        status:'1',
      };

      Vendor_setup.create(vendor_setup)
        .then((data) => {
        res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while create the Vendor",
          });
        });
  }
};

exports.findAll = (req, res) => {
  const db1=req.ret_db
  const Vendor_setup = db1.vendor_setup;

    Vendor_setup.findAll({
      where:{status:1},
    })
    .then((data) => {
        if(!data.length)
        {
           res.status(500).send({
                   message: "Data Not Found",
              });
        }
        else
        {
           res.status(200).send(data);
        }
    })
};

exports.findAllData = (req, res) => {
  const db1=req.ret_db
  const Vendor_setup = db1.vendor_setup;

  Vendor_setup.findAll()
  .then((data) => {
      if(!data.length)
      {
         res.status(500).send({
                 message: "Data Not Found",
            });
      }
      else
      {
         res.status(200).send(data);
      }
  })
};

exports.findOne = (req, res) => {
  const db1=req.ret_db
  const Vendor_setup = db1.vendor_setup;

  const id = req.params.id;
  Vendor_setup.findByPk(id)
    .then((data) => {
        if(!data)
        {
           res.status(500).send({
                   message: "Sorry! Data Not Found With Id=" + id,
              });
        }
        else
        {
           res.status(200).send(data);
        }
    })
};

exports.update = (req, res) => {
  const db1=req.ret_db
  const Vendor_setup = db1.vendor_setup;

  const id = req.params.id;
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  else
  {

    Vendor_setup.update(req.body, {
      where: { vendor_id: id },
    }).then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "Vendor was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update Vendor with id=${id}`,
        });
      }
    });
  }
};

exports.delete = (req, res) => {
  const db1=req.ret_db
  const Vendor_setup = db1.vendor_setup;

  const id = req.params.id;
  Vendor_setup.destroy({
    where: { vendor_id: id },
  }).then((data) => {
    if (data) {
      res.status(200).send({
        message: "Vendor was delete successfully!",
      });
    } else {
      res.status(500).send({
        message: `Cannot delete Vendor with id=${id}`,
      });
    }
  });
};

exports.Retailer_vendor = async (req, res) => {
  var retailer = await Retailer.findByPk(req.params.retailer_id)
  if(!retailer)
    {
       res.status(500).send({
               message: "Sorry! Data Not Found With Id=" + req.params.retailer_id,
          });
    }
    else
    {
      const ret_db = require("../../individual/models/user");
      req.cur_ret_db=ret_db.getdb(retailer.dataValues.retailer_unique_no)
    }
  const db1=req.cur_ret_db
  const Vendor_setup = db1.vendor_setup;

  Vendor_setup.findAll()
  .then((data) => {
      if(!data.length)
      {
         res.status(500).send({
                 message: "Data Not Found",
            });
      }
      else
      {
         res.status(200).send(data);
      }
  })
};
