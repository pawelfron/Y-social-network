const Profile = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left Sidebar (placeholder) */}
      <aside className="hidden md:flex flex-col w-64 p-4">
        <h1 className="text-2xl font-bold mb-8">Y</h1>
        <nav className="space-y-4">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/" className="hover:text-blue-400">Explore</a>
          <a href="/" className="hover:text-blue-400">Notifications</a>
          <a href="/" className="hover:text-blue-400">Bookmarks</a>
          <a href="/profile" className="hover:text-blue-400">Profile</a>
          <a href="/" className="hover:text-blue-400">Settings</a>
        </nav>
        <button className="mt-8 px-4 py-2 bg-blue-500 rounded-full font-bold hover:bg-blue-600">
          Post
        </button>
      </aside>

      {/* Center Main Content */}
      <main className="flex-1 border-x border-gray-700">
        {/* Profile Header */}
        <div className="relative h-48 bg-gray-700">
          {/* Banner */}
          <img
            src="https://via.placeholder.com/800x200"
            alt="Banner"
            className="object-cover w-full h-full"
          />
          {/* Avatar */}
          <div className="absolute -bottom-12 left-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-black"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Username</h2>
              <p className="text-gray-400">@userhandle</p>
            </div>
            <button className="border rounded-full px-4 py-2 hover:bg-gray-800">
              Edit Profile
            </button>
          </div>
          <p className="mt-4 text-sm">
            This is a short user description or bio, talking about the user.
          </p>
          <div className="flex space-x-4 mt-2 text-sm text-gray-400">
            <span><span className="font-bold text-white">123</span> Following</span>
            <span><span className="font-bold text-white">456</span> Followers</span>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-4">
          <div className="border-t border-gray-700">
            <div className="p-4 hover:bg-gray-900 border-b border-gray-700">
              This is the first post content.
            </div>
            <div className="p-4 hover:bg-gray-900 border-b border-gray-700">
              Here is another post showing user's activity.
            </div>
            <div className="p-4 hover:bg-gray-900">
              Final post example here.
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (placeholder) */}
      <aside className="hidden lg:flex flex-col w-64 p-4">
        <h2 className="text-lg font-bold mb-4">Other Users</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>@user1</span>
            <button className="bg-white text-black rounded-full px-2 py-1 text-xs font-bold">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <span>@user2</span>
            <button className="bg-white text-black rounded-full px-2 py-1 text-xs font-bold">Follow</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Profile;

