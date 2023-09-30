import { useEffect, useState } from "react";
import { Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

//removed { userId } prop, added useParams()
export const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Fetching user info based on userId
    const fetchUser = async () => {
      try {
        //"http://localhost:3000/users/" + userId)
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data from user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) {
    return <div>Loading user data ...</div>;
  }

  return (
    <div>
      <Text
        color={"teal.300"}
        fontWeight={"bold"}
        marginBottom={2}
        marginLeft={"5rem"}
      >
        Event Creator
      </Text>
      <Image
        src={user.image}
        alt={user.name}
        w="5rem"
        h="5rem"
        borderRadius={"full"}
        marginBottom={1}
        marginLeft={"5.5rem"}
      />
      <Text fontSize={"sm"} marginLeft={"5rem"}>
        {user.name}
      </Text>
    </div>
  );
};

export default UserPage;
