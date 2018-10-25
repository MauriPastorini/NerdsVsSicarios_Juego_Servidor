var Event = require('./../models/event')
var CreateEvent = require('../helpers/create_event')

exports.getAll = async (req, res) => {
  console.log("Get all");
  try {
    return res.status(200).json(await Event.find({}));
  } catch(err){
    return res.status(500).json({error: "Internal error"}); 
  }
};

exports.getByCategories = async (req, res) => {
  console.log("Get by categories");
  try {
    let query = req.params.categories
    let categories = query.split(',')
    const events = await Event.find({})
    if(categories.length <= 0){
      return res.status(200).json(events)
    } else {
      eventsByCategories = events.filter(event => categories.every(cat => event.categories.includes(cat) ) );
      return res.status(200).json(eventsByCategories)
    }
  } catch(err){
    return res.status(500).json({error: "Internal error"});
  }
};

exports.create = async (req, res, next) => {
  console.log("Create event: ", req.body);
  try{  
    var eventResult = await CreateEvent.createEvent(req.body);
    return res.status(200).json(eventResult);
  }catch(err){
    console.log("Error: ", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({error: "Internal error"});
  }
};

exports.reportEvent = async (req, res, next) => {
  console.log("Create quick event: ", req.body);
  try{  
    var eventResult = await CreateEvent.createQuickEvent(req.body.categories,req.body.location);
    return res.status(200).json(eventResult);
  }catch(err){
    console.log("Error: ", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({error: "Internal error"});
  }
};

/* Only for debug */
exports.deleteAll = async (req, res) => {
  try{
    await Event.deleteMany({})
    res.status(200).json({message: "All events were deleted"})
  }catch(err){
    return res.status(500).json({error: "Internal error"});
  }
}