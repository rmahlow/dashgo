import { Box, Flex, Heading, Button, Icon, Table, Tr, Th, Tbody, Td, Checkbox, Text, Spinner, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from '../../components/Header'
import { Pagination } from "../../components/Pagination";
import Sidebar from '../../components/Sidebar'
import NextLink from 'next/link'
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {

    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, error } = useUsers(page)

    async function handlePrefethUser(userid: string) {
        await queryClient.prefetchQuery(["user", userid], async () => {
            const response = await api.get(`users/${userid}`)
            return response.data
        },{
            staleTime: 1000* 5
        })
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius="8" bg="gray.800" p="8">
                    <Flex
                        mb="8"
                        justify="space-between"
                        align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching &&
                                <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        <NextLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                                Criar Usuário
                            </Button>
                        </NextLink>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados do usuário</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Tr>
                                    <Th px="6" color="gray.300" w="8">
                                        <Checkbox colorScheme="pink"></Checkbox>
                                    </Th>
                                    <Th>Usuário</Th>
                                    <Th>Data de Cadastro</Th>
                                    <Th w="8"></Th>
                                </Tr>
                                <Tbody>
                                    {
                                        data.users.map(user => {
                                            return (
                                                <Tr key={user.id}>
                                                    <Td px="6">
                                                        <Checkbox colorScheme="pink"></Checkbox>
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Link color="purple.400" onMouseEnter={() => handlePrefethUser(user.id)}>
                                                                <Text fontWeight="bold">{user.name}</Text>
                                                            </Link>
                                                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                        </Box>
                                                    </Td>
                                                    <Td>{user.createdAt}</Td>
                                                    <Td>
                                                        <Button
                                                            as="a"
                                                            size="sm"
                                                            fontSize="sm"
                                                            colorScheme="purple"
                                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                                                            Editar
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            )
                                        })
                                    }

                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegister={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage} />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}