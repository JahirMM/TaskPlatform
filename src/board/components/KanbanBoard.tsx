import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import ColumnContainer from "@/board/components/ColumnContainer";
import AddColumnButton from "@/board/components/AddColumnButton";

function generateId() {
  return Math.floor(Math.random() * 10001);
}

function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnInterface[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnInterface | null>(
    null
  );

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [activeTask, setActiveTask] = useState<TaskInterface | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const createColumn = () => {
    const columnToAdd: ColumnInterface = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  const onDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type;

    if (type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activateColumnIndex = columns.findIndex(
        (col) => col.id === activeId
      );
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activateColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // mover entre tareas de la misma columa
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // mover tarea en otra columna
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const createTask = (columnId: string | number) => {
    const newTask: TaskInterface = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div className="m-auto flex items-center h-[calc(100vh-64px)] w-full overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4 m-auto">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <AddColumnButton createColumn={createColumn} />
        </div>
        {isClient &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  createTask={createTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <div className="text-white text-sm bg-bg-primary p-2.5 h-[100px] min-h-[100px] flex text-left rounded-xl ring-2 ring-gray-700">
                  {activeTask.content}
                </div>
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
