# myChat

## Project Description

myChat is a mobile application built with React Native that allows users to engage in real-time messaging. It leverages Firebase for authentication, cloud storage, and real-time database functionality. The app incorporates various features, including image and location sharing, and provides a seamless user experience with a clean and intuitive UI.

During the development process, I focused on ensuring a smooth and responsive user experience, implementing robust error handling, and adhering to best practices for mobile app development.

Key features and implementations include:

-   Anonymous user authentication with Firebase Authentication
-   Real-time messaging with Firebase Cloud Firestore
-   Image and location sharing capabilities
-   Offline support and caching of messages using AsyncStorage
-   Network status monitoring and handling
-   Accessibility features for improved usability

## Installation

1. Install Node.js and the Expo CLI if you haven't already.
2. Clone this repository.
3. Navigate to the project directory and run `npm install` to install the required dependencies.

## Usage

To run the application locally, use the following command:

```bash
npm start
```

## Technologies Used

-   React Native
-   Expo
-   Firebase (Authentication, Cloud Firestore, Cloud Storage)
-   React Navigation
-   React Native Gifted Chat
-   React Native Maps
-   AsyncStorage
-   NetInfo

## Features

### Anonymous Authentication

Users can sign in anonymously using Firebase Authentication, allowing them to join the chat without creating an account.

### Real-time Messaging

The app leverages Firebase Cloud Firestore to enable real-time messaging between users. Messages are synced across devices in real-time, ensuring a seamless communication experience.

### Image and Location Sharing

Users can share images and their current location within the chat. Images are uploaded to Firebase Cloud Storage, and the download URL is shared in the chat. Location data is retrieved using the Expo Location API and displayed on a map within the chat.

### Offline Support and Caching

The app implements offline support using AsyncStorage. Messages are cached locally, allowing users to view previous conversations even when offline. When the device regains network connectivity, the app syncs the cached messages with the Firebase database.

### Network Status Monitoring

The app monitors the network status using the @react-native-community/netinfo package. It provides visual feedback to the user when the device is offline and disables certain features that require an internet connection.

### Accessibility

myChat incorporates accessibility features to ensure a better user experience for users with disabilities. This includes labeling UI elements with accessible names and hints, and providing alternative representations for visual content.

## Screenshots

### Login Screenshot

![Screenshot 1](/img/431233510_1570587330450109_747182210155911213_n.jpg "width=50%")

### Chat Screenshot

![Screenshot 2](/img/431236800_7999276203422937_1204792064803437901_n.jpg "width=70%")

## GitHub

[Github](https://github.com/danielpinoy/ChatRoom)

## Contact

For any inquiries or feedback, please contact [Daniel John](mailto:almirante.danieljohn@gmail.com).
