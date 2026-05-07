import { prisma } from '../config/db.js';

const register = async (req, res) => {

   const { username, email, password } = req.body;

   // Check if user already exists
   const userExists = await prisma.user.findUnique({
        where: { email: email },
   });

   if (userExists) {
        return res.json()
   }
};

export { register };