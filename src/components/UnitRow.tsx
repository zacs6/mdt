export default function UnitRow({
    unitBadge,
    unitName,
    unitStatus,
    unitLocation,
    header,
}: {
    unitBadge?: string;
    unitName?: string;
    unitStatus?: string;
    unitLocation?: string;
    header?: boolean;
}) {
    if (header) {
        return (
            <div className="flex flex-row w-full bg-slate-700 rounded-sm px-2 py-1">
              <p className="w-1/6">Badge No.</p>
              <p className="w-2/6 ml-2">Name</p>
              <p className="w-1/6 ml-2">Status</p>
              <p className="w-2/6 ml-2">Location</p>
            </div>
        )
    }

    return (
        <div className="flex flex-row w-full p-2">
            <p className="w-1/6 border-r-[2px] border-slate-700">{unitBadge}</p>
            <p className="w-2/6 border-r-[2px] border-slate-700 ml-2">{unitName}</p>
            <p className="w-1/6 border-r-[2px] border-slate-700 ml-2"><span className="text-green-400 bg-green-900 px-3 py-1 rounded-sm">{unitStatus}</span></p>
            <p className="w-2/6 ml-2">{unitLocation}</p>
        </div>
    )
}