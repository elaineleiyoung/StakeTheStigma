import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { getNhsArticles } from "../../api";
import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter, Image, Stack, Heading, Divider, ButtonGroup, Button, Text, Card, CardHeader, CardBody, CardFooter, useDisclosure } from '@chakra-ui/react'
/*
Source - https://chakra-ui.com/docs/components/card/usage
Card: The parent wrapper that provides context for its children.
CardHeader: The wrapper that contains a card's header.
CardBody: The wrapper that houses the card's main content.
CardFooter: The footer that houses the card actions.
*/
function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate() /*navigate allows us to navigate between components*/
    const [description,setDescription] = useState(null)
    const [content, setContent] = useState([])
    function removeHtmlTags(text) {
        const regex = /(<([^>]+)>)/gi;
        return text.replace(regex, "");
      }
    /** {content.map((blob) => (
                    blob['mainEntintyofPage'][0]['text'] ? 
                    <p>{blob['mainEntintyofPage'][0]['text']}</p> : 
                    <p></p>
                    ))} */
    const fetchArticle = async() => {
        const responseJson = await getNhsArticles()
        setContent(responseJson['mainEntityOfPage'])
        setDescription(responseJson['description'])
        content.map((blob)=>{
            console.log(blob)
        })
    }
    return (
        <main>
            <h1>Hi this is the dashboard</h1>
            <button onClick={fetchArticle}>Click me to view json for nhs period articles!</button>
            <div>
            <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Periods</Heading>
      <Text>
        {description}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='outline' colorScheme='blue' onClick={onOpen}>
        Read More
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Periods</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {content.map((blob)=> {
    console.log(blob); // Add this line to log the blob
    return (
      <React.Fragment>
        <Heading>{blob['headline']}</Heading>
        <Text>{removeHtmlTags(blob['mainEntityOfPage'][0]['text'])}</Text>
      </React.Fragment>
    );
  })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
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

export default Dashboard; 