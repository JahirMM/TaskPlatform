type TaskCardProps = {
  content: string;
};

export default function TaskCard({ content }: TaskCardProps) {
  return (
    <li className="w-full p-2 text-sm bg-gray-700 border-2 border-gray-700 rounded-lg min-h-12 hover:border-gray-400">
      {content}
    </li>
  );
}
