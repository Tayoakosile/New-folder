
import {
    AlertDialog, TabPanel, TabPanels, AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Tab, TabList, Tabs, Avatar, Box, Button, Heading, HStack, Icon, Input, Skeleton, Stack, Text, useDisclosure, VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { AiFillBell, AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'
import Head from 'next/head'

const IconAndText = [
    {
        Icon: AiFillFacebook,
        text: "Facebook"
    },
    {
        Icon: AiFillTwitterCircle,
        text: "Twitter "
    },

    {
        Icon: AiFillInstagram,
        text: "Instagram"
    },

]

export const SkeletonBox = () => {
    return <>
        <VStack d={{ base: 'none', lg: 'block' }} flex={{ base: '0', lg: '0.25' }} h='100vh' pr='8' pl='4' spacing='70px' py='16'>
            <Box borderRadius='10px' h='32px' w='95%' bg='#EEEEEF' mx='auto' />
            <VStack spacing='24px' >
                {[1, 2, 4].map(list => <>
                    <Box key={list} borderRadius='10px' h='32px' w='95%' bg='#EEEEEF' />
                </>)}
            </VStack>
            <VStack spacing='24px' >
                <Button isDisabled={true} bg='#0765FF' color='white' w='80%' h='14'>Social Activities</Button>
                {[1, 2, 4].map(list => <>
                    <Box key={list} borderRadius='10px' h='32px' w='95%' bg=' #EEEEEF' />
                </>)}
            </VStack>
        </VStack>

    </>
}


export const Search = () => {
    return <>
        <HStack shadow='md' p='4'
            sx={{
                'input': {
                    cursor: 'pointer'
                }
            }}
        >
            <Input shadow='sm' flex='0.7' placeholder='Search here' size='lg' />
            <HStack flex='0.3' spacing={'4'}>
                <Icon as={AiFillBell} w='8' h='8' color='gray.500' />
                <Avatar name='Team River' />
                <Heading size='md'>Team River</Heading>
            </HStack>
        </HStack>

    </>
}
const CredoDashboard = () => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isExOpen, setIsExOpen] = useState(false)
    const onEXClose = () => setIsExOpen(false)
    // const { isExOpen, onEXOpen, onEXClose } = useDisclosure()
    const cancelRef = useRef()
    const [siteChosen, setSiteChosen] = useState("")

    return <HStack w='100%' h='100vh' >
        <SkeletonBox />
        <Box flex={{ base: '1', lg: '0.85' }} h='100vh' >
            <Head>
                <title>Credo&apos;s Hackathon</title>
            </Head>
            {/* Avatar handle */}
            <Search />
            {/* Avatar handle */}


            {/* heading  */}

            <Stack mt='9'
                direction={{ base: 'column', lg: 'column' }}
                align={'flex-start'}
                justify={{ base: "stretch", lg: "space-between" }}
                spacing={{ base: "3", lg: '12' }}
                w='95%'
                mx='auto'
            >
                <HStack w='full' justify='space-between'>

                    <VStack as='span' align='flex-start'>
                        <Heading fontSize={{ base: 'lg', lg: '3xl' }}>Social Transaction</Heading>
                    </VStack>

                    <HStack spacing={{ base: '6', lg: '12' }} w={{ base: '100%', lg: '50%' }} >
                        <Button
                            bg='rgba(7, 101, 255, 1)'
                            h='12'
                            w='full'
                            p='4'
                            color={'white'}
                            fontSize={{ base: '14px', lg: '16px' }}
                            colorScheme='blue'
                            onClick={onOpen}
                        >Create Post</Button>
                        <Button
                            w='full'
                            fontSize={{ base: '14px', lg: '16px' }}

                            h='12'
                            p='4'
                            variant='outline'
                            colorScheme='whiteAlpha'
                            shadow='sm'
                            color='black'
                            isDisabled
                        >Set Up</Button>
                    </HStack>

                </HStack>

                <VStack>

                </VStack>





                {/* Tabs */}








                <Tabs isFitted
                    w='100%' mx='auto'
                    mt='32'
                    variant={'enclosed-colored'}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Twitter</Tab>
                        <Tab>Facebook</Tab>
                        <Tab>Instagram</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>

                        </TabPanel>
                        <TabPanel>

                            <VStack align='flex-start' boxShadow='0px -2px 4px rgba(55, 5, 255, 0.13), 0px 4px 4px rgba(55, 5, 255, 0.13)' p='4'>
                                <HStack>
                                </HStack>
                                <Box>
                                    {/* <Box bg='#0765FF'></Box> */}
                                    {/* <Box bg='#0765FF'></Box> */}
                                </Box>
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>


                {/* Tabs */}





            </Stack>

            {/* heading  */}

            {/* Alert Here */}

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                isCentered
                onClose={onClose}
            >
                <AlertDialogOverlay >
                    <AlertDialogContent w='90% !important' mx='auto' h='70vh' px='8'>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold' py='40px'>
                            Select an account to proceed with:
                        </AlertDialogHeader>

                        {/* Social Media Icon */}
                        <VStack align={'flex-start'} w='100%' spacing={'40px'} px={4}  >



                            {IconAndText.map(Con => <>
                                <HStack>


                                    <Box as={'input'}
                                        type='radio'
                                        w='6'
                                        h='6'
                                        name={`con`}
                                        id={`${Con.text}`}
                                        onChange={(e) => {
                                            console.log(e.target.name)
                                            setSiteChosen(`${Con.text}`)

                                        }}
                                        size='lg'
                                    />

                                    <HStack as={"label"} bg='' w='full' spacing='6' htmlFor={`${Con.text}`}>
                                        <Icon as={Con.Icon}
                                            color='facebook.500'
                                            fontSize='3xl'
                                        />
                                        <Text fontSize='lg' fontWeight={'bold'}>{Con.text}</Text>
                                    </HStack>
                                </HStack>
                            </>)}
                        </VStack>
                        {/* Social Media Icon */}



                        <AlertDialogFooter >
                            <Button colorScheme='blue' onClick={() => { setIsExOpen(true), onClose() }} ml={3}
                                variant='ghost'
                                fontWeight={400}
                            >
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>



            {/* New alert dialog */}
            {/* New alert dialog */}
            <AlertDialog
                isOpen={isExOpen}
                leastDestructiveRef={cancelRef}
                isCentered
                onClose={onEXClose}
            >
                <AlertDialogOverlay >
                    <AlertDialogContent w='80% !important' mx='auto' p='4'>
                        <AlertDialogHeader fontSize='lg' >
                            <Text fontWeight='bold'>Promotional Tools:</Text>
                            <Text fontWeight='400' fontSize='sm'>Get your Post in the face of a wider audience</Text>
                        </AlertDialogHeader>

                        {/* Social Media Icon */}
                        <VStack align={'flex-start'} w='100%' spacing={6} p={4}  >




                            {['Ads', 'Exposure Boost'].map(Con => <>
                                <HStack align='flex-start'>

                                    <Box as={'input'}
                                        type='radio'
                                        w='7'
                                        h='7'
                                        name={`con`}
                                        id={`${Con.text}`}

                                        onClick={() => {
                                            setTimeout(() => {
                                                router.push(`/post/${siteChosen ? siteChosen : 'Facebook'}/${Con == 'Exposure Boost' ? 'exposure' : 'ads'}`)
                                            }, 1500);
                                        }}
                                    />

                                    <VStack as={"label"} w='full' htmlFor={`${Con}`}
                                        align='flex-start'
                                        spacing='0px'
                                    >

                                        <Text fontSize='lg' fontWeight={'bold'}>{Con}</Text>
                                        {Con == 'Exposure Boost' && <>
                                            <Text as='span' fontSize='14px'>Leverage our algorithm to know keywords that do all the work!</Text>
                                        </>}
                                    </VStack>
                                </HStack>
                            </>)}
                        </VStack>
                        {/* Social Media Icon */}



                        <AlertDialogFooter >
                            <Button colorScheme='blue' onClick={() => {
                                onClose()
                                router.push(`/post/${siteChosen ? siteChosen : 'Facebook'}/'continue'`)
                            }} ml={3}
                                variant='ghost'

                            >
                                Continue anyway
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Alert Here */}

        </Box>
    </HStack >
}

export default CredoDashboard;