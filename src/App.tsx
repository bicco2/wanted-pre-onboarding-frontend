import { useRoutes } from "react-router-dom";
import { routes } from "./Routes";

function App() {
  const elem = useRoutes(routes);
  return <>{elem}</>;
}
export default App;
