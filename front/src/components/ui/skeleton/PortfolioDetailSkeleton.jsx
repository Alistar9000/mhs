export default function PortfolioDetailSkeleton() {
  return (
    <div className="h-screen p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row  w-full sm:justify-between sm:items-center shadow-md rounded-xl p-6 bg-white">
        <div className=" sm:w-72 w-full   flex flex-col justify-center sm:items-start gap-2">
          <div className=" rounded-md sm:w-64 w-1/2 h-6 animate-pulse bg-gray-300"></div>
          <div className="flex flex-col w-1/2 sm:w-full sm:flex-row gap-2">
          <div className=" rounded-md sm:w-14 w-1/2 flex gap-2 h-6 animate-pulse bg-gray-300">
            </div>
            <span className=" rounded-md sm:rounded-xl sm:w-16 w-full h-6 animate-pulse bg-gray-300"></span>
          </div>
        </div>
        <div className=" sm:w-1/3 w-full h-full flex-col sm:flex-row flex gap-4 justify-between items-center">
          <div className="flex flex-col gap-2 w-full sm:w-auto justify-center sm:items-center">
            <div className=" sm:rounded-xl rounded-md w-16 h-6 animate-pulse bg-gray-300"></div>
            <div className="sm:rounded-xl rounded-md w-36 h-6 animate-pulse bg-gray-300"></div>
          </div>
          <div className="flex flex-col gap-2 justify-center w-full sm:w-auto sm:items-center">
            <div className="sm:rounded-xl rounded-md w-16 h-6 animate-pulse bg-gray-300"></div>
            <div className="  sm:rounded-xl rounded-md w-36 h-6 animate-pulse bg-gray-300"></div>
          </div>
         
        </div>
      </div>
      <div className="flex justify-between  w-full bg-white h-80 gap-2 p-6 rounded-xl shadow-md">
       
         
          <div className="w-full flex gap-6  h-full justify-between">
            <div className=" flex-1 flex-col flex w-full justify-center  gap-2 h-full">
                <div className="bg-gray-300 rounded-md h-8 animate-pulse w-20 mb-5 "></div>
                <div className="w-full flex gap-6">

                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                </div>
                <div className="w-full flex gap-6">

                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                </div>
                <div className="w-full flex gap-6">

                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                </div>
                <div className="w-full flex gap-6">

                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                </div>
             </div>  
             
              <div className="w-full flex flex-1  justify-center items-center">
                <div className="rounded-full  relative bg-gray-300 animate-pulse w-[34%] flex justify-center items-center h-full">
                    <div className="rounded-full absolute  bg-white h-[70%] w-[70%]"></div>
                </div>
              </div>
            </div>
          
       
      
      </div>
      <div className="w-full flex flex-col gap-2 rounded-xl bg-white h-96 shadow-md p-6">
       <div className="flex justify-between items-center">

       
        <div className="flex gap-2 w-28 h-6 items-center ">
           <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
            <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        </div>
        <div className="flex gap-2 h-6 w-36 items-center">

        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        </div>
        </div>
        <div className="w-full h-full  flex justify-center items-center">

        <div className="w-3/4 h-full rounded-md bg-gray-300  animate-pulse "></div>
        </div>
      </div>
    </div>
  );
}
