import LecturerCard from "./LecturerCard";

const TopLecturer = (props) => {
  const { isError, isLoading, data } = props;
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching lecturers</div>;

  return (
    <article
      data-role="lecturer-container"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
    >
      {data.map((lecturer, idx) => (
        <LecturerCard key={idx} lecturer={lecturer} />
      ))}
    </article>
  );
};

export default TopLecturer;
