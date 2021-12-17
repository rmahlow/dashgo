import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Input } from '../../components/Form/Input'
import Link from 'next/link'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form'


type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string

}


const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, "No mínimo 6 caracteres"),
    passwordConfirmation: yup.string().oneOf([
        null,
        yup.ref('password')
    ], 'Ase senhas precisam ser iguais')
})


export default function CreateUser() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    })

    const { errors } = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = (value) => {

    }
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius="8" bg="gray.800" p="8" as="form" onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%" >
                            <Input name="name" label="Nome Completo" error={errors.name} {...register('name')} />
                            <Input name="email" label="E-mail" type="email" error={errors.email}  {...register('email')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="password" label="Password" type="password" error={errors.password}  {...register('password')} />
                            <Input name="password_confirmation" label="Confirmação da senha" type="password" error={errors.passwordConfirmation}  {...register('passwordConfirmation')} />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>

                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}
