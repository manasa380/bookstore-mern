import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-10">

      <div className="bg-white shadow-lg rounded-lg p-8">

        <div className="flex items-center gap-6">

          <img
            src={
              user.profileImage ||
              "https://ui-avatars.com/api/?name=" + user.name
            }
            alt={user.name}
            className="w-32 h-32 rounded-full"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {user.email}
            </p>

            <p className="mt-2">
              <strong>Phone :</strong> {user.phone}
            </p>

            <p className="mt-2">
              <strong>Role :</strong> {user.role}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;