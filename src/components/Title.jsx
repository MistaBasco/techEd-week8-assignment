import { Link } from "react-router-dom";
import "/src/components/Title.css";

export default function Title() {
  return (
    <>
      <div className="Title glow">
        <Link className="Link" to={"/"}>
          <h1>
            Absolute Weeb Reviews<span className="copyright">©</span>
          </h1>
        </Link>
      </div>
    </>
  );
}
