import { Trash2 } from "lucide-react";

export default function NotFoundPage(){
    return <div className="fixed inset-0 flex justify-center items-center">
        <div className="flex gap-2 flex-col">

        <Trash2 size={50} className="text-gray-400" />
        <p className="text-gray-400 font-bold">صفحه مورد نظر یافت نشد!</p>
        </div>
    </div>
}