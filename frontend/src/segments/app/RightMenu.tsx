import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import UserList from "../../components/rightSection/UserList.tsx";
import { UserService } from "../../services/userService.ts";
import "./RightMenu.css";
import { UserSummary } from "../../interfaces/user.ts";
import { AuthService } from "../../services/authService.ts";

const RightMenu = () => {

  const [users, setUsers] = useState<UserSummary[]>([]);
  const authService = AuthService.get_instance();
  const currentUser = authService.getUserId();

  const onSearch = async (query: string) => {
    try {
      const results = await UserService.searchUsers(query);
      const filtered = results.filter(user => user.id !== currentUser);
      setUsers(filtered);
    } catch (err) {
      console.error("Search failed", err);
      setUsers([]);
    }
  };



  return (
    <div className="rightMenuWrapper">
      <SearchBar onSearch={onSearch}/>
      <UserList users={users}/>
    </div>
  );
};

export default RightMenu;
