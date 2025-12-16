import {Siren, Flame, Ambulance} from "lucide-react"

const unitIcons = {
    "Police": {icon: <Siren />, bg: "bg-blue-400", text: "text-slate-900"},
    "EMS": {icon: <Ambulance />, bg: "bg-red-400", text: "text-red-900"},
    "Fire": {icon: <Flame />, bg: "bg-orange-400", text: "text-orange-900"},
}

export default function CallCard({
    callCode,
    callType,
    callCreated,
    callLocation,
    callUnits,
}: {
    callCode: string;
    callType: string;
    callCreated: string;
    callLocation: string;
    callUnits: {
        type: string;
        badge: string;
        name: string;
        status: string;
        location: string;
    }[];
}) {
    return (
        <div className="flex flex-col h-34 bg-slate-700 rounded-sm p-2 justify-between">
            <div className="flex flex-row justify-between">
                <p className="text-sm text-slate-400">{callCode}</p>
                <p className="text-sm text-slate-400">{callCreated}</p>
            </div>
            <p className="text-lg font-semibold">{callType}</p>
            <p>{callLocation}</p>
            <div className="flex flex-row gap-2">
                {callUnits.map((unit) => {
                    return (
                        <div key={unit.badge} className={`flex flex-row items-center gap-2 px-2 py-1 rounded-sm text-sm ${unitIcons[unit.type as keyof typeof unitIcons].bg} ${unitIcons[unit.type as keyof typeof unitIcons].text}`}>
                            {unitIcons[unit.type as keyof typeof unitIcons].icon}
                            {unit.badge}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}