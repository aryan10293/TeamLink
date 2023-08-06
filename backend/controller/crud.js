import User from "../model/User";
const cloudinary = require('../middleware/cloundinary');
module.exports = {
editProfile: async (req,res) => {
        try{
             if(req.body.obj.profilePic !== undefined){
                const updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { img: await cloudinary(req.body.obj.profilePic), bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
                    }
                )
            } else {
                const updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
                    }
                )
            }
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(updateUser);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}