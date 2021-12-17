import { Flex, Text, Box, Avatar } from "@chakra-ui/react"

interface ProfileProps {
    showProfileData: boolean
}
export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex
            align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Rodrigo Mahlow</Text>
                    <Text color="gray.300" fontSize="small">rmahlow@gmail.com</Text>
                </Box>
            )}
            <Avatar size="md" name="Rodrigo Grillo Perche Mahlow" mr="2"/>
        </Flex>
    );
}