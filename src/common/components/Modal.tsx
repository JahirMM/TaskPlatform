import XmarkIcon from "@/icons/XmarkIcon";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-bg-secondary opacity-85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-bg-primary p-6 rounded-2xl w-[95%] max-h-[85%] overflow-auto sm:w-[50%]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XmarkIcon className="cursor-pointer text-action size-5 hover:text-action-hover" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
