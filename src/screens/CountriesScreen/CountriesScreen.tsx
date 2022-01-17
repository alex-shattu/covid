import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Country } from 'components/Country';
import CustomIcon from 'components/CustomIcon';
import { Preloader } from 'components/Preloader';
import { mappings } from 'helpers';
import { RootStackParamList } from 'navigation/RootNavigator';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { SummaryResponse } from 'types';
import { useDebounce } from 'use-debounce';

type CountriesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Countries'>;
};

type Direction = 'asc' | 'desc';

const directions = { asc: 'desc', desc: 'asc' };
const iconByDirection = {
  asc: <CustomIcon.ArrowUpThin width={16} height={16} />,
  desc: <CustomIcon.ArrowDownThin width={16} height={16} />,
};
const sortByDirection = { asc: [-1, 1], desc: [1, -1] };

const CountriesScreen = ({ navigation }: CountriesScreenProps) => {
  const {
    data: countries,
    isFetching,
    refetch,
    isLoading,
    isRefetching,
  } = useCountries();
  const { top } = useSafeAreaInsets();

  const [sort, setSort] = useState<{
    type: 'Country' | 'TotalConfirmed' | 'TotalDeaths' | 'TotalRecovered';
    direction: Direction;
  }>({
    type: 'Country',
    direction: 'desc' as Direction,
  });

  const [search, setSearch] = useState('');

  const containerStyle = useMemo(
    () => ({
      paddingTop: top + 16,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
    }),
    [top],
  );

  const renderItem = useCallback(
    ({ item: country }) => <Country country={country} />,
    [],
  );

  const handleSort = useCallback(
    type => () => {
      setSort({
        type,
        direction: (directions[sort.direction] ?? 'desc') as Direction,
      });
    },
    [sort.direction],
  );

  const [debouncedSeach] = useDebounce(search, 700);

  const filteredData = useMemo(() => {
    const sortedData = countries?.sort((a, b) =>
      a[sort.type] > b[sort.type]
        ? sortByDirection[sort.direction][0]
        : a[sort.type] < b[sort.type]
        ? sortByDirection[sort.direction][1]
        : 0,
    );

    return debouncedSeach
      ? sortedData?.filter(country => country.Country.includes(debouncedSeach))
      : sortedData;
  }, [countries, debouncedSeach, sort.direction, sort.type]);

  return (
    <View style={containerStyle}>
      <View style={styles.topWrapper}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backWrapper}>
            <CustomIcon.ChevronLeft width={32} height={32} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#ccc"
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <View style={styles.sortWrapper}>
          <Pressable
            onPress={handleSort('Country')}
            style={styles.sortPressable}>
            <View style={styles.sortByCountry}>
              <Text style={styles.countryTotalNameText}>A-Z</Text>
              {sort.type === 'Country' ? (
                iconByDirection[sort.direction]
              ) : (
                <View style={styles.emptySortIcon} />
              )}
            </View>
          </Pressable>
          {mappings.map(mapping => (
            <Pressable
              key={mapping.name}
              onPress={handleSort(mapping.total)}
              style={styles.sortPressable}>
              <View style={styles.sortByValue}>
                <Text style={styles.countryTotalNameText}>{mapping.name}</Text>
                {sort.type === mapping.total ? (
                  iconByDirection[sort.direction]
                ) : (
                  <View style={styles.emptySortIcon} />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
        keyExtractor={({ CountryCode }) => CountryCode}
        data={filteredData ?? []}
        renderItem={renderItem}
        initialNumToRender={20}
      />
      <Preloader visible={isFetching && !isRefetching} />
    </View>
  );
};

function useCountries() {
  return useQuery('countries', async () => {
    const {
      data: { Countries },
    }: SummaryResponse = await axios.get('/summary');

    return Countries;
  });
}

export default CountriesScreen;

const styles = StyleSheet.create({
  emptySortIcon: {
    width: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
  },
  sortByValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  sortByCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 16,
  },
  flex: {
    flex: 1,
  },
  sortPressable: {
    paddingTop: 16,
    paddingBottom: 8,
    flex: 1,
  },
  sortWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topWrapper: {
    flexDirection: 'column',
    position: 'relative',
  },
  container: {
    backgroundColor: '#fff',
  },
  searchInput: {
    borderRadius: 5,
    height: 40,
    backgroundColor: '#f6f7f9',
    paddingHorizontal: 16,
    flex: 1,
  },
  backWrapper: {
    padding: 4,
    alignItems: 'center',
  },
  countryTotalNameText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000',
  },
});
