const register = async (req, res, next) => {
  try {

    // TODO: implement register logic

    res.json({
      success: true,
      message: "Register controller working"
    });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {

    // TODO: implement login logic

    res.json({
      success: true,
      message: "Login controller working"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};