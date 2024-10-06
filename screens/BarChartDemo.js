import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

const BarChartDemo = () => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const { predictions } = route.params || { predictions: [0, 0, 0] };

  const barCharData = {
    labels: ['Angry', 'Happy', 'Other', 'Sad'],
    datasets: [
      {
        data: [
          parseFloat(predictions[0]).toFixed(2),
          parseFloat(predictions[1]).toFixed(2),
          parseFloat(predictions[2]).toFixed(2),
          parseFloat(predictions[3]).toFixed(2),
        ],
        colors: [
          (opacity = 1) => '#FF5959', // Red for Angry
          (opacity = 1) => '#FFD700', // Yellow for Happy
          (opacity = 1) => '#87CEFA', // Light Blue for Other
          (opacity = 1) => '#4682B4', // Steel Blue for Sad
        ],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pet Detection Summary</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.label}>Detection Date and Time: </Text>
          {new Date().toLocaleString()}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>App Name: </Text>
          Pet Detection App
        </Text>
      </View>

      <Text style={styles.chartTitle}>Percentage of Emotion Detection</Text>
      <BarChart
        data={barCharData}
        yAxisSuffix="%"
        width={width - 40} // Adds more padding for responsiveness
        height={350}
        chartConfig={{
          backgroundGradientFrom: '#fffcf2',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#fffcf2',
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Vibrant pink
          barPercentage: 0.6,
          fillShadowGradient: '#FF6384', // Matching pink
          fillShadowGradientOpacity: 0.9,
          decimalPlaces: 1,
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: '#e3e3e3',
            strokeDasharray: '0',
          },
          propsForLabels: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#424242',
          },
        }}
        style={styles.chartStyle}
        showValuesOnTopOfBars
        withInnerLines={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#424242',
    marginVertical: 20,
    textAlign: 'center',
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 16,
    borderColor: '#FF6384',
    borderWidth: 1,
  },
});

export default BarChartDemo;
