// src/components/RotatingText.js
"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ensure this CSS file is created in the same directory or update the path
import "./RotatingText.css"; 

// Helper function to concatenate class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts, // Array of strings to rotate through
    transition = { type: "spring", damping: 25, stiffness: 300 }, // Default transition
    initial = { y: "100%", opacity: 0 }, // Default initial animation state
    animate = { y: 0, opacity: 1 },      // Default animate state
    exit = { y: "-120%", opacity: 0 },    // Default exit animation state
    animatePresenceMode = "wait",       // AnimatePresence mode
    animatePresenceInitial = false,     // AnimatePresence initial prop
    rotationInterval = 2000,            // Time in ms between text rotations
    staggerDuration = 0,                // Duration for staggering character/word animations
    staggerFrom = "first",              // Stagger direction ('first', 'last', 'center', 'random', or an index)
    loop = true,                        // Whether to loop through texts
    auto = true,                        // Whether to auto-rotate texts
    splitBy = "characters",             // How to split text ('characters', 'words', 'lines', or custom string)
    onNext,                             // Callback function when text changes
    mainClassName,                      // ClassName for the main motion.span container
    splitLevelClassName,                // ClassName for the span wrapping each word/line
    elementLevelClassName,              // ClassName for the motion.span wrapping each character/word element
    ...rest                             // Other props to pass to the main motion.span
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Splits text into characters, handling graphemes correctly if Intl.Segmenter is available
  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text); // Fallback for older environments
  };

  // Memoized calculation of elements to animate based on the current text and splitBy prop
  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (!currentText) return []; // Handle case where currentText might be undefined initially

    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word], // Each word is a single "character" in this context
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line], // Each line is a single "character"
        needsSpace: i !== arr.length - 1,
      }));
    }
    // For a custom separator string
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  // Calculates stagger delay for each element
  const getStaggerDelay = useCallback(
    (index, totalElementsInCurrentText) => {
      if (staggerDuration === 0) return 0; // No stagger if duration is 0
      const total = totalElementsInCurrentText;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        // Note: This will generate a new random order on each text change, not a fixed random stagger.
        // For a fixed random stagger, pre-calculate random delays or use a seed.
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration; 
      }
      // If staggerFrom is a number (index)
      if (typeof staggerFrom === 'number') {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return index * staggerDuration; // Default to 'first' if invalid staggerFrom
    },
    [staggerFrom, staggerDuration]
  );

  // Handles changing the current text index and calls onNext callback
  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  // Moves to the next text in the array
  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  // Moves to the previous text in the array
  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  // Jumps to a specific text index
  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  // Resets to the first text
  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  // Exposes control methods (next, previous, jumpTo, reset) via ref
  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
      currentIndex: currentTextIndex,
    }),
    [next, previous, jumpTo, reset, currentTextIndex]
  );

  // Sets up interval for automatic text rotation
  useEffect(() => {
    if (!auto || texts.length <= 1) return; // Don't start interval if auto is false or only one text
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [next, rotationInterval, auto, texts.length]);

  return (
    <motion.span
      className={cn("text-rotate", mainClassName)} // Main container class
      {...rest}
      layout // Enable layout animations
      transition={transition} // Transition for layout changes
    >
      {/* Screen-reader only text for accessibility */}
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      
      {/* AnimatePresence handles enter/exit animations of texts */}
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.div
          key={currentTextIndex} // Key change triggers animation
          className={cn(
            splitBy === "lines" ? "text-rotate-lines" : "text-rotate" // Different class for line splitting
          )}
          layout // Enable layout animations for the div itself
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, wordArray) => {
            // Calculate the count of characters before the current word for accurate stagger delay
            const previousCharsCount = wordArray
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            
            // Calculate total characters in the current text for stagger delay calculation
            const totalCharsInCurrentText = wordArray.reduce(
              (sum, word) => sum + word.characters.length,
              0
            );

            return (
              <span
                key={wordIndex}
                className={cn("text-rotate-word", splitLevelClassName)} // Class for word/line container
              >
                {wordObj.characters.map((char, charIndexInWord) => (
                  <motion.span
                    key={charIndexInWord}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndexInWord, // Overall index of the character/element
                        totalCharsInCurrentText
                      ),
                    }}
                    className={cn("text-rotate-element", elementLevelClassName)} // Class for each animated element
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Render a space if needed after the word/part */}
                {wordObj.needsSpace && (
                  <span className="text-rotate-space"> </span>
                )}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
