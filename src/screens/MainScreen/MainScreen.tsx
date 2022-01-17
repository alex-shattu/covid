import axios from 'axios';
import { Preloader } from 'components/Preloader';
import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useQuery } from 'react-query';
import { mappings } from 'helpers';
import { SummaryResponse } from 'types';
import { Country } from 'components/Country';
import { Card } from 'components/Card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  const { data, isFetching, refetch, isRefetching, isLoading } = useMain();

  const { top } = useSafeAreaInsets();

  const contentContainerStyle = useMemo(() => ({ paddingTop: top }), [top]);

  const handleSeeMore = useCallback(() => {
    navigation.navigate('Countries');
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isLoading} />
      }
      style={styles.container}
      contentContainerStyle={contentContainerStyle}>
      {mappings.map(mapping => (
        <Card
          key={mapping.name}
          colors={mapping.colors}
          newValue={String(data?.summary?.[mapping.new])}
          totalValue={data?.summary?.[mapping.total].toLocaleString('en-US')}
          color={mapping.color}
          newColor={mapping.newColor}
          name={mapping.name}
        />
      ))}
      {data?.countries.map(country => (
        <Country key={country.CountryCode} country={country} />
      ))}
      <Pressable style={styles.seeMoreWrapper} onPress={handleSeeMore}>
        <Text style={styles.seeMoreText}>See more</Text>
      </Pressable>
      <Preloader visible={isFetching && !isRefetching} />
    </ScrollView>
  );
};

function useMain() {
  return useQuery('summary', async () => {
    const {
      data: { Global: summary, Countries },
    }: SummaryResponse = await axios.get('/summary');

    return {
      summary,
      countries: Countries.sort((a, b) =>
        a.TotalConfirmed > b.TotalConfirmed
          ? -1
          : a.TotalConfirmed < b.TotalConfirmed
          ? 1
          : 0,
      ).slice(0, 5),
    };
  });
}

export default MainScreen;

const styles = StyleSheet.create({
  seeMoreText: {
    textAlign: 'center',
    color: '#000',
  },
  seeMoreWrapper: {
    paddingBottom: 40,
  },
  textName: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 8,
    color: '#000',
  },
  newWrapper: {
    padding: 10,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  textTotal: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 8,
    color: '#000',
  },
  textCountry: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  gradient: {
    width: '100%',
    backgroundColor: '#f8f5ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  textNew: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
