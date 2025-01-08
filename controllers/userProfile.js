import {Users} from '../models/userModel.js'



const getUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Users.findById(_id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
export default getUserProfile;
