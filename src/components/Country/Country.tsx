import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { abbreviateNumber } from 'js-abbreviation-number';
import { mappings } from 'helpers';
import { SummaryResponseCountry } from 'types';

const Country = ({ country }: { country: SummaryResponseCountry }) => {
  return (
    <View key={country.Slug} style={styles.countryTotalWrapper}>
      <View style={styles.flagWrapper}>
        <CountryFlag
          isoCode={country.CountryCode}
          size={30}
          style={styles.countryFlag}
        />
        <Text
          textBreakStrategy="simple"
          numberOfLines={1}
          style={styles.countryName}>
          {country.Country}
        </Text>
      </View>
      {mappings.map(mapping => (
        <View key={mapping.name} style={styles.countryTotal}>
          <Text style={[{ color: mapping.color }, styles.coutryTotalValueText]}>
            {abbreviateNumber(country[mapping.total], 1)}
          </Text>
          <Text style={styles.countryTotalNameText}>{mapping.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default memo(Country);

const styles = StyleSheet.create({
  flagWrapper: {
    flex: 1,
  },
  countryFlag: {
    borderRadius: 5,
  },
  countryTotalWrapper: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  countryTotal: {
    flex: 1,
  },
  countryTotalNameText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    paddingTop: 8,
    color: '#000',
  },
  countryName: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 8,
    fontWeight: 'bold',
    paddingTop: 4,
    color: '#000',
  },
  coutryTotalValueText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
