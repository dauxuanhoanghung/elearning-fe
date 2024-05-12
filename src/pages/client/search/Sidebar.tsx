// @ts-nocheck
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sidebar = (props) => {
  const {} = props;
  const onSubmit = () => {};
  const sortBy = { view: "view", createdAt: "createdAt", sold: "sold" };
  const handleSort = (sortBy) => {
    switch (sortBy) {
      case "view":
        console.log("view");
        break;
      case "createdAt":
        console.log("createdAt");
        break;
      case "sold":
        console.log("sold");
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen w-1/5 bg-gray-900/80 p-5">
      <div>
        <div>Price</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <Input
              type="number"
              placeholder="FROM $"
              className="w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
            />
            <div className="mx-2 mt-2 shrink-0">-</div>
            <Input
              type="number"
              placeholder="TO $"
              className="w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
            />
          </div>
          <div className="min-h-[1.25rem] text-center text-sm text-red-600"></div>
          <Button className="bg-orange hover:bg-orange flex w-full items-center justify-center p-2 text-sm uppercase text-white">
            Apply filter
          </Button>
        </form>
      </div>
      <div>
        <div>Sort by</div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-col-3 flex flex-wrap gap-1">
            <Button
              className="h-8 px-4 text-center text-sm capitalize"
              onClick={() => handleSort(sortBy.view)}
            >
              Phổ biến
            </Button>
            <Button
              className="h-8 px-4 text-center text-sm capitalize"
              onClick={() => handleSort(sortBy.createdAt)}
            >
              Recently
            </Button>
            <Button
              className="h-8 px-4 text-center text-sm capitalize"
              onClick={() => handleSort(sortBy.sold)}
            >
              Bán chạy
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Giá: Thấp đến cao</SelectItem>
                <SelectItem value="banana">Giá: Cao đến thấp</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
