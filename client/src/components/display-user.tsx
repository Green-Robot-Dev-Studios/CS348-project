import { User } from "waterfood";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const DisplayUser = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <span className="text-lg">{user.name}</span>
    </div>
  );
};

export default DisplayUser;
