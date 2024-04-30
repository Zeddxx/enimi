import { useAuth } from "@/context";

const Profile = () => {
  const { user } = useAuth();
  return (
    <section className="w-full min-h-[calc(100dvh-80px)]">
      <div className="max-w-screen-2xl mx-auto h-[40vw] max-h-72 min-h-44 min-w-full bg-muted relative">
        <div className="aspect-square h-32 w-32 overflow-hidden rounded-full absolute left-1/2 -translate-x-1/2 md:left-4 md:-translate-x-0 -bottom-16">
          <img
            src={user?.avatarUrl}
            alt="user avatar image"
            className="h-full w-full object-cover"
          />
        </div>
        {/* user information */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 md:left-4 md:-translate-x-0">
          <h1 className="text-2xl text-center lg:text-start mx-auto">{user?.username}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
    </section>
  );
};
export default Profile;
