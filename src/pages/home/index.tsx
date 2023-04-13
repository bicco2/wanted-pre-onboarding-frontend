import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>homepage</h1>
      <button onClick={() => navigate("/signup")}>사용해보기!</button>
    </div>
  );
}
