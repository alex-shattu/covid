import { SummaryResponseGlobal } from 'types';

export default [
  {
    new: 'NewConfirmed' as keyof Pick<SummaryResponseGlobal, 'NewConfirmed'>,
    total: 'TotalConfirmed' as keyof Pick<
      SummaryResponseGlobal,
      'TotalConfirmed'
    >,
    name: 'Confirmed',
    colors: ['#f8f5ff', '#fff'],
    color: '#7a48e9',
    newColor: '#ede7fe',
  },
  {
    new: 'NewDeaths' as keyof Pick<SummaryResponseGlobal, 'NewDeaths'>,
    total: 'TotalDeaths' as keyof Pick<SummaryResponseGlobal, 'TotalDeaths'>,
    name: 'Deaths',
    colors: ['#fbf1f6', '#fff'],
    color: '#db5585',
    newColor: '#fce2eb',
  },
  {
    new: 'NewRecovered' as keyof Pick<SummaryResponseGlobal, 'NewRecovered'>,
    total: 'TotalRecovered' as keyof Pick<
      SummaryResponseGlobal,
      'TotalRecovered'
    >,
    name: 'Recovered',
    colors: ['#ebf6ec', '#fff'],
    color: '#33bd87',
    newColor: '#ddf8e0',
  },
];
