import * as React from "react";
import {
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TableContainer
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export const Result: React.FC = () => {
    const { state } = useLocation();
    const leaderboard: Array<{ username: string; points: string }> =
        state.leaderboard;
    return (
        <TableContainer>
            <Table colorScheme={"whatsapp"} variant="striped">
                <TableCaption placement="top" fontSize={"large"}>Leaderboard</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {leaderboard
                        .sort((a, b) => +b.points - +a.points)
                        .map((user, index) => (
                            <Tr key={index}>
                                <Td>{user.username}</Td>
                                <Td>{user.points}</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
