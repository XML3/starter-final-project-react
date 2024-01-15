import { useEffect, useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

export const UserPage = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Fetching user info based on userId
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/" + userId);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data from user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading user data ...</div>;
  }

  return (
    <div>
      <Flex
        direction={"column"}
        alignItems={"center"}
        position={"relative"}
        right={"3rem"}
        mb={{ base: "1rem", md: "1rem" }}
      >
        <Text
          color={"gray.200"}
          fontWeight={"bold"}
          marginBottom={2}
          marginLeft={"5rem"}
        >
          Event Creator
        </Text>
        <Image
          src={user.image}
          alt={user.name}
          w={{ base: "3rem", md: "5rem" }}
          h={{ base: "3rem", md: "5rem" }}
          borderRadius={"full"}
          marginBottom={1}
          marginLeft={"5.5rem"}
        />
        <Text fontSize={{ base: "0.7rem", md: "0.8rem" }} marginLeft={"5rem"}>
          {user.name}
        </Text>
      </Flex>
    </div>
  );
};

export default UserPage;
