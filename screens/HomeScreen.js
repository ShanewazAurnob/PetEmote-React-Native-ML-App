import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PostScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expression, setExpression] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraPermission(cameraPermission.status === 'granted');
      setGalleryPermission(galleryPermission.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ quality: 0.5 });
      setSelectedImage(photo.uri);
      detectExpression(photo.uri);
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      detectExpression(result.uri);
    }
  };

  const detectExpression = async (imageUri) => {
    // Use a machine learning model to detect facial expressions from the selected image
    // For demonstration purposes, we'll simulate the expression detection with a random expression
    const expressions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral'];
    const detectedExpression = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(detectedExpression);
  };

  const handleLike = (postId) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
    });
  };

  const handleComment = (postId, comment) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      });
    });
  };

  const handleDislike = (postId) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, dislikes: post.dislikes + 1 };
        }
        return post;
      });
    });
  };

  const handleAddComment = (postId) => {
    if (commentText.trim() === '') {
      return; // Do not add empty comments
    }
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, commentText] };
        }
        return post;
      });
    });
    setCommentText(''); // Clear the comment box after adding the comment
  };

  const handlePost = () => {
    if (selectedImage) {
      // Implement logic to post the selected image, detected expression, likes, comments, etc.
      const newPost = {
        id: `${Date.now()}`,
        image: selectedImage,
        expression: expression,
        likes: 0,
        dislikes: 0,
        comments: [],
      };
      setPosts(prevPosts => [...prevPosts, newPost]);
      setSelectedImage(null);
      setExpression(null);
      setShowPosts(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Detect and Create a post</Text>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/L2.png')} style={styles.profileImage} />
          <TextInput
            placeholder="What's on your mind?"
            multiline={true}
            style={styles.input}
          />
        </View>
        {!selectedImage && !isCameraOpen && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setIsCameraOpen(true)}>
              <Ionicons name="camera" size={24} color="black" />
              <Text style={styles.actionText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
              <Ionicons name="image" size={24} color="black" />
              <Text style={styles.actionText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handlePost}>
              <Text style={styles.actionText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
        {isCameraOpen && cameraPermission && (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCamera(ref)}
          >
            <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
              <Ionicons name="camera" size={50} color="white" />
            </TouchableOpacity>
          </Camera>
        )}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Text style={styles.expressionText}>Detected Expression: {expression}</Text>
            <TouchableOpacity style={styles.postImageButton} onPress={handlePost}>
              <Text style={styles.postImageButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showPosts && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image source={{ uri: item.image }} style={styles.postImage} />
              <Text style={styles.expressionText}>Detected Expression: {item.expression}</Text>
              <View style={styles.interactionContainer}>
                <TouchableOpacity style={styles.interactionButton} onPress={() => handleLike(item.id)}>
                  <Ionicons name="thumbs-up" size={20} color="blue" />
                  <Text style={styles.interactionButtonText}>Like ({item.likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interactionButton} onPress={() => handleDislike(item.id)}>
                  <Ionicons name="thumbs-down" size={20} color="red" />
                  <Text style={styles.interactionButtonText}>Dislike ({item.dislikes})</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.commentsContainer}>
                <TextInput
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  style={styles.inputComment}
                />
                <TouchableOpacity
                  style={styles.commentButton}
                  onPress={() => handleAddComment(item.id)}
                >
                  <Text style={styles.commentButtonText}>Comment</Text>
                </TouchableOpacity>
                <Text style={styles.commentsTitle}>Comments:</Text>
                {item.comments.map((comment, index) => (
                  <Text key={index} style={styles.comment}>{comment}</Text>
                ))}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  camera: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  takePictureButton: {
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  expressionText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  actionText: {
    marginLeft: 5,
  },
  post: {
    marginBottom: 20,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  interactionButtonText: {
    marginLeft: 5,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comment: {
    marginLeft: 10,
    marginBottom: 5,
  },
  inputComment: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  commentButton: {
    backgroundColor: '#4267B2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postImageButton: {
    backgroundColor: '#4267B2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  postImageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostScreen;
