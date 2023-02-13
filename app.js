app.js

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDVuPFAK_e7_u1SjOy7bAkmFoKjNXN8W8c",
  authDomain: "my-image-labeling-app.firebaseapp.com",
  projectId: "my-image-labeling-app"
});

// Get a reference to the image form
const imageForm = document.getElementById("image-form");

// Get a reference to the image file input
const imageFile = document.getElementById("image-file");

// Get a reference to the labels div
const labelsDiv = document.getElementById("labels");

// Listen for the form submit event
imageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the image data from the file input
  const image = imageFile.files[0];

  // Call the processImage Cloud Function
  firebase.functions().httpsCallable("processImage")({ image }).then((result) => {
    // Get the labels from the result
    const labels = result.data.labels;

    // Clear the labels div
    labelsDiv.innerHTML = "";

    // Display the labels in the labels div
    labels.forEach((label) => {
      const labelEl = document.createElement("div");
      labelEl.innerText = label;
      labelsDiv.appendChild(labelEl);
    });
  }).catch((error) => {
    console.error(error);
  });
});
