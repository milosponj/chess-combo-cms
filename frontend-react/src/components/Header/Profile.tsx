import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { loginWithRedirect, isAuthenticated, user, logout, error } =
    useAuth0();
  console.log(isAuthenticated, error, user, "AAAAAAAAAAAAAAAAAAAaaaaaaaa");
  if (!isAuthenticated) {
    return <Button onClick={loginWithRedirect}>Login</Button>;
  }

  return (
    <Flex alignItems="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.email}</Text>
        </Box>
      )}
      <Button
        mx={2}
        p={2}
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Logout
      </Button>
      <Avatar size="md" name={user.email} src={user.picture} />
    </Flex>
  );
}
