// @ts-nocheck
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

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

const Sidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceFilter, setPriceFilter] = useState({
    from: "",
    to: "",
  });

  const handlePriceFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    if (value === "") setPriceFilter((prev) => ({ ...prev, [name]: value }));
    if (Number(value) < 0) return;
    setPriceFilter((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleOnApplyFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const params = Object.fromEntries(searchParams);
    const { from, to } = priceFilter;

    const newParams: Record<string, string> = { ...params };
    if (!isNaN(from)) newParams.from = from;
    else delete newParams.from;

    if (!isNaN(to)) newParams.to = to;
    else delete newParams.to;

    setSearchParams(newParams);
  };

  const getSortValue = () => {
    const sortBy = searchParams.get("sortBy");
    const orderBy = searchParams.get("orderBy");
    if (sortBy === "price" && (orderBy === "asc" || !orderBy)) return "1";
    if (sortBy === "price" && orderBy === "desc") return "2";
    if (sortBy === "recently") return "3";
    if (sortBy === "registration") return "4";
    return "0";
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case "1":
        setSearchParams({
          ...Object.fromEntries(searchParams),
          sortBy: "price",
          orderBy: "asc",
        });
        break;
      case "2":
        setSearchParams({
          ...Object.fromEntries(searchParams),
          sortBy: "price",
          orderBy: "desc",
        });
        break;
      case "3":
        setSearchParams({
          ...Object.fromEntries(searchParams),
          sortBy: "recently",
        });
        break;
      case "4":
        setSearchParams({
          ...Object.fromEntries(searchParams),
          sortBy: "registration",
        });
        break;
      case "0":
        const newSearchParams = Object.fromEntries(searchParams);
        const { sortBy, orderBy } = newSearchParams;
        if (sortBy) delete newSearchParams.sortBy;
        if (orderBy) delete newSearchParams.orderBy;
        setSearchParams(newSearchParams);
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full w-full bg-gray-900/80 p-5">
      <div>
        <div className="mb-2 text-lg">Price</div>
        <div className="mt-2">
          <div className="flex flex-wrap items-start gap-2">
            <Input
              name="from"
              type="number"
              placeholder="FROM $"
              className="w-full rounded-sm border-none p-2 outline-none"
              value={priceFilter.from}
              onChange={handlePriceFilterChange}
            />
            <Input
              name="to"
              type="number"
              placeholder="TO $"
              className="w-full rounded-sm border-none p-2 outline-none"
              value={priceFilter.to}
              onChange={handlePriceFilterChange}
            />
          </div>
          <div className="min-h-[1.25rem] text-center text-sm text-red-600"></div>
          <Button
            onClick={handleOnApplyFilter}
            className="flex w-full items-center justify-center p-2 text-sm uppercase text-white"
          >
            Apply filter
          </Button>
        </div>
      </div>
      <div className="my-4">
        <div className="mb-2 text-lg">Sort by</div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={getSortValue()} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort value" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">Price from low to high</SelectItem>
                <SelectItem value="2">Price from high to low</SelectItem>
                <SelectItem value="3">Most Recently</SelectItem>
                <SelectItem value="4">Most Registration</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
