import { Separator } from '@/components/ui/separator';

import { HeaderActions } from './header-actions';
import { TableView } from './table-view';
import { TaskForm } from './task-form';

export function TaskManagementContainer() {
  return (
    <>
      <HeaderActions />
      <Separator className="my-4" />
      <TableView />
      <TaskForm />
    </>
  );
}
