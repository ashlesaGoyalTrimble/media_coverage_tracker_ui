import FormComponent from "./FormComponent";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar appName="Media Coverage Tracker" />
      <div style={{ padding: '20px' }}>
        <FormComponent />
      </div>
    </div>
  );
};

export default App;
