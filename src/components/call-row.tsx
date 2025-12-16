import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface Unit {
  badgeNo: string;
  name: string;
  status: string;
  location: string;
}

export default function UnitsTable({ units }: { units: Unit[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Badge No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.map((unit) => (
          <TableRow key={unit.badgeNo}>
            <TableCell className="font-medium">{unit.badgeNo}</TableCell>
            <TableCell>{unit.name}</TableCell>
            <TableCell>
              <Badge>{unit.status}</Badge>
            </TableCell>
            <TableCell>{unit.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
