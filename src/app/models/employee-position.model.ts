import { PositionsComponent } from './../positions/positions.component';
export interface EmployeePosition {
  id: number;
  name: string;
  position: string;
  parentId: number | null;
}
