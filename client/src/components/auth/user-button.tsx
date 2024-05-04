// react imports
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// auth context
import { useAuth } from "@/context";

// lucide icons
import { Loader } from "lucide-react";

// shadcn components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// redux mutations
import { useLogoutMutation } from "@/redux/auth";

const UserButton = () => {
  const { user, isLoading } = useAuth();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      toast.promise(logout().unwrap(), {
        loading: "Signing out...",
        success: "Logged out successfull!",
        error: "something went wrong!",
      });
    } catch (error) {
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="">
        <span className="animate-spin">
          <Loader className="h-5 w-5" />
        </span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-8 w-8 rounded-full aspect-square overflow-hidden">
          <img
            src={user?.avatarUrl}
            alt="user avatar image"
            className="h-full w-full object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] secondary-font w-44" align="end">
        <div className="w-full px-2">
          <p className="text-lg font-medium truncate">{user?.username}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/watch-later">Your List</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
