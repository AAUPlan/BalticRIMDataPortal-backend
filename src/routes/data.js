const router = require("express").Router();
const verify = require("./verifyToken");
const content = require("../content/content.json");

router.post("/content", (req, messageToFrontEnd) => {
    const filteredContent = filterContent(content.data)
    messageToFrontEnd.send(filteredContent).end();
});

module.exports = router;


function filterContent (content) {
    let tester = content.map(topSite => {
       const layers = []       
       if (topSite.sites[0].data) {
           layers.push(topSite.sites[0].data.filter(layer => layer.public))};
       
       topSite.sites[0].data = layers[0];
    })

    console.log (tester);

   return {};
    
};
