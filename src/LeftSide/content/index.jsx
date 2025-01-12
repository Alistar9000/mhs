import AllData from "./alldata";

const LeftSideContent = () => {
    return ( <div className="grid" style={{gridTemplateRows:'6vh 30vh 30vh'}}>
        <div className="bg-white"></div>
        <AllData />
        <div></div>
    </div> );
}
 
export default LeftSideContent;