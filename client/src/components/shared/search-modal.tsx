import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const SearchModal = () => {
  const [query, setQuery] = useState<string>("");

  // SENDING TO SEARCH ROUTE WITH THE QUERY
  const handleSearch = () => {
    const constructedURI = query.split(" ").join("-");
    window.location.assign(`/search?a=${constructedURI}`);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button size="icon" variant="outline">
            <Search className="text-primary h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Anime</DialogTitle>
            <DialogDescription>
              Search your favorite anime if can find then try another site.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Anime..."
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SearchModal;
