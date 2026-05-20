import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Background */}
      <div className="grid-background flex justify-center items-center p-32"></div>

      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
};

export default AppLayout;