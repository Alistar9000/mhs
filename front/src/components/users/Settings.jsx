import { useEffect } from "react"
import { useCrumbs } from "../../store/store"
import { Home } from "lucide-react"

export default function Settings(){

    const {crumbs,setCrumbs} = useCrumbs()
    

    useEffect(()=>{
    if(crumbs.lenght == 0) return
   
    setCrumbs([
      {path:"/dashboard",
      label: <div className="flex items-center gap-1"><Home size={16} /> داشبورد</div>
    },
      {path:"/dashboard/settings",
      label: <div className="flex items-center gap-1"> تنظیمات</div>
    }
    ])

  },[])

    return <div className=""></div>
}