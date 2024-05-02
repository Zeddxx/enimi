interface Props {
    children: React.ReactNode
}

const ProtectedRoute = ({ children } : Props) => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto">
      {children}
    </section>
  );
};
export default ProtectedRoute;
