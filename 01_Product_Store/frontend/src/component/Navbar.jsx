import React from "react";

import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaPlusSquare, FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="extrabold"
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignContent={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FiSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
