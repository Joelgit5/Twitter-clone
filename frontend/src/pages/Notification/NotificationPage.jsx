import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { Heart, MessageCircle, Settings, UserRound } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Imports End

const NotificationPage = () => {
  const queryClient = useQueryClient();

  // Fetch notifications data from the server
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],

    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications/");
        const data = await res.json();
        if (data.error) return null;

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  // Mutation to delete notifications
  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("api/notifications", {
          method: "DELETE",
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to delete notifications");
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      // invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold">Notifications</p>

          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="m-1">
              <Settings className="w-4" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {notifications?.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications 🤔</div>
        )}

        {notifications?.map((notification) => (
          <div key={notification._id} className="border-b border-gray-700">
            <div className="flex gap-2 p-4">
              {notification.type === "follow" && (
                <UserRound className="w-7 h-7 text-green-500" />
              )}

              {notification.type === "like" && (
                <Heart className="w-7 h-7 text-red-500" />
              )}

              {notification.type === "comment" && (
                <MessageCircle className="w-7 h-7 text-sky-400" />
              )}

              <Link to={`/profile/${notification.from.username}`}>
                <div className="avatar flex items-center gap-2">
                  <div className="w-8 rounded-full">
                    <img
                      src={
                        notification.from.profileImg ||
                        "/avatar-placeholder.png"
                      }
                    />
                  </div>
                  <span className="font-bold">
                    {notification.from.fullName}
                  </span>
                </div>

                {notification.type === "follow" && (
                  <div className="flex gap-1">
                    <span className="font-bold">
                      @{notification.from.username}
                    </span>{" "}
                    followed you
                  </div>
                )}

                {notification.type === "like" && (
                  <div className="flex gap-1">
                    <span className="font-bold">
                      @{notification.from.username}
                    </span>{" "}
                    liked your post
                  </div>
                )}

                {notification.type === "comment" && (
                  <div className="flex gap-1">
                    <span className="font-bold">
                      @{notification.from.username}
                    </span>{" "}
                    commented on your post
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationPage;
