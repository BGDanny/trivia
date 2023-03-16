import * as React from "react";
import {
    VStack,
    Heading,
    Button,
    Input,
    Box,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
} from "@chakra-ui/react";
import BackgroundImage from "../../assets/pexels.jpg";

export const Home: React.FC = () => {
    return (
        <VStack>
            <Box
                backgroundImage={BackgroundImage}
                bgRepeat="no-repeat"
                backgroundSize="cover"
                textAlign={"center"}
                width="100%"
            >
                <Heading
                    fontSize="40"
                    lineHeight={"tall"}
                    bgGradient="linear(to-r, teal.400, blue.700)"
                    bgClip={"text"}
                >
                    Trivia Battleground
                </Heading>
            </Box>
            <SimpleGrid columns={2} mt={500}>
                <Card bgColor={"#E4DCCF"}>
                    <CardBody>Join a lobby using an access code</CardBody>
                    <CardFooter>
                        <Input placeholder="Lobby Code" type="text" size="md" variant={"filled"}/>
                    </CardFooter>
                </Card>
                <Card bgColor="#EA5455">
                    <CardBody>Create your own lobby</CardBody>
                    <CardFooter>
                        <Button >Create Lobby</Button>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </VStack>
    );
};
