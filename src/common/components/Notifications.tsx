import NotificationItem from "@/common/components/NotificationItem";
import XmarkIcon from "@/icons/XmarkIcon";

interface NotificationsProps {
  showNotifications: boolean;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

function Notifications({
  showNotifications,
  setShowNotifications,
}: NotificationsProps) {
  return (
    <div
      className={`fixed z-50 top-0 right-0 overflow-y-auto shadow-action/30 shadow-xs w-[316px] h-[496px] bg-bg-secondary rounded-l-xl transition-transform duration-700 translate-y-3 ${
        showNotifications ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h2 className="text-sm font-semibold text-white">Notificaciones</h2>
        <XmarkIcon
          className="cursor-pointer text-action size-4 hover:text-action-hover"
          onClick={() =>
            setShowNotifications((showNotifications) => !showNotifications)
          }
        />
      </div>

      <ul className="divide-y divide-white/10">
        <NotificationItem />
      </ul>
    </div>
  );
}

export default Notifications;
