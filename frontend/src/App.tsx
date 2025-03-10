import Form from "./Form";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="sm: w-[90%] md:w-1/2 mx-auto">
      <Form />
      {<Toaster />}
    </div>
  );
}

export default App;
