import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

/**
 * Google OAuth user info response
 */
interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export default function Secure() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<GoogleUser | null>(null);

  const getUserDetails = async (accessToken: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data: GoogleUser = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
      return;
    }

    getUserDetails(accessToken);
  }, [navigate]);

  if (!userDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="user-profile">
      <div className="card">
        <img
          src={userDetails.picture}
          alt={`${userDetails.given_name}'s profile`}
          className="profile-pic"
        />
        <p>Welcome</p>
        <h1 className="name">{userDetails.name}</h1>
        <p className="email">{userDetails.email}</p>
        <p className="locale">Locale: {userDetails.locale}</p>
      </div>
    </div>
  );
}
