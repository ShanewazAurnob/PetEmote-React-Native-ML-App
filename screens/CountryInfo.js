import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const CountryQuery = gql`
  query CountryQuery {
    countries {
      name
      capital
      currency
      code
    }
  }
`;

const CountryInfo = () => {
  const { data, loading } = useQuery(CountryQuery);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!countries || countries.length === 0) return <Text style={styles.errorText}>No countries found.</Text>;

  // Calculate the indices of the countries to display on the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  // Change page
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {currentCountries.map((country, index) => (
          <View key={index} style={styles.countryContainer}>
            <Text style={styles.serialNo}>{index + indexOfFirstCountry + 1}.</Text>
            <Text style={styles.heading}>
              Country Name: <Text style={styles.text}>{country.name}</Text>
            </Text>
            <Text style={styles.heading}>
              Capital: <Text style={styles.text}>{country.capital}</Text>
            </Text>
            <Text style={styles.heading}>
              Currency: <Text style={styles.text}>{country.currency}</Text>
            </Text>
            <Text style={styles.heading}>
              Code: <Text style={styles.text}>{country.code}</Text>
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Buttons */}
      <View style={styles.paginationContainer}>
        <Button
          title="Previous"
          onPress={prevPage}
          disabled={currentPage === 1}
          color="#007BFF"
        />
        <Text style={styles.pageText}>Page {currentPage}</Text>
        <Button
          title="Next"
          onPress={nextPage}
          disabled={indexOfLastCountry >= countries.length}
          color="#007BFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for better contrast
  },
  container: {
    padding: 20,
    paddingBottom: 100, // Added space for pagination buttons
  },
  countryContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for each country box
    elevation: 2, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serialNo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF', // Color for serial number
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Darker color for headings
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal', // Make the country name text normal weight
    color: '#555', // Slightly lighter color for text
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Background for pagination
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  pageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: 'red', // Red color for error message
  },
});

export default CountryInfo;
