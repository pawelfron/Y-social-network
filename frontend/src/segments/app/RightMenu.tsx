import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import UserList from "../../components/rightSection/UserList.tsx";
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
