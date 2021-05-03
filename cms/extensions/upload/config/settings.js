module.exports = {
  provider: "cloudinary",
  providerOptions: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

//If you dont want to push the data to final db and cloudinary
// 1. Delete /development from /cms/config/env
// 2. Change the code from this file to this:

// if (process.env.NODE_ENV === "production") {
//   module.exports = {
//     provider: "cloudinary",
//     providerOptions: {
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     },
//   };
// } else {
//   module.exports = {};
// }
