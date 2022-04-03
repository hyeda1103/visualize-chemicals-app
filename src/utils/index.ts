function getVOCsReportData() {
  const res = fetch("/data/2020_VOCs_data_385.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  return res.then(res => res.json())
} 

export default getVOCsReportData