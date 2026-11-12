export default function SymbolSkeleton() {
  return (
    <div className="h-screen p-6 flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div className="bg-white shadow-md w-72  rounded-xl flex flex-col justify-center items-start gap-2 p-4">
          <div className=" rounded-md w-2/3 h-6 animate-pulse bg-gray-300"></div>
          <div className=" rounded-md w-[90%] h-6 animate-pulse bg-gray-300"></div>
        </div>
        <div className="bg-white p-4 w-40 h-2/3 flex justify-center  rounded-xl shadow-md items-center">
          <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        </div>
      </div>
      <div className="flex w-full h-80 gap-6">
        <div className="flex-[2] flex flex-col  p-6 shadow-md  rounded-xl bg-white">
          <div className="bg-gray-300 rounded-md h-8 animate-pulse w-40 mb-5 "></div>
          <div className="w-full flex  h-full justify-end">
            <div className="w-3/4 flex justify-between gap-4 h-full">
              <div className="flex flex-1 flex-col justify-center  gap-2">
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
                <div className="bg-gray-300 rounded-md h-6 animate-pulse w-24"></div>
              </div>
              <div className="w-full flex  justify-center items-center">
                <div className="rounded-full  relative bg-gray-300 animate-pulse w-[54%] flex justify-center items-center h-full">
                    <div className="rounded-full absolute  bg-white h-[70%] w-[70%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 shadow-md flex flex-col gap-2  rounded-xl bg-white">
             <div className="bg-gray-300 animate-pulse rounded-md h-7 w-40"></div>
             <div className="bg-gray-300 animate-pulse rounded-md h-7 w-60"></div>
             <div className="bg-gray-300 animate-pulse rounded-md h-7 w-44"></div>
             <div className="bg-gray-300 animate-pulse rounded-md h-7 w-20"></div>
        </div>
      </div>
      <div className="w-full rounded-xl bg-white grid gap-6 md:grid-cols-4 shadow-md h-20 p-6">
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
        <div className="rounded-md bg-gray-300 h-full w-full animate-pulse "></div>
      </div>
    </div>
  );
}
