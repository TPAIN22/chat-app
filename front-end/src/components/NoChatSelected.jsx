import { MessageSquare } from "lucide-react";

export const NoChatSelected = () => {
  return (
    <div className="w-full min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce shadow-md"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-base-content">
          No Conversation Selected
        </h2>

        {/* Welcome Text */}
        <p className="text-base text-base-content/60">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};
