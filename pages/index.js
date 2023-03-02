import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import emailjs, { send } from "@emailjs/browser";
import { useRef, useState } from "react";
import { db } from "./api/firebaseconfig";
import { arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Home() {
  const form = useRef();
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const submitIt = (e) => {
    e.preventDefault();
    db.collection("emails")
      .where("email", "==", email)
      .get()
      .then((val) => {
        if (!val.empty) {
          toast({
            title: "Email already exists in our database...",
            isClosable: true,
            duration: 3000,
            status: "error",
          });
        } else {
          db.collection("emails")
            .add({ email: email, timestamp: serverTimestamp() })
            .then((o) => {
              toast({
                title: "Subscribed successfully",
                duration: 3000,
                isClosable: true,
                status: "success",
              });
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
              //setEmail("");
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
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgAttachment={"fixed"}
        bgImage={"url('/img.png')"}
        bgColor={"rgba(0, 0, 0, 0.25)"}
      >
        <Box
          filter="blur(100px)"
          //filter="blur(50px)"
          w="100vw" // set the width of the box to match the image
          h="100vh"
          bgColor={"rgba(0, 0, 0, 0.25)"}
          position="absolute"
          bgSize={"cover"}
          bgPosition={"center"}
          bgRepeat={"none"}
          bgAttachment={"fixed"}
          bgImage={"url('/img.png')"}
        ></Box>
        {/* <Box
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
        </Box> */}
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
            color={"#FFFFFF"}
            fontSize={{ base: "50pt", md: "60pt", lg: "70pt" }}
            fontFamily={"courier"}
            textAlign={"center"}
            backgroundColor={"#000"}
            paddingLeft={{ base: 3, md: 5, lg: 7 }}
            paddingRight={{ base: 3, md: 5, lg: 7 }}
            borderRadius={12}
          >
            Coming Soon
          </Text>
          <Image
            position={"absolute"}
            src="/exc.png"
            width={{ base: 50, md: 75, lg: 100 }}
            zIndex={900000000}
            right={0}
            top={{ base: -5, md: -9, lg: -10 }}
          />
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Text
              textAlign={"center"}
              zIndex={900000}
              color={"#000"}
              fontFamily={"courier"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
              as={"i"}
            >
              A clothing brand designed for people pursuing their passions.
            </Text>
            <Text
              textAlign={"center"}
              zIndex={900000}
              color={"#000"}
              fontFamily={"courier"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
              as={"i"}
            >
              Subscribe below to newsletter (I promise we do not spam).
            </Text>
            <form
              ref={form}
              onSubmit={(e) => {
                submitIt(e);
              }}
            >
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
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Link
            //zIndex={900000}
            fontFamily={"courier"}
            color={"black"}
            fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
            onClick={() =>
              router.push(
                "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSqJmcxcFHvnJSdxSsPsMlCBjhDCLBRcvvKgtQfjThdLNTXMxkbSjFKkMPBBSQGLPMSZlV"
              )
            }
            target={"_blank"}
          >
            apassionatenerdshop@gmail.com
          </Link>
          <Flex alignItems={"flex-end"} justifyContent={"center"}>
            <Button
              colorScheme={"transparent"}
              width={"25%"}
              _hover={{
                backgroundColor: "white",
              }}
              onClick={() =>
                toast({
                  title: "Instagram not created yet",
                  isClosable: true,
                  status: "info",
                  duration: 3000,
                })
              }
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
              onClick={() =>
                toast({
                  title: "Facebook not created yet",
                  isClosable: true,
                  status: "info",
                  duration: 3000,
                })
              }
            >
              <Image
                src="/facebook.png"
                alt={"A Passionate Nerd - Facebook Icon"}
              />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
