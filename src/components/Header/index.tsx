import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationNav } from './NotificationNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export default function Header() {

    const { onOpen } = useSidebarDrawer();
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })
    return (
        <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" align="center">
            {!isWideVersion && (
                <IconButton
                    aria-label="open naviagtion"
                    icon={<Icon as={RiMenuLine}></Icon>}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                    >

                </IconButton>
            )}
            <Logo />
            {isWideVersion && (<SearchBox />)}
            <NotificationNav />
            <Profile showProfileData={isWideVersion} />
        </Flex>
    )
}