import { CheckIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import * as React from "react";
import BackgroundImage from "../../assets/pexels.jpg";

export const Home: React.FC<{ socket: WebSocket }> = ({ socket }) => {
    const [isOpen, setOpen] = React.useState(false);
    const [code, setCode] = React.useState("");
    const [username, setUsername] = React.useState("");
    return (
        <Box>
            <VStack spacing={20} textAlign={"center"}>
                <Box
                    backgroundImage={BackgroundImage}
                    bgRepeat="no-repeat"
                    backgroundSize="cover"
                    width="100%"
                >
                    <Heading
                        fontSize="60"
                        lineHeight={"tall"}
                        bgGradient="linear(to-r, teal.400, blue.800)"
                        bgClip={"text"}
                    >
                        Trivia Battleground
                    </Heading>
                </Box>
                <SimpleGrid columns={2} spacing={5}>
                    <Card bgColor={"#E4DCCF"}>
                        <CardHeader as="b" fontSize={40}>
                            Join a Lobby
                        </CardHeader>
                        <CardFooter>
                            <InputGroup>
                                <Input
                                    placeholder="Access Code"
                                    type="text"
                                    size="md"
                                    variant={"filled"}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                {code && (
                                    <Tooltip label="Submit">
                                        <InputRightElement
                                            children={
                                                <IconButton
                                                    icon={<CheckIcon />}
                                                    aria-label="Submit"
                                                    colorScheme={"green"}
                                                    variant="link"
                                                    onClick={() =>
                                                        setOpen(true)
                                                    }
                                                />
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </InputGroup>
                        </CardFooter>
                    </Card>
                    <Card bgColor="#EA5455">
                        <CardHeader as="b" fontSize={40}>
                            Create a New Lobby
                        </CardHeader>
                        <CardFooter>
                            <Button
                                width="100%"
                                onClick={() => {
                                    setOpen(true);
                                    setCode("");
                                }}
                            >
                                Create Lobby
                            </Button>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
            </VStack>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setOpen(false);
                    setUsername("");
                }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Your Username</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Username"
                            type="text"
                            size="md"
                            variant={"filled"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                if (code) {
                                    socket.send(
                                        `Join Room:${username}:${code}`
                                    );
                                } else {
                                    socket.send("Create Room:" + username);
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
