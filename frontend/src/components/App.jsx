import FormComponent from "./FormComponent";
import Todos from "./todos/Todos";
import "./App.css";

// Header, footer, sign up system, private routing, env var usage (for mongo and host, port selection)
// cleaner code ( by making generic components/functions and using them to receive/post data and form(s) )
// don't hard code the strings and use something like react-i18n or something like that
// visually better representation (design an own off-canvas edit form and better bootstrap table usage)
// auto refresh functions for added and deleted tasks or todos
// more secure data post and get methods (right now you can actually post deficient data which would give errors and crash the website)
// a generic axios function with a good structure and better error, loading state handling
// nicer logos and maybe display svg's in a better way at the weather component
// folder structure is always arguable of course
// maybe better naming the current state of naming is sloppy
// there are some code duplications but this can be considered within the second point
// some of the backend functions are fragile they can be better
// when fetching all the todos from the mongoDB a generator function (with yield) can be used (not hundred percent sure)
// some of the backend urls and functions can be put together (like instead of app.get('')..., @app.route('',methods = ['POST', 'GET']))
// for the database we could and should have required values for todos and arrange the gets and posts accordingly
// a delete todo auto refresh method is definitely necessary because now you can click to delete several times without any visible result

const App = () => {
  const data = {
    event: ["Mowing", "Fertilisation", "Irrigation", " Aeration"],
    person: ["John", "Tom ", "Tony"],
    pitch: ["Pitch-1", "Pitch-2", "Pitch-3"],
  };
  return (
    <div className="hero">
      <h1>
        TODO <span className="app-icon">App</span>
      </h1>

      <FormComponent data={data} />
      <Todos data={data} />
      <br />
      <a className="credentials" href="https://dryicons.com/free-icons/refresh">
        Refresh icon by Dryicons
      </a>
    </div>
  );
};

export default App;
