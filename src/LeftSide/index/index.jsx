import Account from "../account";
import LeftSideContent from "../content";
import "./index.css";

const LeftSide = () => {
  return (
    <div style={{ display: "grid", gridTemplateRows: "8vh 92vh" }}>
      <Account />
      <LeftSideContent />
    </div>
  );
};

export default LeftSide;
