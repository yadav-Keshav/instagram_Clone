const express=require('express');
const { isFollowing, createFollowers, deleteFollowers } = require('../controllers/userFollowers.controllers');
const followerRouter=express.Router();

followerRouter.post("/isfollowing",isFollowing);
followerRouter.post("/create",createFollowers);
followerRouter.post("/delete",deleteFollowers);

module.exports=followerRouter;