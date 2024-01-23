import React from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export type contentSectionData = {
  rank: number;
  image: string;
  title: string;
  action?: string;
  reverse: boolean;
  description: string;
  actionTitle?: string;
};

// Custom hook for creating a parallax effect, based on scroll position and a distance value
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// content section memorized function component
const ContentSection = (props: contentSectionData) => {
  // Using a ref to track the scrollable element
  const ref = useRef(null);
  // Accessing scroll progress for the element referred to by `ref`
  const { scrollYProgress } = useScroll({ target: ref });
  // Applying the parallax custom hook to get a motion value for the y-axis
  const y = useParallax(scrollYProgress, 100);
  // JSX returned by the ContentSection component
  return (
    // Fragment to return multiple elements without adding extra nodes to the DOM
    <>
      {/* Wrapper div for the content section with conditional class names based on props */}
      <div
        className={`
        -mt-30
        flex
        min-h-screen
        w-full
        flex-col-reverse
        items-center overflow-hidden
        sm:mt-52
        lg:mt-0
        ${props.reverse ? "justify-between md:flex-row-reverse" : "md:flex-row"}
      `}
      >
        {/* The motion.div contains the image and will move up/down as the user scrolls (parallax effect) */}
        <motion.div style={{ y }} className={`h-[75vh] w-full md:max-w-[50%]`}>
          {/* Image element with dynamic source and class names */}
          <img
            src={`/assets/images/gallery/${props.image}`}
            alt={props.title}
            className={`h-full w-full ${
              props.reverse ? "ml-4 sm:ml-10" : "-ml-4 sm:-ml-10"
            } object-cover`}
          />
        </motion.div>

        {/* Container for the text content */}
        <div
          ref={ref}
          className={` z-10 mt-10  w-full bg-[#f4f1ec] px-6 md:max-w-[55rem] md:px-10 lg:px-20 `}
        >
          {/* Heading with fade and slide-in animation when it comes into view */}
          <motion.h3
            whileInView={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            initial={{ opacity: 0, x: -10 }}
            className={`mb-4 pt-10 text-3xl text-black lg:text-5xl`}
          >
            {props.title}
          </motion.h3>

          {/* Paragraph with delayed fade and slide-in animation */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.2,
              },
            }}
            className={`
              font-now
              mb-8
              text-sm leading-loose
              text-[#757371]
              sm:text-base
            `}
          >
            {props.description}
          </motion.p>

          {/* Conditional rendering for the call-to-action button with animation */}

          {props.action ? (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.4,
                },
              }}
            >
              <Link
                href={props.action}
                className={`
                    rounded-md
                    border
                    border-black
                    px-8
                    py-3
                    transition
                    duration-150
                    ease-in-out
                    hover:border-[#A87133]
                    hover:bg-[#A87133]
                    hover:text-white
                  `}
              >
                {props.actionTitle}
              </Link>
            </motion.span>
          ) : null}
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default ContentSection;
