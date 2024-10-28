const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
    
    
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        // Set the token in a cookie
        res.cookie('token', token, { 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000,
            secure: false, 
            sameSite: 'Lax' // Use 'Lax' for development over HTTP
        });

        
        res.status(200).json({ email, token , user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000,
            secure: false, 
            sameSite: 'Lax' // Use 'Lax' for development over HTTP
        })


        // console.log(res.getHeaders())

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Impossible de se déconnecter' });
    }
}

const checkAuth = async (req, res) => {
    try {
        
        const user = await User.findById(req.userId); // Retrieve the user using the userId set in the middleware


        if (!user) {
            return res.status(404).json({ authenticated: false, message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ authenticated: true, user }); // Send back the user data and authentication status
    } catch (error) {
        res.status(500).json({ authenticated: false, message: 'Erreur de serveur' });
    }
};



module.exports = { loginUser, logoutUser , checkAuth};



  
// * signup user 

// const signupUser = async (req, res) => {
//     const { userName, email, password } = req.body; 

//     try {   

//         const user = await User.signup(userName, email, password);

//         const token = createToken(user._id);

//         // Set the token in a cookie
//         res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

//         res.status(200).json({ user, token });

//     } catch (error) {

//         res.status(400).json({ error: error.message });

//     }
// };
