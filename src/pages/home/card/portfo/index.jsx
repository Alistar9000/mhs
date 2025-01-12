const CardTable = ({ tabledata,show }) => {
  
    return (
      <div className={` ${!show ? 'opacity-0 hidden' :'h-full mt-4 border-b mb-1'}  transition-all duration-300`}>
        <table className="table    rounded-md w-full">
          <thead className=" text-gray-400 bg-zinc-100" style={{borderColor:"var(--project-color)"}}>
            <tr>
              <th className="text-start px-2">نماد</th>
              <th className="text-start  px-1">تعداد</th>
              <th className="text-start ">آخرین</th>
              <th className="text-start ">درصد</th>
              <th className="text-start px-4 ">ارزش</th>
            </tr>
          </thead>
          <tbody>
            {[...tabledata].map((symbol, index) => (
              <tr
                className={
                  index != tabledata.length - 1
                    ? "border-b  border-stone-300"
                    : ""
                }
              >
                <td className="py-2 text-stone-600">{symbol.name}</td>
                <td className="text-stone-600">{symbol.count}</td>
                <td className="text-stone-600">{symbol.close}</td>
                <td
                  className={
                    symbol.percent >= 0 ? "text-green-400" : "text-rose-500"
                  }
                >
                  {Math.abs(symbol.percent)}
                </td>
                <td className="text-stone-600">{symbol.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CardTable;