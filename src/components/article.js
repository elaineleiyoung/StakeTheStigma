import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter, Image, Stack, Heading, Divider, ButtonGroup, Button, Text, Card, CardHeader, CardBody, CardFooter, useDisclosure } from '@chakra-ui/react'

const Article = ({ topic }) => {
    console.log(topic)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState(topic.title)
    const [description,setDescription] = useState(topic.description)
    const [content, setContent] = useState(topic.content)
    console.log(content)

    return (
        <main>
            <div>
            <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{title}</Heading>
      <Text>
        {description}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        Lorem
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='outline' colorScheme='blue' onClick={onOpen}>
        Read More
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="80vw">
          <ModalHeader>{topic.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
        <Text>{content}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            </div>
            {/* This is how I implemented dynamically created html elements in my previous project
             <div className="DisplayImageGrid">
        {imageList.map((image)=> <Zoom><div className="pic"><img class="DisplayImage"src={image.url.slice(0,47) + "q_auto/" + image.url.slice(47)} alt={image.public_id}></img></div></Zoom>)},
      </div>
            */}
            
        </main>
    );
}

export default Article;

