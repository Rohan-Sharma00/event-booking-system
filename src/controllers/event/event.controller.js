const createEvent = async (req, res, next) => {
  try {

    // TODO: create event logic

    res.json({
      success: true,
      message: "Create event controller working"
    });

  } catch (error) {
    next(error);
  }
};

const getEvents = async (req, res, next) => {
  try {

    // TODO: fetch events logic

    res.json({
      success: true,
      message: "Get events controller working"
    });

  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {

    // TODO: update event logic

    res.json({
      success: true,
      message: "Update event controller working"
    });

  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {

    // TODO: delete event logic

    res.json({
      success: true,
      message: "Delete event controller working"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};