import { useAuth } from "@/context";
import { Pen } from "lucide-react";

const UserAvatar = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="aspect-square group h-32 w-32 absolute cursor-pointer left-1/2 -translate-x-1/2 md:left-4 md:-translate-x-0 -bottom-16">
        <img
          src={user?.avatarUrl}
          alt="user avatar image"
          className="h-full w-full group-hover:brightness-50 duration-200 object-cover overflow-hidden rounded-full"
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-1.5 duration-300 group-hover:opacity-100 opacity-0 rounded-full">
          <Pen className="h-5 w-5" />
        </span>
      </div>
      {/* user information */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 md:left-4 md:-translate-x-0">
        <h1 className="text-2xl text-center lg:text-start mx-auto">
          {user?.username}
        </h1>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>
    </>
  );
};
export default UserAvatar;
