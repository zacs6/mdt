export default function ProfileCard({
    name,
    gender,
    licenses,
}: {
    name: string;
    gender: string;
    licenses: string;
}) {
    return (
        <div className="bg-slate-800 hover:bg-slate-700 cursor-pointer border-2 border-slate-700 rounded-sm p-2 mb-2 transition-colors">
          <p>{name}</p>
          <p>{gender}</p>
          <p>{licenses}</p>
        </div>
    )
}