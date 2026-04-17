import { Lamp } from "lucide-react";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        <LandingPage />
      </main>
    </>
  );
}

export default App;
