import { useState } from "react";
import "./App.css";
import AddExpence from "./components/AddExpence";
import ExpencesCard from "./components/ExpencesCard";
// import { DUMMY_EXPENSES } from "./data/expenseData";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <Toaster
        position="top-center"
        containerStyle={{
          margin: "60px", // or padding: '40px'
        }}
        // reverseOrder={false}
      />
      <div className="flex flex-col gap-8 bg-background mx-auto p-4 sm:p-10 items-center justify-center w-full max-w-[800px]">
        <section>
          <h1 className="text-4xl font-bold text-primary">Expense Tracker</h1>
          <h2 className="font-medium text-xl text-secondary mt-2">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Track Your
            Expences easily!
          </h2>
        </section>
        <AddExpence />
        {/* {DUMMY_EXPENSES.map((data)=>( <ExpencesCard key={data.id} expenses={data}/>))} */}
      </div>
      <footer>
        <div className="w-full bg-primary text-white font-semibold p-6 flex justify-around">
          Designed and Developed By Mahesh 🕊️
        </div>
      </footer>
    </div>
  );
}

export default App;
