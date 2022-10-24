import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactHeader from "./components/ContactHeader";
import ContactFooter from "./components/ContactFooter";

function App() {
  return (
    <div className="App">
      <ContactHeader />
      <ContactForm />
      <ContactFooter />
    </div>
  );
}

export default App;
