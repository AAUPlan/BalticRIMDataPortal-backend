const router = require("express").Router();
var cloneDeep = require("lodash.clonedeep");

const { queries } = require("../database/queries");
const verify = require("./verifyToken");
const content = require("../content/content.json");

//MIDDLEWARE
const clean = async function(req, res, next) {
  let cloned = cloneDeep(content.data); //deep clone needed for sending filtered versions to user without full access

  //req.user is only defined if the token verification worked.
  if (req.user) {
    var userValidated = await queries.readUser(req.user._id); //Using the email to read user from Database and check if permissions is given to read secret data
  }

  if (userValidated && userValidated.fullAccess) {
    return res.send(content.data).end();
  } else {
    const filteredContent = filterContent(cloned); //if user not verified
    return res.send(filteredContent).end();
  }
};
router.post("/content", verify, clean, (req, res) => {});

module.exports = router;

function filterContent(content) {
  const filtered = [];

  content.map(site => {
    filtered.push(getDataLayers(site));
  });

  return filtered;
}

function getDataLayers(obj) {
  if (obj.hasOwnProperty("sites")) {
    obj.sites.map(site => {
      getDataLayers(site);
    });
  }
  if (obj.hasOwnProperty("data")) {
    obj["data"] = obj.data.filter(layer => layer.public);
  }
  return obj;
}
