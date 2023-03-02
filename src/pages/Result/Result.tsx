import * as React from "react";
import {
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from "@chakra-ui/react";

export const Result: React.FC = () => {
    return (
        <Table>
            <TableCaption>Scoreboard</TableCaption>
            <Thead>
                <Tr>
                    <Th>Username</Th>
                    <Th>Score</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Long Tran</Td>
                    <Td>5</Td>
                </Tr>
                <Tr>
                    <Td>Kameshwara Sekar</Td>
                    <Td>0</Td>
                </Tr>
                <Tr>
                    <Td>Viet Long</Td>
                    <Td>3</Td>
                </Tr>
                <Tr>
                    <Td>Apostolos</Td>
                    <Td>10</Td>
                </Tr>
            </Tbody>
        </Table>
    );
};
