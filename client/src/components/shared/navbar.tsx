import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="max-w-screen-2xl flex items-center h-16 justify-between w-full mx-auto px-4">
      <div className="">Enimi</div>

      <Button>Login</Button>
    </div>
  );
};
export default Navbar;
