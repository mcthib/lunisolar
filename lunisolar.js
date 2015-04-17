// Min / max range years that we work with
var YEAR_MIN = 1901;
var YEAR_MAX = 2100;

// The number of milliseconds in a day (86400000)
var MS_PER_DAY = 60 * 60 * 24 * 1000;

// Map of leap years and the associated leap month (extra month in that year)
var LEAP_YEARS_AND_MONTHS =
{
  1903: 5, 1906: 4, 1909: 2, 1911: 6, 1914: 5, 1917: 2, 1919: 7, 1922: 5, 1925: 4, 1928: 2, 1930: 6,
  1933: 5, 1936: 3, 1938: 7, 1941: 6, 1944: 4, 1947: 2, 1949: 7, 1952: 5, 1955: 3, 1957: 8, 1960: 6,
  1963: 4, 1966: 3, 1968: 7, 1971: 5, 1974: 4, 1976: 8, 1979: 6, 1982: 4, 1984: 10, 1987: 6, 1990: 5,
  1993: 3, 1995: 8, 1998: 5, 2001: 4, 2004: 2, 2006: 7, 2009: 5, 2012: 4, 2014: 9, 2017: 6, 2020: 4,
  2023: 2, 2025: 6, 2028: 5, 2031: 3, 2033: 11, 2036: 6, 2039: 5, 2042: 2, 2044: 7, 2047: 5, 2050: 3,
  2052: 8, 2055: 6, 2058: 4, 2061: 3, 2063: 7, 2066: 5, 2069: 4, 2071: 8, 2074: 6, 2077: 4, 2080: 3,
  2082: 7, 2085: 5, 2088: 4, 2090: 8, 2093: 6, 2096: 4, 2099: 2 
};

// Duration of every month for every year in the range (13 months per leap year)
var MONTH_DURATIONS =
[
  [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29], [30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30],
  [29, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30], [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29],
  [30, 30, 29, 30, 30, 29, 29, 30, 29, 30, 29, 30], [29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [30, 29, 29, 30, 30, 29, 30, 29, 30, 30, 29, 30],
  [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30], [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30],
  [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30],
  [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 29], [30, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29],
  [30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29], [30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30, 30], [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30], [30, 29, 30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30], [29, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29, 29],
  [30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30], [29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29],
  [30, 29, 29, 30, 29, 30, 29, 30, 29, 30, 30, 30], [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 30],
  [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30], [29, 30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29],
  [30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29], [30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30],
  [29, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29, 29, 30], [29, 30, 29, 30, 30, 29, 30, 29, 30, 30, 29, 30],
  [29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29], [30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30, 30, 29],
  [30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29], [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30],
  [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29],
  [30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29], [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29, 30], [30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30],
  [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30], [30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30],
  [30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30], [29, 30, 30, 29, 30, 30, 29, 29, 30, 29, 30, 29],
  [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30], [29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
  [29, 30, 29, 29, 30, 30, 29, 30, 30, 29, 30, 29], [30, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30], [29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30],
  [30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 29], [30, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29],
  [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29],
  [30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29], [30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30],
  [29, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29], [30, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29],
  [30, 30, 29, 30, 30, 29, 29, 30, 29, 30, 29, 30], [29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30],
  [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30], [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30],
  [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30],
  [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 29], [30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29],
  [30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29], [30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30], [30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30], [30, 29, 30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30], [29, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29, 29],
  [30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 29], [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29],
  [30, 29, 29, 30, 29, 30, 29, 30, 29, 30, 30, 30], [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 30],
  [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30], [29, 30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29], [30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30],
  [29, 30, 30, 29, 30, 29, 30, 30, 29, 29, 30, 29, 30], [29, 30, 29, 30, 30, 29, 30, 29, 30, 30, 29, 29],
  [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29], [30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30, 29, 30],
  [30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29], [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29],
  [30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29],
  [30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30], [29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29, 30], [30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30],
  [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30], [30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30],
  [30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29], [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
  [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30], [29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
  [29, 30, 29, 29, 30, 29, 30, 30, 30, 29, 30, 29], [30, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30], [29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30],
  [30, 29, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30], [29, 30, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29],
  [30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29], [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 30, 29],
  [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29], [30, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29],
  [30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 30], [29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29],
  [29, 30, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30],
  [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30], [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30],
  [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29],
  [30, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 29], [30, 29, 30, 30, 29, 30, 29, 30, 30, 29, 30, 29],
  [29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30], [30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30], [30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30],
  [30, 29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30], [29, 30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29],
  [30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29], [29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29],
  [30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30, 30], [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 30],
  [29, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30], [29, 30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29], [30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30],
  [29, 30, 30, 29, 30, 29, 30, 30, 29, 29, 30, 29], [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 29],
  [30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 30, 29], [30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29],
  [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29], [30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29],
  [30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29],
  [30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30], [29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [30, 29, 30, 29, 29, 30, 30, 29, 30, 30, 29, 30],
  [29, 30, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29, 30], [29, 30, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30],
  [30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30], [30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30],
  [30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29], [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
  [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30], [29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29],
  [30, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29, 30, 29], [30, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30],
  [29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30], [30, 29, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 30],
  [29, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30], [29, 30, 30, 30, 29, 29, 30, 29, 30, 29, 29, 30, 30],
  [29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30],
  [29, 30, 29, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30], [29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29],
  [30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30], [29, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 30, 29],
  [30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29], [30, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29],
  [30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29], [30, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29],
  [29, 30, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29], [29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30],
  [29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29], [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 30, 29, 30],
  [30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30], [30, 30, 29, 30, 29, 29, 29, 30, 29, 30, 29, 30],
  [30, 30, 29, 30, 30, 29, 29, 30, 29, 29, 30, 29, 30], [30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30]
];

// Gregorian date of the first day of every year in the range. We could get by without it,
// this is a speed optimization.
var FIRST_DAY_OF_YEAR_MAP =
[
  new Date(1901,1,19), new Date(1902,1,8), new Date(1903,0,29), new Date(1904,1,16), new Date(1905,1,4),
  new Date(1906,0,25), new Date(1907,1,13), new Date(1908,1,2), new Date(1909,0,22), new Date(1910,1,10),
  new Date(1911,0,30), new Date(1912,1,18), new Date(1913,1,6), new Date(1914,0,26), new Date(1915,1,14),
  new Date(1916,1,3), new Date(1917,0,23), new Date(1918,1,11), new Date(1919,1,1), new Date(1920,1,20),
  new Date(1921,1,8), new Date(1922,0,28), new Date(1923,1,16), new Date(1924,1,5), new Date(1925,0,24),
  new Date(1926,1,13), new Date(1927,1,2), new Date(1928,0,23), new Date(1929,1,10), new Date(1930,0,30),
  new Date(1931,1,17), new Date(1932,1,6), new Date(1933,0,26), new Date(1934,1,14), new Date(1935,1,4),
  new Date(1936,0,24), new Date(1937,1,11), new Date(1938,0,31), new Date(1939,1,19), new Date(1940,1,8),
  new Date(1941,0,27), new Date(1942,1,15), new Date(1943,1,5), new Date(1944,0,25), new Date(1945,1,13),
  new Date(1946,1,2), new Date(1947,0,22), new Date(1948,1,10), new Date(1949,0,29), new Date(1950,1,17),
  new Date(1951,1,6), new Date(1952,0,27), new Date(1953,1,14), new Date(1954,1,3), new Date(1955,0,24),
  new Date(1956,1,12), new Date(1957,0,31), new Date(1958,1,18), new Date(1959,1,8), new Date(1960,0,28),
  new Date(1961,1,15), new Date(1962,1,5), new Date(1963,0,25), new Date(1964,1,13), new Date(1965,1,2),
  new Date(1966,0,21), new Date(1967,1,9), new Date(1968,0,30), new Date(1969,1,17), new Date(1970,1,6),
  new Date(1971,0,27), new Date(1972,1,15), new Date(1973,1,3), new Date(1974,0,23), new Date(1975,1,11),
  new Date(1976,0,31), new Date(1977,1,18), new Date(1978,1,7), new Date(1979,0,28), new Date(1980,1,16),
  new Date(1981,1,5), new Date(1982,0,25), new Date(1983,1,13), new Date(1984,1,2), new Date(1985,1,20),
  new Date(1986,1,9), new Date(1987,0,29), new Date(1988,1,17), new Date(1989,1,6), new Date(1990,0,27),
  new Date(1991,1,15), new Date(1992,1,4), new Date(1993,0,23), new Date(1994,1,10), new Date(1995,0,31),
  new Date(1996,1,19), new Date(1997,1,7), new Date(1998,0,28), new Date(1999,1,16), new Date(2000,1,5),
  new Date(2001,0,24), new Date(2002,1,12), new Date(2003,1,1), new Date(2004,0,22), new Date(2005,1,9),
  new Date(2006,0,29), new Date(2007,1,18), new Date(2008,1,7), new Date(2009,0,26), new Date(2010,1,14),
  new Date(2011,1,3), new Date(2012,0,23), new Date(2013,1,10), new Date(2014,0,31), new Date(2015,1,19),
  new Date(2016,1,8), new Date(2017,0,28), new Date(2018,1,16), new Date(2019,1,5), new Date(2020,0,25),
  new Date(2021,1,12), new Date(2022,1,1), new Date(2023,0,22), new Date(2024,1,10), new Date(2025,0,29),
  new Date(2026,1,17), new Date(2027,1,6), new Date(2028,0,26), new Date(2029,1,13), new Date(2030,1,3),
  new Date(2031,0,23), new Date(2032,1,11), new Date(2033,0,31), new Date(2034,1,19), new Date(2035,1,8),
  new Date(2036,0,28), new Date(2037,1,15), new Date(2038,1,4), new Date(2039,0,24), new Date(2040,1,12),
  new Date(2041,1,1), new Date(2042,0,22), new Date(2043,1,10), new Date(2044,0,30), new Date(2045,1,17),
  new Date(2046,1,6), new Date(2047,0,26), new Date(2048,1,14), new Date(2049,1,2), new Date(2050,0,23),
  new Date(2051,1,11), new Date(2052,1,1), new Date(2053,1,19), new Date(2054,1,8), new Date(2055,0,28),
  new Date(2056,1,15), new Date(2057,1,4), new Date(2058,0,24), new Date(2059,1,12), new Date(2060,1,2),
  new Date(2061,0,21), new Date(2062,1,9), new Date(2063,0,29), new Date(2064,1,17), new Date(2065,1,5),
  new Date(2066,0,26), new Date(2067,1,14), new Date(2068,1,3), new Date(2069,0,23), new Date(2070,1,11),
  new Date(2071,0,31), new Date(2072,1,19), new Date(2073,1,7), new Date(2074,0,27), new Date(2075,1,15),
  new Date(2076,1,5), new Date(2077,0,24), new Date(2078,1,12), new Date(2079,1,2), new Date(2080,0,22),
  new Date(2081,1,9), new Date(2082,0,29), new Date(2083,1,17), new Date(2084,1,6), new Date(2085,0,26),
  new Date(2086,1,14), new Date(2087,1,3), new Date(2088,0,24), new Date(2089,1,10), new Date(2090,0,30),
  new Date(2091,1,18), new Date(2092,1,7), new Date(2093,0,27), new Date(2094,1,15), new Date(2095,1,5),
  new Date(2096,0,25), new Date(2097,1,12), new Date(2098,1,1), new Date(2099,0,21), new Date(2100,1,9)
];

// Given a lunisolar year, returns whether is contains 13 months
function IsLeapYear(lunisolarYear)
{
  return (LEAP_YEARS_AND_MONTHS[lunisolarYear] != undefined);
}

// Given a lunisolar month and year, returns whether the month is leap (i.e. repeated)
function IsLeapMonth(lunisolarMonth, lunisolarYear)
{
  return(IsLeapYear(lunisolarYear) && (LEAP_YEARS_AND_MONTHS[lunisolarYear] == lunisolarMonth));
}

// Given a Lunisolar date, and whether the month is a leap month, return the corresponding Gregorian date
function GetGregorianFromLunisolar($lunisolarDate, useLeapMonth)
{
  // Year
  var lunisolarYear = $lunisolarDate.getFullYear();
  var isLeapYear = IsLeapYear(lunisolarYear);
  //console.log('Lunisolar year: ' + lunisolarYear + (isLeapYear ? " (leap)" : ""));
  
  // Month
  var lunisolarMonth = $lunisolarDate.getMonth() + 1;
  var isLeapMonth = IsLeapMonth(lunisolarMonth, lunisolarYear);
  useLeapMonth &= isLeapMonth;
  //console.log('Lunisolar month: ' + lunisolarMonth + (useLeapMonth ? " (leap)" : ""));

  // Adjust month for leap
  if (useLeapMonth || (isLeapYear && (lunisolarMonth > LEAP_YEARS_AND_MONTHS[lunisolarYear])))
  {
    lunisolarMonth++;
  }

  // Day
  var lunisolarDay = $lunisolarDate.getDate();
  //console.log('Lunisolar day: ' + lunisolarDay);

  // Use first day of year as base date, then add the number of milliseconds in a day
  // times the number of days to the chosen date from beginning of year
  var baseDate = FIRST_DAY_OF_YEAR_MAP[lunisolarYear - YEAR_MIN].valueOf();
  //console.log('First day of the year: ' + new Date(baseDate));
  for (var month = 1; month < lunisolarMonth; month++)
  {
    baseDate += MONTH_DURATIONS[lunisolarYear - YEAR_MIN][month - 1] * MS_PER_DAY;
    //console.log('First day of month ' + (month + 1) + ': ' + new Date(baseDate));
  }

  return new Date(baseDate + ((lunisolarDay - 1) * MS_PER_DAY));
}

// Given a Gregorian date, returns the Lunisolar equivalent in an array that has the date and
// whether the month is a leap month. Returns an associative array with 'date' and
// 'isLeapMonth' members.
function GetLunisolarFromGregorian($gregorianDate)
{
  var isLeapMonth = false;

  var gregorianYear = $gregorianDate.getFullYear();
  var gregorianMonth = $gregorianDate.getMonth();
  var gregorianDay = $gregorianDate.getDate();
  //console.log(gregorianYear + '-' + gregorianMonth + '-' + gregorianDay);

  var lunisolarYear = gregorianYear;
  var lunisolarMonth = 0;
  var lunisolarDay = 0;

  // First, find the anchor point in the date map (Jan is the same year for Gregorian and Lunisolar in our date range)
  var yearOffset = gregorianYear - YEAR_MIN;
  var anchor = FIRST_DAY_OF_YEAR_MAP[yearOffset];
  //console.log('Anchor point: ' + anchor);
  var delta = Math.round(($gregorianDate - anchor) / MS_PER_DAY);
  //console.log('Distance to target (days): ' + delta);
  
  if (delta != 0)
  {
    if (delta < 0)
    {
      lunisolarYear--;
      yearOffset--;
    }

    var dayCount = 0;
    lunisolarMonth = (delta > 0 ? 0 : MONTH_DURATIONS[yearOffset].length - 1);
    var monthDuration = MONTH_DURATIONS[yearOffset][lunisolarMonth];
    while (dayCount + monthDuration < Math.abs(delta))
    {
      //console.log((delta > 0 ? 'Advancing' : 'Retreating') + ' by: ' + monthDuration + ' days to skip lunisolar month: ' + lunisolarMonth + '/' + lunisolarYear);
      dayCount += monthDuration;
      lunisolarMonth += (delta > 0 ? 1 : -1);
      monthDuration = MONTH_DURATIONS[yearOffset][lunisolarMonth];
    }

    lunisolarDay = (delta > 0 ? 0 : monthDuration) + delta - dayCount + 1;

    // For a leap year, if the month is greater than the leap month, decrease month by 1
    if (IsLeapYear(lunisolarYear))
    {
      //console.log("Leap year");
      isLeapMonth = IsLeapMonth(lunisolarMonth, lunisolarYear);
      //console.log("Lunisolar month: " + lunisolarMonth + ", leap: " + LEAP_YEARS_AND_MONTHS[lunisolarYear]);
      if (lunisolarMonth >= LEAP_YEARS_AND_MONTHS[lunisolarYear])
      {
        lunisolarMonth--;
      }
    }
  }
  else // (delta == 0)
  {
    lunisolarYear = gregorianYear;
    lunisolarMonth = 1;
    lunisolarDay = 1;
    // No Jan leap months in our date range
    // isLeapMonth = false;
  }

  //console.log(new Date(lunisolarYear, lunisolarMonth, lunisolarDay));
  //console.log(lunisolarYear + '-' + lunisolarMonth + '-' + lunisolarDay);

  return { date: new Date(lunisolarYear, lunisolarMonth, lunisolarDay), isLeapMonth: isLeapMonth };
}

console.log('');
$lunisolarDate = new Date(2017, 5, 2);
console.log('Lunisolar date: ' + $lunisolarDate);
console.log('Gregorian date: ' + GetGregorianFromLunisolar($lunisolarDate, false));

console.log('');

$gregorianDate = new Date(1979, 6, 23);
console.log('Gregorian date: ' + $gregorianDate);
$lunisolar = GetLunisolarFromGregorian($gregorianDate);
console.log('Lunisolar date: ' + $lunisolar.date + ($lunisolar.isLeapMonth ? " (leap)" : ""));
console.log('');