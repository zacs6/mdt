import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Unit } from "@/types";
import { DEPARTMENT_TYPES } from "@/lib/constants";

function unitStyle(department: string) {
  if (DEPARTMENT_TYPES.Police.includes(department)) {
    return "bg-sky-700 text-white";
  } else if (DEPARTMENT_TYPES.FireEMS.includes(department)) {
    return "bg-red-800 text-white";
  }
  return "bg-gray-600 text-white";
}

function statusStyle(status: string) {
  switch (status) {
    case "Available":
      return "bg-green-700 text-white";
    case "Unavailable":
      return "bg-red-800 text-white";
    default:
      return "bg-gray-600 text-white";
  }
}

export default function UnitsTable({ units }: { units: Unit[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Callsign</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.map((unit) => (
          <TableRow key={unit.id} className="cursor-pointer">
            <TableCell className="font-medium">{unit.callsign}</TableCell>
            <TableCell>{unit.name}</TableCell>
            <TableCell>
              <Badge className={`p-3 ${unitStyle(unit.department)}`}>{unit.department}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={`p-3 ${statusStyle(unit.status)}`}>{unit.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
