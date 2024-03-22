import { useQuery } from "@tanstack/react-query";

const SearchCoursePage = () => {
  const {
    isLoading,
    data: tags,
    error,
  } = useQuery({
    queryKey: ["search", "tags"],
    queryFn: async () => {
      const res = await courseService.getAllTags();
      return res.data;
    },
    initialData: [],
    staleTime: 300000,
  });
  return <></>;
};

export default SearchCoursePage;
