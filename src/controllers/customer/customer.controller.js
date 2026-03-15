const getEvents = async (req, res, next) => {
  try {

    // TODO: fetch available events

    res.json({
      success: true,
      message: "Customer get events controller working"
    });

  } catch (error) {
    next(error);
  }
};

const bookTicket = async (req, res, next) => {
  try {

    // TODO: implement booking logic

    res.json({
      success: true,
      message: "Book ticket controller working"
    });

  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {

    // TODO: fetch customer bookings

    res.json({
      success: true,
      message: "Get bookings controller working"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  bookTicket,
  getBookings
};