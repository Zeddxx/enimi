// react imports
import React from "react";

// shadcn components imports...
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// lucide icons imports
import { Search } from "lucide-react";

// utility functions imports...
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/use-debounce";
import SearchSuggestions from "../search/search-suggestions";
import { useLocation } from "react-router-dom";

const SearchModal = () => {
  const [query, setQuery] = React.useState<string>("");
  const [debouncedValue, setDebouncedValue] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { pathname } = useLocation();

  //debounce function
  const search = useDebounce((value: string) => {
    setDebouncedValue(value);
  }, 500);

  // SENDING TO SEARCH ROUTE WITH THE QUERY
  const handleSearch = () => {
    const constructedURI = query.split(" ").join("-");
    window.location.assign(`/search?a=${constructedURI}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    search(value);
  };

  const handleClose = () => {
    setQuery("");
    setDebouncedValue("");
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);
  return (
    <div>
      <Dialog onOpenChange={handleClose} open={isOpen}>
        <DialogTrigger
          onClick={() => setIsOpen(true)}
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <Search className="h-5 w-5" />
        </DialogTrigger>
        <DialogContent className="border-muted">
          <DialogHeader>
            <DialogTitle>Search Anime</DialogTitle>
            <DialogDescription>
              Search your favorite anime by there title.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onChange={handleChange}
              placeholder="Search Anime..."
              value={query}
            />
          </div>
          <DialogFooter className="w-full">
            <Button
              onClick={handleSearch}
              disabled={query.length < 4}
              variant="secondary"
              className="w-full font-logo tracking-wide text-lg"
            >
              Search <Search className="ml-2" />
            </Button>
          </DialogFooter>

          {debouncedValue.length > 2 && (
            <SearchSuggestions setIsOpen={setIsOpen} value={debouncedValue} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SearchModal;
