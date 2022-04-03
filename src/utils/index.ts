export function getVOCsReportData() {
  const res = fetch("/data/2020_VOCs_data_385.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  return res.then(res => res.json())
}

export function getTermData() {
  const res = fetch("/data/Terminology.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  return res.then(res => res.json())
}

export function Mean(ArrayOfNum: Array<number>) {
  const mean = ArrayOfNum.reduce((acc, curr, i, { length }) => {
    return i === length - 1 ? (acc + curr) / length : acc + curr;
  }, 0)
    .toFixed(2);
  return mean
}

export function Median(ArrayOfNum: Array<number>) {
  const length = ArrayOfNum.length;
  const median = length !== 1
    ? (
        (ArrayOfNum[Math.floor(length / 2)] +
          ArrayOfNum[Math.ceil(length / 2)]) /
        2
      ).toFixed(2)
    : ArrayOfNum[0].toFixed(2);
  return median
}

export function SD(ArrayOfNum: Array<number>, mean: string) {
  const SD = Math.sqrt(
    ArrayOfNum
      .map((x) => Math.pow(x - Number(mean), 2))
      .reduce((acc, curr, i, { length }) => {
        return i === length - 1 ? (acc + curr) / length : acc + curr;
      }, 0)
  ).toFixed(2);
  return SD
}

export function Min(ArrayOfNum: Array<number>) {
  const Min = Math.min(...ArrayOfNum).toFixed(2);
  return Min
}

export function Max(ArrayOfNum: Array<number>) {
  const Max = Math.max(...ArrayOfNum).toFixed(2);
  return Max
}