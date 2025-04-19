// Middleware to validate the input data (e.g., ensure terms are accepted)
const validateRegistration = (req, res, next) => {
    const { firstName, lastName, email, password, termsAccepted } = req.body;
    if (!firstName || !lastName || !email || !password || !termsAccepted) {
      res.status(400);
      throw new Error('All fields are required');
    }
    next();
  };
  
export default { validateRegistration };
