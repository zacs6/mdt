import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Unit } from "@/pages/dashboard";

export default function UnitsTable({ units }: { units: Unit[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Callsign</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.map((unit) => (
          <TableRow key={unit.id}>
            <TableCell className="font-medium">{unit.callsign}</TableCell>
            <TableCell>{unit.name}</TableCell>
            <TableCell>
              <Badge>{unit.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
