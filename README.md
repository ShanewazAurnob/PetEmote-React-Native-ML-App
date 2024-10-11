# PetEmote

**PetEmote** is a React Native mobile application that recognizes pet facial expressions using machine learning models integrated with TensorFlow Lite. The app provides users with interactive features such as real-time commenting, liking/disliking posts, real-time username verification, and multimedia playback, all while using Firebase for backend services.

## Features

1. **Submit ERD in Scalable PDF**: ERD (Entity Relationship Diagram) is drawn in Visio, EDrawMax, LaTex, or other tools that provide scalable PDFs for database structure.
2. **Realtime Commenting System**: Users can comment on posts without reloading the page, similar to Facebook.
3. **Like & Dislike Button with Count**: Users can like or dislike posts, and the app displays a count of reactions in real-time.
4. **Realtime Username Verification**: Verify unique usernames in real-time without page reloads, ensuring user availability during registration.
5. **Email & Phone Number Verification**: Verify email and phone numbers similar to Gmail’s registration process.
6. **Multiple Text Box & Dropdown Manipulation**: Manage multiple text boxes and dropdown lists within forms efficiently.
7. **Interactive Real-Time Rating**: Provide rating options for posts, with real-time feedback visible to users.
8. **Pagination**: Efficiently load posts and content with pagination to improve user experience.
9. **Multimedia Playback**: Play embedded audio or video files hosted on external databases, such as YouTube.
10. **Google Maps Integration**: Display real-time location data for pet events or users' pets using Google Maps or embedded map iframes.
11. **Session Management**: Use session information to manage login and logout phases.
12. **TensorFlow Lite Integration**: Detect pet facial expressions in real-time using TensorFlow Lite.
13. **Image/File Upload**: Allow users to upload images and files, displaying them on posts.
14. **Datepicker**: Provide date-picking functionality for pet-related events.
15. **Animations with GSAP**: Embed smooth transitions and animations using GSAP in the app interface.
16. **Modern Workflow & Collaboration Tools**: Utilize Git, GulpJs, GrantJs, Webpack, and SVN for efficient workflow management.
17. **Simple GraphQL Application**: Use GraphQL for querying data and handling backend operations efficiently.
18. **RESTful APIs / SOAP APIs**: Integrate with RESTful APIs or SOAP APIs for backend communication.
19. **Crystal Report Integration**: Generate reports using Crystal Report.

## Technologies Used

- **React Native with Expo**: For cross-platform mobile app development.
- **Firebase**: Backend services including database, authentication, and real-time updates.
- **TensorFlow Lite**: For real-time pet facial expression recognition.
- **GSAP**: For animations and transitions in the app interface.
- **GraphQL & RESTful APIs**: For efficient backend data handling.
- **Crystal Report**: For generating reports.

## Getting Started

### Prerequisites

- Node.js
- Expo CLI
- Firebase account
- TensorFlow Lite
- Google Maps API key (for location features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShanewazAurnob/PetEmote-React-Native-ML-App.git
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


### Running the App with Expo

1. Start the Expo server:
   ```bash
   expo start
   ```

2. Run the app:
   - For Android, you can either scan the QR code using the Expo Go app or run:
     ```bash
     expo run:android
     ```
   - For iOS, you can scan the QR code using the Expo Go app or run:
     ```bash
     expo run:ios
     ```

### Deployment

Deploy the app to Android/iOS stores using standard practices with Expo's build service:

- For Android:
  ```bash
  expo build:android
  ```

- For iOS:
  ```bash
  expo build:ios
  ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or bug reports.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries, reach out to us at:  
**Email**: aurnob.shanewaz@gmail.com

