import { User } from "waterfood";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface DisplayUserProps {
  user: User;
  className?: string;
  avatarClassName?: string;
}

const DisplayUser = ({ user, className, avatarClassName }: DisplayUserProps) => {
  return (
    <div className={cn("flex flex-row items-center gap-4", className)}>
      <Avatar className={avatarClassName}>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <span className="text-lg">{user.name}</span>
    </div>
  );
};

export default DisplayUser;
