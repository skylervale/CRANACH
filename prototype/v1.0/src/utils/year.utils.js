let yearAmounts = {};
const step = 1;

export default {
  increaseYearAmountFor(year) {
    if (yearAmounts[year]) {
      yearAmounts[year] += step;
    } else {
      yearAmounts[year] = step;
    }
  },
  getYearAmountFor(year) {
    return yearAmounts[year] || 0;
  },
  getHighestValue(from, to) {
    return Object.keys(yearAmounts).reduce((acc, current) => {
      const year = new Date(`${current}-01-01`);
      const isBetween = from.getTime() <= year.getTime() && to.getTime() >= year.getTime();

      if (isBetween && yearAmounts[current] > acc) return yearAmounts[current];
      return acc;
    }, 0);
  },
  resetYearAmount() {
    yearAmounts = {};
  },
};
