import axios from 'axios';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from 'react-query';
import { subDays } from 'date-fns';
import { LineChart } from 'react-native-svg-charts';
import { WorldCountryResponse } from 'types';

type CardProps = {
  colors: string[];
  newColor: string;
  color: string;
  newValue: string | undefined;
  totalValue: string | undefined;
  name: string;
};

const contentInset = { top: 20, bottom: 20 };

const Card = ({
  colors,
  newColor,
  color,
  newValue,
  totalValue,
  name,
}: CardProps) => {
  const { data } = useWorldGraph({ name });

  return (
    <LinearGradient colors={colors} style={styles.gradient}>
      <View style={styles.values}>
        <View style={[{ backgroundColor: newColor }, styles.newWrapper]}>
          <Text style={[{ color }, styles.textNew]}>+{newValue}</Text>
        </View>
        <Text style={[{ color }, styles.textTotal]}>{totalValue}</Text>
        <Text style={styles.textName}>{name}</Text>
      </View>
      <LineChart
        style={styles.chart}
        data={data ?? []}
        svg={{ stroke: color, strokeWidth: 3 }}
        contentInset={contentInset}
        animate
      />
    </LinearGradient>
  );
};

function useWorldGraph({ name }: { name: string }) {
  return useQuery('world' + name, async () => {
    const { data }: { data: WorldCountryResponse[] } = await axios.get(
      '/world',
      {
        params: {
          to: new Date().toISOString(),
          from: subDays(new Date(), 30).toISOString(),
        },
      },
    );

    return data
      .sort((b, a) => (a.Date > b.Date ? -1 : a.Date < b.Date ? 1 : 0))
      .reduce<number[]>(
        (prev, curr) => [
          ...prev,
          +curr[('Total' + name) as keyof WorldCountryResponse],
        ],
        [],
      );
  });
}

export default memo(Card);

const styles = StyleSheet.create({
  values: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
  textName: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 8,
  },
  textTotal: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 8,
  },
  textCountry: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  gradient: {
    width: '100%',
    backgroundColor: '#f8f5ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  textNew: {
    fontSize: 16,
    fontWeight: '600',
  },
  newWrapper: {
    padding: 10,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
});
