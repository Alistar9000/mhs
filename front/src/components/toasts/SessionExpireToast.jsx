import toast from "react-hot-toast";

export default function SessionExpireToast({ t }) {
  return (
    <div
      className="bg-white p-4 rounded-md cursor-pointer shadow-md"
      onClick={() => toast.dismiss(t.id)}
    >
      ❌ session شما منقضی شده ، لطفا دوباره وارد شوید.
    </div>
  );
}
