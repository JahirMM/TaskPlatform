function KanbanBoardSkeleton() {
  return (
    <div className="flex items-center w-full px-10 m-auto overflow-x-auto overflow-y-hidden">
      <div className="flex gap-4 m-auto mb-5">
        <div className="flex gap-4">
          <div className="w-[350px] h-[500px] max-h-[500px] rounded-xl bg-bg-column animate-pulse"></div>
          <div className="w-[350px] h-[500px] max-h-[500px] rounded-xl bg-bg-column animate-pulse"></div>
          <div className="w-[350px] h-[500px] max-h-[500px] rounded-xl bg-bg-column animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoardSkeleton;
