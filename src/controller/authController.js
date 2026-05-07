import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {

   const { username, email, password } = req.body;

   // Check if user already exists
   const userExists = await prisma.user.findUnique({
        where: { email: email },
   });

   if (userExists) {
        return res
            .status(400)
            .json({ error: "User already exists with this email" });
   }

   // Hash the password before saving to the database

};

export { register };