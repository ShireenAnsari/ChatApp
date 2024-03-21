import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './src/app.js';

dotenv.config({
    path: './.env'
});
// envs
// PORT=3000
// MONGODB_URI=mongodb+srv://chatapp:shiri577@chatapp.l77vn8w.mongodb.net/chatapp
// CORS_ORIGIN=*
// CLOUD_NAME='shiriscripts'
// CLOUD_KEY='293386159859194'
// CLOUD_API='tp4wgTFXG-J50CKpv4vi2_l3HPE'
// ACCESS_TOKEN_SECRET='dnfjdnf34u4u@4u4ui5i'
// ACCESS_TOKEN_EXPIRY=1d
// REFRESH_TOKEN_SECRET='hjbjdsnfjsrr4894i93rnnn$djfjnfj'
// REFRESH_TOKEN_EXPIRY=10d

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((error) => console.log('MongoDB connection failed!!', error));
