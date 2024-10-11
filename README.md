# PetEmote

**PetEmote** is a React Native mobile application that recognizes pet facial expressions using machine learning models integrated with TensorFlow Lite. The app provides users with interactive features such as commenting, liking/disliking posts, and viewing pet reactions in real-time. The app uses Firebase for backend services, including real-time data handling and user authentication.

## Features

1. **Pet Facial Expression Recognition**: Real-time pet emotion detection using TensorFlow Lite.
2. **Realtime Commenting System**: Comment on posts without reloading or refreshing, similar to Facebook.
3. **Like & Dislike Button**: React to pet photos with a like/dislike system.
4. **Unique Username Verification**: Real-time username availability check during registration.
5. **Email & Phone Verification**: Ensure user authenticity with email and phone verification similar to Gmail.
6. **Form Manipulation**: Handle multiple text boxes and dropdowns efficiently.
7. **Real-Time Rating System**: Rate posts with real-time feedback.
8. **Pagination**: Efficiently load pet-related content with pagination.
9. **Multimedia Playback**: Play audio and videos embedded in posts (e.g., YouTube videos).
10. **Google Maps Integration**: Display real-time location data of pet events or users' pets on Google Maps.
11. **Session Management**: Handle login/logout phases with session information.
12. **File Upload**: Upload pet images and files and display them in posts.
13. **Datepicker**: Easily select dates for pet-related events.
14. **Animations**: Use GSAP for smooth transitions and animations in the app.
15. **Collaborative Tools**: The project uses Git, GulpJs, Webpack, and other modern tools for workflow management.
16. **GraphQL & RESTful APIs**: Data is fetched using both GraphQL and RESTful APIs for efficiency.
17. **Reports**: Generate reports using Crystal Report integration.

## Technologies Used

- **React Native**: For building the cross-platform mobile app.
- **Firebase**: Backend services including database, authentication, and real-time updates.
- **TensorFlow Lite**: For real-time pet facial expression recognition.
- **GSAP**: For animations in the app interface.
- **Git/GulpJs/Webpack**: For modern workflow and collaboration.
- **GraphQL & REST APIs**: For efficient data management.
- **Crystal Report**: For report generation.

## Getting Started

### Prerequisites

- Node.js
- React Native CLI
- Firebase account
- TensorFlow Lite
- Google Maps API key (for location features)
- Git (for version control)

### Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/ShanewazAurnob/PetEmote-React-Native-ML-App.git)
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Go to the Firebase Console, create a new project, and enable the necessary services like Firestore, Authentication, etc.
   - Download the `google-services.json` file and place it in your Android project directory.

4. Set up TensorFlow Lite:
   - Follow TensorFlow Lite setup guidelines for real-time predictions.

5. Add Google Maps API Key:
   - Obtain your API key from the [Google Cloud Console](https://cloud.google.com/maps-platform) and add it to your project.

### Running the App

- To run on Android:
  ```bash
  npm run android
  ```

- To run on iOS:
  ```bash
  npm run ios
  ```

### Deployment

Deploy the app to Android/iOS stores using standard practices, or integrate Firebase Hosting for web-based deployment (if needed).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or bug reports.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries, reach out to us at:  
**Email**: aurnob.shanewaz@gmail.com

