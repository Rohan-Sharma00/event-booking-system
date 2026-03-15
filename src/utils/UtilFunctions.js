/*
|--------------------------------------------------------------------------
| Filter Object
|--------------------------------------------------------------------------
| Keeps only allowed keys from request body
*/

const FilterObj = (allowedKeys, obj) => {
  const filtered = {};

  Object.keys(obj).forEach((key) => {
    if (allowedKeys.includes(key)) {
      filtered[key] = obj[key];
    }
  });

  return filtered;
};


/*
|--------------------------------------------------------------------------
| Standard API Response Format
|--------------------------------------------------------------------------
*/

const convertResponseObj = (data = {}, success = true, message = "") => {
  return {
    success,
    message,
    data
  };
};


module.exports = {
  FilterObj,
  convertResponseObj
};