import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';

export default function AboutUs() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>About PetEmote</Text>

        <View style={styles.YTcontainer}>
            <WebView
                style={styles.video}
                javaScriptEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/M2C9T34RFaQ' }}
            />
        </View>
        <View style={styles.mapViewContainer}>
                    <Text style={styles.aboutText}>HeadOffice</Text>
                    <MapView style={{flex:1}}
                        // provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: 22.4716,
                            longitude: 91.7877,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0921,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 22.4716, longitude: 91.7877 }}
                            title="Sudoku Forever"
                            description="Headoffice of Sudoku Forever"
                            />
                    </MapView>
        </View>


        <Text style={styles.subHeading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Sudoku is a popular logic-based number puzzle. The goal is to fill a 9x9 grid with digits
          so that each column, each row, and each of the nine 3x3 subgrids contains all of the
          digits from 1 to 9. Here are some simple yet effective tips and tricks to help you solve
          Sudoku puzzles more efficiently.
        </Text>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#b30e14',
      paddingTop: 30,
    },
    YTcontainer:{
        flex:1
    },
    video: {
        flex: 1,
        height:200,
        width:'100%'
    },
    subHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 12,
      color:'#e80505'
    },
    paragraph: {    
        fontSize: 16,
        marginBottom: 12,
      },
      mapViewContainer:{
        backgroundColor:'white',
        marginVertical:10,
        marginHorizontal:8,
        padding:10,
        borderWidth:2,
        borderColor:'#e80505',
        borderRadius:10,
        height:350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    });
    