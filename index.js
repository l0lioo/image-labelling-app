const functions = require("firebase-functions");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");

admin.initializeApp();

// Create a new Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "./creds.json"
});

// Define the processImage Cloud Function
exports.processImage = functions.https.onCall((data, context) => {
  return new Promise((resolve, reject) => {
    // Get the image data from the request
    const image = data.image;

    // Use the Google Cloud Vision API to label the image
    client.labelDetection(image)
      .then((results) => {
        // Get the labels from the results
        const labels = results[0].labelAnnotations.map((annotation) => annotation.description);

        // Return the labels
        resolve({ labels });
      })
      .catch((error) => {
        reject(error);
      });
  });
});
