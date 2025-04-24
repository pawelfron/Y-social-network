import SearchBar from '../components/search_bar/SearchBar'
import UserList from '../components/user_list/UserList'

const RightMenu = () => {

  return (
    <div className='flex items-center flex-col bg-black'>
        <SearchBar></SearchBar>
        <UserList></UserList>
    </div>
  )
}

export default RightMenu