import {  Outlet, } from "react-router-dom";
import Header from "../components/Header";

const Protected = () => {


  return (
    <section className="flex flex-col h-dvh relative">
      
      <Header />
      <div
        style={{ height: `calc(100dvh - 4.375rem)` }}
        className="flex-1 "
      >
        
        <main className="w-full h-full overflow-y-auto lg:p-10 md:p-5 p-3">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Protected;
