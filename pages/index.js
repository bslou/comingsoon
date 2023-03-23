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
          content="A Passionate Nerd - a clothing brand designed to inspire people to pursue their passions. The brand is in progress and will be released sooner than later. This is the A Passionate Nerd official coming soon page, sign up to stay tuned for the release. We do not spam! :)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Flex
        w="100vw" // set the width of the box to match the image
        //h="100vh" // set the height of the box to match the image
        minHeight={"100vh"}
        gap={"17vh"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        //justifyContent={"space-between"}
        //gap={"10vh"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgAttachment={"fixed"}
        bgImage={"url('/img2.png')"}
        bgColor={"rgba(0, 0, 0, 0.25)"}
      >
        <Button
          colorScheme={"transparent"}
          width={300}
          marginTop={5}
          onClick={() => router.push("/")}
        >
          <Image
            src="/top2.png"
            alt={"A Passionate Nerd Top Icon Clothing Brand"}
          />
        </Button>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={3}
          //position={"absolute"}
          //top={"20vh"}
        >
          <Flex
            backgroundColor={"rgba(235, 235, 235, 0.7)"}
            paddingLeft={2}
            paddingRight={2}
            marginBottom={{ base: "1vh", lg: "2vh" }}
          >
            <Text
              color={"black"}
              fontSize={{ base: "14pt", md: "18pt", lg: "22pt" }}
              fontFamily={"Open Sans"}
            >
              "Fullzip Initial Launch"
            </Text>
          </Flex>
          {/* <Image
            position={"absolute"}
            src="/exc.png"
            alt={"A Passionate Nerd Exclusive Sign"}
            width={{ base: 50, md: 75, lg: 100 }}
            zIndex={900000000}
            right={0}
            top={{ base: -5, md: -9, lg: -10 }}
          /> */}
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Flex
              backgroundColor={"rgba(235, 235, 235, 0.7)"}
              paddingLeft={2}
              paddingRight={2}
              width={{ base: "55vw", md: "45vw", lg: "35vw" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                textAlign={"center"}
                zIndex={900000}
                color={"#000"}
                fontFamily={"Open Sans"}
                fontSize={{ base: "10pt", md: "12pt", lg: "14pt" }}
                fontWeight={700}
                //as={"i"}
              >
                {/* A clothing brand designed for people pursuing their passions. We
                will start off the journey by launching A Passionate Nerd
                zip-ups. Our goal is to also start selling shirts as soon as
                possible but for now we are trying to find the best resources in
                order to create the highest quality shirts possible with the
                fastest possible shipping.  */}
                A Passionate Nerd is a clothing brand that is dedicated to
                inspiring people to pursue their passions. Our mission is to
                create a community of individuals who are passionate about what
                they do and are not afraid to show it. The brand's initial
                launch will feature zip-up hoodies that are perfect for cooler
                weather, with plans to expand our product line to include tees
                as well. By wearing A Passionate Nerd apparel, customers can
                showcase their love for their hobbies, jobs, and interests and
                inspire others to do the same.
              </Text>
            </Flex>
            <Flex
              backgroundColor={"rgba(235, 235, 235, 0.7)"}
              paddingLeft={2}
              paddingRight={2}
              width={{ base: "55vw", md: "45vw", lg: "35vw" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                textAlign={"center"}
                zIndex={900000}
                color={"red"}
                fontFamily={"Open Sans"}
                fontSize={{ base: "6pt", md: "8pt", lg: "10pt" }}
                fontWeight={700}
                //as={"i"}
              >
                ENTER YOUR EMAIL TO BE NOTIFIED FOR FULLZIP RESTOCK. Get access
                to special discounts & early access to our drops!
              </Text>
            </Flex>
            {/* <Text
              textAlign={"center"}
              zIndex={900000}
              color={"#000"}
              fontFamily={"Open Sans"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
              as={"i"}
            >
              Subscribe below to newsletter (I promise we do not spam).
            </Text> */}
            <form
              ref={form}
              onSubmit={(e) => {
                submitIt(e);
              }}
            >
              <Flex /*gap={5}*/>
                <Input
                  backgroundColor={"white"}
                  borderRadius={"none"}
                  placeholder={"Email Address"}
                  type={"email"}
                  fontFamily={"Open Sans"}
                  fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
                  width={{ base: 200, md: 300, lg: 400 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="to_email"
                  required
                />
                <Button
                  fontFamily={"Open Sans"}
                  backgroundColor={"#565656"}
                  colorScheme={"transparent"}
                  borderRadius={"none"}
                  width={{ base: 125, md: 150, lg: 175 }}
                  fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
                  type={"submit"}
                  color={"white"}
                >
                  Subscribe
                </Button>
              </Flex>
            </form>
            {/* <Text
              color={"black"}
              as="i"
              fontFamily={"Open Sans"}
              fontSize={{ base: "6pt", md: "8pt", lg: "10pt" }}
            >
              Store opening is estimated to be between March 18-April 5
            </Text> */}
          </Flex>
        </Flex>
        <Flex
          //position={"absolute"}
          //bottom={"5vh"}
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Flex
            backgroundColor={"rgba(235, 235, 235, 0.7)"}
            paddingLeft={2}
            paddingRight={2}
            //width={"35vw"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link
              //zIndex={900000}
              fontFamily={"Open Sans"}
              color={"black"}
              fontSize={{ base: "8pt", md: "10pt", lg: "12pt" }}
              onClick={() =>
                router.push(
                  "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=apassionatenerdshop@gmail.com"
                )
              }
              target={"_blank"}
            >
              apassionatenerdshop@gmail.com
            </Link>
          </Flex>
          <Flex alignItems={"flex-end"} justifyContent={"center"}>
            <Button
              colorScheme={"transparent"}
              width={"25%"}
              // _hover={{
              //   backgroundColor: "white",
              // }}
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
              // _hover={{
              //   backgroundColor: "white",
              // }}
              onClick={() =>
                toast({
                  title: "Tiktok not created yet",
                  isClosable: true,
                  status: "info",
                  duration: 3000,
                })
              }
            >
              <Image
                src="/tiktok.png"
                alt={"A Passionate Nerd - Tiktok Icon"}
              />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
