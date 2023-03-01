import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { db } from "./api/firebaseconfig";

export default function Home() {
  const form = useRef();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [emp, setEmp] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v2mbnjh",
        "template_3vou665",
        form.current,
        "4kxrNn5y6SPaUA7G1"
      )
      .then(
        (result) => {
          // toast({
          //   title: "Subscribed successfully",
          //   duration: 3000,
          //   isClosable: true,
          //   status: "success",
          // });
          console.log(result.text);
        },
        (error) => {
          // toast({
          //   title: "Subscription Pending",
          //   duration: 3000,
          //   isClosable: true,
          //   status: "info",
          // });
          console.log(error.text);
        }
      );
  };

  const submitIt = (e) => {
    e.preventDefault();
    db.collection("emails")
      .where("email", "==", email)
      .get()
      .then((val) => {
        if (!val.empty) {
          setEmp(false);
        } else {
          setEmp(true);
        }
      })
      .then((yo) => {
        if (emp) {
          db.collection("emails")
            .add({ email: email })
            .then((o) => {
              sendEmail(e);
              toast({
                title: "Subscribed successfully",
                duration: 3000,
                isClosable: true,
                status: "success",
              });
              setEmail("");
              return;
            });
        } else {
          toast({
            title: "Email already exists in our database...",
            isClosable: true,
            duration: 3000,
            status: "error",
          });
        }
      });
  };
  return (
    <>
      <Head>
        <title>A Passionate Nerd - Coming Soon Page</title>
        <meta
          name="description"
          content="A Passionate Nerd - a clothing brand designed for people pursuing their passions. The brand is in progress and will be released sooner than later. This is the A Passionate Nerd official coming soon page!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        w="100vw" // set the width of the box to match the image
        h="100vh" // set the height of the box to match the image
        direction={"column"}
        alignItems={"center"}
        //justifyContent={"space-between"}
        //gap={"10vh"}
      >
        <Box
          filter="blur(50px)"
          w="100vw" // set the width of the box to match the image
          h="100vh"
          position="absolute"
        >
          <Image
            src="/img.png" // replace with the URL of your image
            w="100vw" // set the width of the image to fill the box
            h="100vh" // set the height of the image to fill the box
            objectFit="cover" // set the object-fit property to cover the box
            alt="A Passionate Nerd Shirt/Hoodies/Clothing Image" // add alt text for accessibility
            position="absolute" // position the box on top of the image
            //backdropFilter="blur(8px)" // add the blur effect
          />
        </Box>
        <Button colorScheme={"transparent"} width={300} marginTop={5}>
          <Image
            src="/top.png"
            alt={"A Passionate Nerd Top Icon Clothing Brand"}
          />
        </Button>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={3}
          position={"absolute"}
          top={"24vh"}
        >
          <Text
            zIndex={900000}
            fontWeight={800}
            color={"black"}
            fontSize={{ base: "50pt", md: "60pt", lg: "70pt" }}
            fontFamily={"courier"}
            textAlign={"center"}
          >
            Coming Soon
          </Text>
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Text
              textAlign={"center"}
              zIndex={900000}
              color={"black"}
              fontFamily={"courier"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
            >
              A clothing brand designed for people pursuing their passions.
            </Text>
            <Text
              textAlign={"center"}
              zIndex={900000}
              color={"black"}
              fontFamily={"courier"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
            >
              Subscribe below to newsletter (I promise we do not spam).
            </Text>
            <form onSubmit={(e) => submitIt(e)}>
              <Flex gap={5}>
                <Input
                  backgroundColor={"white"}
                  borderRadius={20}
                  placeholder={"Email Address"}
                  type={"email"}
                  fontFamily={"courier"}
                  fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
                  width={{ base: 200, md: 300, lg: 400 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  fontFamily={"courier"}
                  backgroundColor={"white"}
                  borderRadius={20}
                  width={{ base: 125, md: 150, lg: 175 }}
                  fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
                  type={"submit"}
                >
                  Subscribe
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
        <Flex
          position={"absolute"}
          bottom={"5vh"}
          alignItems={"flex-end"}
          justifyContent={"center"}
        >
          <Button
            colorScheme={"transparent"}
            width={"25%"}
            _hover={{
              backgroundColor: "white",
            }}
          >
            <Image
              src="/insta.png"
              alt={"A Passionate Nerd - Instagram Icon"}
            />
          </Button>
          <Button
            colorScheme={"transparent"}
            width={"25%"}
            _hover={{
              backgroundColor: "white",
            }}
          >
            <Image
              src="/facebook.png"
              alt={"A Passionate Nerd - Facebook Icon"}
            />
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
