function ProjectMembersList() {
  return (
    <div className="mt-8">
      <p className="mb-4 text-sm text-white">Miembros del proyecto</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-gray-600 rounded-full size-14"></div>
          <div>
            <p className="text-sm text-white">Jahir Machuca Martinez</p>
            <p className="text-xs text-gray-400">UserName</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectMembersList;
