import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { EmployeePosition } from '../models/employee-position.model';
import { EmployeePositionService } from '../services/employee-position.service';

export class GetAllPositions {
  static readonly type = '[EmployeePosition] Get All Positions';
}

export class UpdatePosition {
  static readonly type = '[EmployeePosition] Update Position';
  constructor(public payload: EmployeePosition) {}
}

export class DeletePosition {
  static readonly type = '[EmployeePosition] Delete Position';
  constructor(public id: number) {}
}

@State<EmployeePosition[]>({
  name: 'employeePositions',
  defaults: []
})
export class EmployeePositionState {
  constructor(private positionService: EmployeePositionService) {}

  @Selector()
  static getAllEmployeePositions(state: EmployeePosition[]): EmployeePosition[] {
    return state;
  }

  @Action(GetAllPositions)
  getAll(ctx: StateContext<EmployeePosition[]>) {
    return this.positionService.getAllPositions().pipe(
      tap((positions) => {
        ctx.setState(positions);
      })
    );
  }

  @Action(UpdatePosition)
  update(ctx: StateContext<EmployeePosition[]>, action: UpdatePosition) {
    return this.positionService.updatePosition(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedPositions = state.map((pos) =>
          pos.id === action.payload.id ? action.payload : pos
        );
        ctx.setState(updatedPositions);
      })
    );
  }

  @Action(DeletePosition)
  delete(ctx: StateContext<EmployeePosition[]>, action: DeletePosition) {
    return this.positionService.deletePosition(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedPositions = state.filter((pos) => pos.id !== action.id);
        ctx.setState(updatedPositions);
      })
    );
  }
}
