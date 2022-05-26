import {
    Box, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Center, Checkbox, CloseButton, Collapse, Heading, HStack, Icon, Image, Input, Spinner, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Textarea, Th, Thead, Tooltip, Tr, useDisclosure, VStack, Skeleton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsPlusCircle } from 'react-icons/bs'
import { Search, SkeletonBox } from '../../../components/Credo/Home'
import useFetchHashtags from '../../../hooks/useFetchHashTags'
import useGenerateNewHashTag from '../../../hooks/useGenerateNewHashTag'
import useSearch from '../../../hooks/useSearch'





const KindOfSocialMedia = ({ slug }) => {
    return <Box
        sx={{
            svg: {
                fontSize: '2.5em'
                , color: '#2AA9E0'

            },
            'p': {
                fontSize: '40px',
                fontWeight: 'bold'
            }
        }}
    >

        {slug === 'Twitter' && <HStack>
            <Icon as={AiFillTwitterCircle} />
            <Text>Twitter</Text>
        </HStack>}

        {slug === 'Facebook' && <HStack>
            <Icon as={AiFillFacebook} />
            <Text>Facebook</Text>
        </HStack>}

        {slug === 'Instagram' && <HStack>
            <Icon as={AiFillInstagram} />
            <Text>Instagram</Text>
        </HStack>}

    </Box>
}



const convertToMillion = (no) => {
    if (no.length > 4) {
        let strFirstThree = no.substring(0, 2);
        let strFirstT = no.substring(2, 3);
        return `${strFirstThree}.${strFirstT}M`
    }
    else {
        return no
    }
}



const Post = () => {
    const [fetchTags, setIsFetchTags] = useState(false)
    const [allTags, setAllTags] = useState([])
    const { recentTags } = useFetchHashtags(fetchTags)

    const { submitForm, textAreaMessage, submitPost, showSubmitButton, isSubmitting, searchData, isLoading, handleChange, handleTextAreaChange, typedInWords } = useSearch()

    const { generateNewTag, isAutoGeneratingLoading, generatedTags } = useGenerateNewHashTag()
    // useEffect(() => { setAllTags([]) }, [isSubmitting])

    const { isOpen, onToggle } = useDisclosure()
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

    const { media: slug, slug: choice } = useRouter().query


    return <HStack w='100%' h='100vh'
        d={{ base: 'block', lg: "flex" }}
        sx={{
            '*:focus,*:focus-within,': {
                outline: 'none',
                boxShadow: '0 0 0px #000 !important'
            }
        }}
    >
        <SkeletonBox />
        <Box flex={{ base: '1', lg: '0.8' }} h='100vh' p='4' overflowY={'auto'} overflowX='hidden' >
            <Search />

            <Heading mt='48px' color='rgba(185, 185, 185, 1)' pb='25px'>Create a Post</Heading>
            <KindOfSocialMedia slug={slug} />
            {/* TextBox */}

            <VStack pt='40px' pb='12px'>
                <Textarea placeholder='Write Something'
                    resize='none'
                    height={'40vh'}
                    onChange={handleTextAreaChange}
                    p='30'
                />
            </VStack>

            {/* Tags Hashtags */}
            <HStack pb='12px' maxWidth='1000px' w='1200px' overflowX={'auto'} p='4'
                spacing='4'
            >
                {allTags.length >= 1 && allTags.map(({ tag }) =>
                    <HStack bg='#CDE0FF' key={tag} size='md' as='span' px='2' rounded='lg' >
                        <Text as='span' fontSize={'14px'}>
                            {tag && `#${tag}`}
                        </Text>
                        <span
                            onClick={() => {
                                const newArray = allTags.filter((userTag) => userTag.tag != tag)

                                setAllTags(newArray)

                            }}
                        >

                            <CloseButton fontSize='10px' />
                        </span>
                    </HStack>
                )}
            </HStack>


            <VStack align='flex-start' >
                <HStack opacity={'.5'}>

                    <Icon as={BsPlusCircle} fontSize='lg' color='#0765FF' />
                    <Text fontSize='md'>Add A Product</Text>
                </HStack>

                {choice == 'exposure' &&
                    <HStack>
                        <Checkbox onChange={(e
                        ) => {
                            if (e.target.checked === false) {
                                const emptyArray = []
                                setAllTags(emptyArray)
                            }
                            onToggle()
                            setIsFetchTags(true)

                        }} size='lg'>
                            <Text fontSize='md'>Exposure Boost</Text>
                        </Checkbox>
                    </HStack>
                }



            </VStack>
            {/* TextBox */}



            <Collapse in={isOpen}
                animateOpacity
            >



                <Tabs isFitted
                    w='90%' mx='auto'
                    maxWidth='90%'


                    variant={'enclosed-colored'} mt='24px'>
                    <TabList>
                        <Tab>Trending</Tab>
                        <Tab>Custom</Tab>
                        <Tab>Auto Generate here</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <VStack align='flex-start' w='full'>

                                {/* <Text color='rgba(185, 185, 185, 1)' py='24px'></Text> */}

                                <Text p='4' color='#B9B9B9'>Top 50 Hashtags on Twitter with the total number of posting on Twitter.</Text>
                                <TableContainer h='64' overflowY={'auto'} w='full' >
                                    <Table variant='striped' size='lg' isFitted  >
                                        <Thead w='100% important' >
                                            <Tr w='100% important'  >

                                                <Th>Hashtags</Th>
                                                <Th >Retweets</Th>

                                                <Th >Tweets</Th>
                                                <Th>

                                                    <HStack as='span'>
                                                        <Text>Exposure</Text>
                                                        <Tooltip hasArrow label='How many Twitter users have seen this hashtag' bg='gray.600' >
                                                            <span>
                                                                <AiOutlineInfoCircle />
                                                            </span>
                                                        </Tooltip>
                                                    </HStack>
                                                </Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody >
                                            {recentTags.map(hashTag => {
                                                const { tag, retweets, tweets, exposure } = hashTag
                                                return <Tr key={retweets}>
                                                    <Td>#{tag}</Td>
                                                    <Td >{retweets} </Td>
                                                    <Td >{tweets}</Td>
                                                    <Td >{convertToMillion(`${exposure}`)}</Td>
                                                    <Td w='full'>
                                                        <Button
                                                            onClick={() => {
                                                                // Check if nft has not been chosen before
                                                                const checkTag = allTags.find(e => e.tag == tag)
                                                                if (checkTag) {
                                                                    return
                                                                } else {
                                                                    setAllTags([...allTags, { tag: tag }])
                                                                }
                                                                //Check if nft has not been chosen before
                                                            }}

                                                            border='0.5px solid #0765FF !important' variant='outline' fontWeight='400'
                                                            borderRadius='10px !important'
                                                            px='40px !important'
                                                            py='20px !important'
                                                        >Add</Button></Td>
                                                </Tr>
                                            })}
                                        </Tbody>

                                    </Table>
                                </TableContainer>



                            </VStack>

                        </TabPanel>

                        <TabPanel>
                            <VStack align='flex-start'
                                borderLeft='1px solid rgba(7, 101, 255, 0.3)'
                                borderRight='1px solid rgba(7, 101, 255, 0.3)'
                                borderBottom='1px solid rgba(7, 101, 255, 0.3)'
                                p='4'
                            >
                                <Text color='#B9B9B9'>Check for availability and stats before using an hashtag.</Text>
                                <HStack as='form' w='full' spacing='32px' onSubmit={submitForm}>
                                    <Input placeholder='Search for two or more words, separate each words by space' h={{ base: '12', lg: '16' }} flex='0.8' fontWeight=
                                        '400'
                                        fontSize='14px'
                                        onChange={handleChange}
                                        value={typedInWords}
                                    />
                                    <Button flex='0.2' h='16' variant={'outline'} type='submit' isDisabled={typedInWords.length <= 0 ? true : false} >Check</Button>
                                </HStack>

                                <VStack w='full' minH='64'
                                >


                                    {
                                        searchData.length > 0 ?

                                            <>
                                                <TableContainer h='64' overflowY={'auto'} w='full' >
                                                    <Table variant='striped' size='lg' isFitted  >
                                                        <Thead w='100% important' >
                                                            <Tr w='100% important'  >

                                                                <Th>Hashtags</Th>
                                                                <Th >Retweets</Th>

                                                                <Th >Tweets</Th>
                                                                <Th>

                                                                    <HStack as='span'>
                                                                        <Text>Exposure</Text>
                                                                        <Tooltip hasArrow label='How many Twitter users have seen this hashtag' bg='gray.600' >
                                                                            <span>
                                                                                <AiOutlineInfoCircle />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </HStack>
                                                                </Th>

                                                            </Tr>
                                                        </Thead>
                                                        <Tbody  >
                                                            {searchData.map(hashTag => {
                                                                const { tag, retweets, tweets, exposure } = hashTag
                                                                return <Tr key={retweets}>
                                                                    <Td>#{tag}</Td>
                                                                    <Td >{retweets} </Td>
                                                                    <Td >{tweets}</Td>
                                                                    <Td >{convertToMillion(`${exposure}`)}</Td>
                                                                    <Td w='full'>
                                                                        <Button
                                                                            onClick={() => {
                                                                                // Check if nft has not been chosen before
                                                                                const checkTag = allTags.find(e => e.tag == tag)
                                                                                if (checkTag) {
                                                                                    return
                                                                                } else {
                                                                                    setAllTags([...allTags, { tag: tag }])
                                                                                }
                                                                                //Check if nft has not been chosen before
                                                                            }}

                                                                            border='0.5px solid #0765FF !important' variant='outline' fontWeight='400'
                                                                            borderRadius='10px !important'
                                                                            px='40px !important'
                                                                            py='20px !important'
                                                                        >Add</Button></Td>
                                                                </Tr>
                                                            })}
                                                        </Tbody>

                                                    </Table>
                                                </TableContainer>

                                            </>
                                            : ""
                                    }
                                    <Center h={isLoading === false && searchData.length <= 0 ? '40px' : '0px !important'} w='full' align='center' justify='center' >
                                        {searchData.length <= 0 && isLoading === false && <>
                                            <VStack pt='48' w='100%'>
                                                <p>No Data Found</p>
                                            </VStack>
                                        </>}
                                    </Center>

                                    {isLoading && <VStack
                                        h='54' w='full' align='center' justify='center'
                                    ><Spinner size='lg' color='#0765FF' /></VStack>}

                                </VStack>
                            </VStack>

                        </TabPanel>

                        {/* Auto Generate */}

                        <TabPanel>
                            <VStack align='flex-start'
                                borderLeft='1px solid rgba(7, 101, 255, 0.3)'
                                borderRight='1px solid rgba(7, 101, 255, 0.3)'
                                borderBottom='1px solid rgba(7, 101, 255, 0.3)'
                                p='4'
                                w='full'
                                spacing='12'
                            >
                                <Text alignSelf='center' color='#B9B9B9'>Auto Generate HashTags based on what you typed in the textbox</Text>
                                <HStack as='form' w='40%' mx='auto' spacing='32px' onSubmit={submitForm}
                                    alignSelf='center'
                                >
                                    <Button flex='1' h='14'
                                        colorScheme={'blue'}
                                        w='100%'
                                        mx='auto'
                                        bg='rgba(7, 101, 255, 1) !important'
                                        type='submit'
                                        color='white'
                                        isLoading={isAutoGeneratingLoading}
                                        isDisabled={showSubmitButton}

                                        loadingText='Generating'
                                        onClick={() => { generateNewTag(textAreaMessage) }}
                                    >
                                        Generate  Hashtags
                                    </Button>
                                </HStack>

                                <VStack w='full' minH='64'
                                >


                                    {
                                        generatedTags.length > 0 ?

                                            <>
                                                <TableContainer h='64' overflowY={'auto'} w='full' >
                                                    <Table variant='striped' size='lg' isFitted  >
                                                        <Thead w='100% important' >
                                                            <Tr w='100% important'  >

                                                                <Th>Hashtags</Th>
                                                                <Th >Retweets</Th>

                                                                <Th >Tweets</Th>
                                                                <Th>

                                                                    <HStack as='span'>
                                                                        <Text>Exposure</Text>
                                                                        <Tooltip hasArrow label='How many Twitter users have seen this hashtag' bg='gray.600' >
                                                                            <span>
                                                                                <AiOutlineInfoCircle />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </HStack>
                                                                </Th>

                                                            </Tr>
                                                        </Thead>
                                                        <Tbody   >
                                                            {generatedTags.map(hashTag => {
                                                                const { tag, retweets, tweets, exposure } = hashTag
                                                                return <Tr key={retweets}>
                                                                    <Td>#{tag}</Td>
                                                                    <Td >{retweets} </Td>
                                                                    <Td >{tweets}</Td>
                                                                    <Td >{convertToMillion(`${exposure}`)}</Td>
                                                                    <Td w='full'>
                                                                        <Button
                                                                            onClick={() => {
                                                                                // Check if nft has not been chosen before
                                                                                const checkTag = allTags.find(e => e.tag == tag)
                                                                                if (checkTag) {
                                                                                    return
                                                                                } else {
                                                                                    setAllTags([...allTags, { tag: tag }])
                                                                                }
                                                                                //Check if nft has not been chosen before
                                                                            }}

                                                                            border='0.5px solid #0765FF !important' variant='outline' fontWeight='400'
                                                                            borderRadius='10px !important'
                                                                            px='40px !important'
                                                                            py='20px !important'
                                                                        >Add</Button></Td>
                                                                </Tr>
                                                            })}
                                                        </Tbody>

                                                    </Table>
                                                </TableContainer>

                                            </>
                                            : ""
                                    }


                                    {isLoading && <VStack
                                        h='54' w='full' align='center' justify='center'
                                    ><Spinner size='lg' color='#0765FF' /></VStack>}

                                </VStack>
                            </VStack>

                        </TabPanel>


                        {/* Auto Generate */}

                    </TabPanels>
                </Tabs>
            </Collapse>
            <HStack w='90%' mx='auto' justify='space-between' mt='100px' pb='117px'>
                <Button colorScheme={'red'} variant='outline'
                    px='10' py='6'
                    color='rgba(251, 11, 11, 1)'
                    fontWeight='normal'
                >Cancel</Button>
                <Button colorScheme={'blue'}
                    fontWeight='normal'
                    isDisabled={showSubmitButton}
                    isLoading={isSubmitting}
                    loadingText='Posting.......'
                    onClick={(e) => {
                        // submitPost(e)
                        if (submitPost(e)) {
                            onModalOpen()
                        }

                    }}
                    bg='rgba(7, 101, 255, 1)' px='10' py='6'>Post</Button>
            </HStack>

        </Box>




        <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize='md'>How your Post would appear on {slug} </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text pb='4'>
                        {textAreaMessage}
                    </Text>
                    {allTags.map(({ tag }) =>
                        <Text color='blue.500' as='span' px='1' key={tag}>#{tag}</Text>
                    )}
                </ModalBody>
                <ModalFooter>

                    <Button variant='outline' onClick={() => { setAllTags([]); onModalClose() }}>Done</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </HStack >

}

export default Post 