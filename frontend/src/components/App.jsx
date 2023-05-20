import FormComponent from "./FormComponent";
import Todos from "./Todos";
import "./App.css";

const App = () => {
  const data = {
    event: ["Mowing", "Fertilisation", "Irrigation", " Aeration"],
    person: ["John", "Tom ", "Tony"],
    pitch: ["Pitch-1", "Pitch-2", "Pitch-3"],
  };
  return (
    <div className="hero">
      <h1>
        TODO <span>App</span>
      </h1>

      <FormComponent data={data} />
      <Todos data={data} />
    </div>
  );
};

export default App;
