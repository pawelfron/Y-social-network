import SearchBar from "../components/search_bar/SearchBar";
import UserList from "../components/user_list/UserList";
import "./RightMenu.css";

const RightMenu = () => {
  return (
    <div className="rightMenuWrapper">
      <SearchBar />
      <UserList />
    </div>
  );
};

export default RightMenu;
