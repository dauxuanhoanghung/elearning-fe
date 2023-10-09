import { ResponsiveBar } from "@nivo/bar";

const MyBarChart = ({ courseWithMostLecture, courseWithMostRegistration }) => {
  const mergedData = courseWithMostLecture.map(lecture => {
    const registration = courseWithMostRegistration.find(reg => reg.id === lecture.id);
    return {
      id: lecture.id,
      name: lecture.name,
      countLectures: lecture.countLectures,
      countRegistration: registration ? registration.countRegistration : 0
    };
  });
  const data = mergedData.map(item => ({
    id: item.name,
    lectures: item.countLectures,
    registrations: item.countRegistration,
  })) || []
  console.log(data);
  return (
    <ResponsiveBar
      data={data}
      keys={["lectures", "registrations"]}
      indexBy="id"
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      padding={0.2}
      colors={{ scheme: 'nivo' }}
      enableLabel={false}
      groupMode="grouped"
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "COURSE",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "COUNT",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top-center",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default MyBarChart;