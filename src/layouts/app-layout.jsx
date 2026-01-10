import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer"

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background justify-center align-center p-30 "></div> 
      <Header />
      <main >
       <Outlet />
      </main>
      <div className="mt-8">
        <Footer/>
        </div>
      
    </div>
  );
};

export default AppLayout;