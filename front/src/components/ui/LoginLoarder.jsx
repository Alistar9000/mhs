export default function LoginLoader({borderColor}) {
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop:blur-sm z-50">
    <div className={`w-5 h-5 border-[3px] ${borderColor} border-t-white border-r-white rounded-full animate-spin`}></div>
    // </div>
  );
}
