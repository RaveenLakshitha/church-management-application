"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import ArrowRight from "@/assets/arrow-right.svg";
import cogImage from "@/assets/cog.png";
import backgroundImage from "@/assets/backgroundimage1.png";
import cylinderImage from "@/assets/cylinder.png";
import birdImage from "@/assets/bird.png";
import Image from "next/image";

export const Hero = () => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(135deg, #d7e8fd 0%, #f9e4d4 100%)",
      "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
    ]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const birdVariants = (xRange: number[], duration: number): Variants => ({
    animate: {
      x: xRange,
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  });

  return (
    <section className="relative pt-8 pb-16 sm:pb-20 md:pt-6 md:pb-24 lg:pb-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
        style={{ backgroundImage: bgColor }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.02] hidden sm:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="w-full lg:w-1/2 px-4 flex flex-col justify-center">
            <motion.h1
              className="text-3xl sm:text-4xl pb-2 lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tighter bg-gradient-to-r from-gray-800 via-slate-700 to-black text-transparent bg-clip-text leading-[1.1] mb-6 sm:mb-8 lg:mb-10"
              variants={itemVariants}
            >
              Transform Your Church Management
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 tracking-tight mt-4 sm:mt-6 leading-relaxed max-w-prose"
              variants={itemVariants}
            >
              Streamline member engagement, simplify administration, and strengthen your community with
              ChurchSync - the all-in-one platform designed specifically for modern churches.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-8 sm:mt-10 lg:mt-12 pt-4"
              variants={itemVariants}
            >
              <motion.button
                className="btn btn-primary bg-gradient-to-r from-gray-800 to-slate-800 hover:from-gray-900 hover:to-slate-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform transition-all duration-200"
                whileTap={{ scale: 0.98 }}
              >
                Start for Free
              </motion.button>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] xl:min-h-[700px] flex-shrink-0">
            <motion.div
              className="absolute -top-6 -right-6 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-full opacity-10 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180],
              }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full opacity-15 blur-lg"
              animate={{
                scale: [1.1, 1, 1.1],
                x: [0, 10, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                className="relative w-full max-w-[800px] lg:max-w-[900px] xl:max-w-[1200px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                style={{ y: 50 }}
              >
                <Image
                  src={backgroundImage}
                  alt="Hero background with church management visuals"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                  className="object-contain"
                  priority
                />
                {/* Bird 1: Middle, slightly left */}
                <motion.div
                  className="absolute top-[45%] left-1/3 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-10"
                  variants={birdVariants([-10, 10, -10], 4)}
                  animate="animate"
                >
                  <Image
                    src={birdImage}
                    alt="Bird overlay 1"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </motion.div>
                {/* Bird 2: Middle, centered */}
                <motion.div
                  className="absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-10"
                  variants={birdVariants([-15, 15, -15], 3.5)}
                  animate="animate"
                >
                  <Image
                    src={birdImage}
                    alt="Bird overlay 2"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </motion.div>
                {/* Bird 3: Adjusted position */}
                <motion.div
                  className="absolute top-[25%] left-1/8 -translate-x-2 -translate-y-1 w-12 h-12 z-10"
                  variants={birdVariants([-15, 15, -15], 3.5)}
                  animate="animate"
                >
                  <Image
                    src={birdImage}
                    alt="Bird overlay 2"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </motion.div>
                {/* Bird 4: Middle, slightly right */}
                <motion.div
                  className="absolute top-[45%] right-1 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-10"
                  variants={birdVariants([-8, 8, -8], 4.5)}
                  animate="animate"
                >
                  <Image
                    src={birdImage}
                    alt="Bird overlay 3"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};