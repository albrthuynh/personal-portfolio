"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowDown, Code, Palette, Zap, Sparkles, Star } from "lucide-react"
import type * as THREE from "three"
import { GLTFCharacter } from "./GLTFCharacter"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Floating orb component
function FloatingOrb({
    position,
    color,
    size = 1,
}: { position: [number, number, number]; color: string; size?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
    )
}

// Animation variants for staggered effects
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
        },
    },
}

const cardVariants = {
    hidden: { 
        opacity: 0, 
        x: -60,
        rotateY: -15,
    },
    visible: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: {
            duration: 1,
        },
    },
}

const projectVariants = {
    hidden: { 
        opacity: 0, 
        y: 80,
        scale: 0.8,
        rotateX: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            duration: 1.2,
        },
    },
}

// Floating particles component
const FloatingParticles = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    animate={{
                        x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                        y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                    style={{
                        left: Math.random() * 100 + "%",
                        top: Math.random() * 100 + "%",
                    }}
                />
            ))}
        </div>
    )
}

export default function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    
    // Refs for scroll animations
    const heroRef = useRef(null)
    const aboutRef = useRef(null)
    const projectsRef = useRef(null)
    const contactRef = useRef(null)
    
    // Scroll progress for parallax effects
    const { scrollY } = useScroll()
    const heroParallax = useTransform(scrollY, [0, 1000], [0, -200])
    const aboutParallax = useTransform(scrollY, [500, 1500], [0, -100])
    
    // In view checks for animations
    const heroInView = useInView(heroRef, { once: true, margin: "-10%" })
    const aboutInView = useInView(aboutRef, { once: true, margin: "-20%" })
    const projectsInView = useInView(projectsRef, { once: true, margin: "-20%" })
    const contactInView = useInView(contactRef, { once: true, margin: "-20%" })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const skills = [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Flask",
        "Firebase",
        "MySQL",
        "Python",
        "Tailwind CSS",
        "Git",
    ]

    const projects = [
        {
            title: "Akknoledge",
            description: "Full-stack study group platform with over 850 users which connects students to other study partners within their own university. Built with React, Node.js, TypeScript, and Firebase.",
            tech: ["React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"],
            link: "https://www.akknoledge.com/",
            color: "from-blue-500 to-purple-600",
        },
        {
            title: "NBAIQ",
            description: "Another Full-stack project which uses machine learning to provide NBA predictions and insights. Built with React, TypeScript, Python/Flask, and Supabase",
            tech: ["React", "TypeScript", "Python", "Flask", "Supabase", "Scikit-learn"],
            link: "https://github.com/albrthuynh/NBAIQ",
            color: "from-green-500 to-teal-600",
        },
        {
            title: "Social Media Assistant",
            description: "An intelligent assistant that predicts viral Reddit posts with 99.12% accuracy using TensorFlow.js. Built with React and a real-time chat interface to help users discover trending content faster.",
            tech: ["React", "JavaScript", "OpenAI API", "TensorFlow.js"],
            link: "https://socialmediaassistantai.onrender.com/",
            color: "from-orange-500 to-red-600",
        },
    ]

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Floating particles for ambiance */}
            <FloatingParticles />
            
            {/* Enhanced floating background elements with parallax */}
            <motion.div 
                className="fixed inset-0 pointer-events-none"
                style={{ y: heroParallax }}
            >
                <motion.div
                    className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
                        top: "10%",
                        left: "10%",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
                        top: "60%",
                        right: "10%",
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
                        bottom: "20%",
                        left: "20%",
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </motion.div>

            {/* Enhanced Navigation with animations */}
            <motion.nav 
                className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <motion.div 
                            className="text-xl font-bold"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Albert's Portfolio
                        </motion.div>

                        {/* Desktop Navigation with staggered animations */}
                        <motion.div 
                            className="hidden md:flex space-x-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <motion.button
                                    key={item}
                                    variants={itemVariants}
                                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-gray-300 transition-colors relative group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item}
                                    <motion.span 
                                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.span>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Mobile menu button with animation */}
                        <motion.button 
                            className="md:hidden" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Enhanced Mobile Navigation */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div 
                                className="md:hidden py-4 border-t border-gray-800"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div 
                                    className="flex flex-col space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                        <motion.button 
                                            key={item}
                                            variants={itemVariants}
                                            onClick={() => { 
                                                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); 
                                                setIsMenuOpen(false); 
                                            }} 
                                            className="hover:text-gray-300 transition-colors text-left transform hover:translate-x-2"
                                            whileHover={{ x: 8 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {item}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* Enhanced Hero Section with 3D Character */}
            <motion.section 
                ref={heroRef}
                id="home" 
                className="min-h-screen flex items-center justify-center px-4 relative pt-20 md:pt-0"
                style={{ y: heroParallax }}
            >
                <div className="max-w-7xl mx-auto w-full h-full">
                    {/* Mobile: Column layout, Desktop: Grid layout */}
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-center h-full">
                        {/* Left side - Text content with enhanced animations */}
                        <motion.div 
                            className="w-full lg:col-span-1 relative z-10 order-1"
                            initial={{ opacity: 0, x: -100 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                <Card className="bg-black/80 backdrop-blur-md border-gray-800 p-6 md:p-8 hover:border-gray-600 transition-all duration-500">
                                    <div className="space-y-4 md:space-y-6">
                                        <motion.div 
                                            className="relative"
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.9 }}
                                        >
                                            <motion.h1 
                                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent leading-tight"
                                                initial={{ backgroundPosition: "0% 50%" }}
                                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                                transition={{ duration: 5, repeat: Infinity }}
                                            >
                                                Albert
                                                <br />
                                                <span className="ml-4 md:ml-8">Huynh</span>
                                            </motion.h1>
                                            <motion.div 
                                                className="absolute -top-2 -left-2 w-8 h-8 md:w-12 md:h-12 border-2 border-blue-500/30 rounded-full"
                                                animate={{ 
                                                    rotate: 360,
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{ 
                                                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                                }}
                                            ></motion.div>
                                        </motion.div>

                                        <motion.div 
                                            className="relative ml-2 md:ml-4"
                                            initial={{ x: -30, opacity: 0 }}
                                            animate={heroInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 1.1 }}
                                        >
                                            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-2">Full-Stack Developer &</p>
                                            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6">AI Enthusiast</p>
                                            <motion.div 
                                                className="absolute -left-2 md:-left-3 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"
                                                initial={{ height: 0 }}
                                                animate={heroInView ? { height: "100%" } : { height: 0 }}
                                                transition={{ duration: 1, delay: 1.3 }}
                                            ></motion.div>
                                        </motion.div>

                                        <motion.p 
                                            className="text-gray-400 ml-2 md:ml-4 mb-4 md:mb-6 text-sm md:text-base"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={heroInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 1.4 }}
                                        >
                                            Hello! I'm Albert, a passionate full-stack developer using technologies like React, Node.js, Flask, Supabase, and more! I'm really intrigued by using AI, and I'm really excited to learn about new technologies.
                                        </motion.p>

                                        <motion.div 
                                            className="space-y-3 ml-2 md:ml-4"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate={heroInView ? "visible" : "hidden"}
                                        >
                                            <motion.div 
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    size="lg"
                                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 w-full text-sm md:text-base transform hover:scale-105 transition-all duration-300"
                                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                                >
                                                    View My Work
                                                </Button>
                                            </motion.div>
                                            <motion.div 
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    size="lg"
                                                    variant="outline"
                                                    className="border-gray-600 text-white hover:bg-gray-900 bg-transparent w-full text-sm md:text-base transform hover:scale-105 transition-all duration-300"
                                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                                >
                                                    Get In Touch
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>

                        {/* Right side - Enhanced 3D Character */}
                        <motion.div 
                            className="w-full lg:col-span-2 relative order-2"
                            initial={{ opacity: 0, x: 100, rotateY: -20 }}
                            animate={heroInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: -20 }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                        >
                            <motion.div 
                                className="h-64 sm:h-80 md:h-96 lg:h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-2xl md:rounded-3xl overflow-hidden relative"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} intensity={1} />
                                    <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
                                    <GLTFCharacter />
                                    <FloatingOrb position={[-3, 1, 0]} color="#3b82f6" size={0.3} />
                                    <FloatingOrb position={[3, -1, 1]} color="#8b5cf6" size={0.2} />
                                    <FloatingOrb position={[0, 3, -1]} color="#10b981" size={0.25} />
                                    <FloatingOrb position={[-1, -2, 2]} color="#f59e0b" size={0.15} />
                                    <FloatingOrb position={[2, 2, -2]} color="#ef4444" size={0.2} />
                                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={2} />
                                    <Environment preset="studio" />
                                    <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2} />
                                </Canvas>

                                {/* Enhanced decorative elements with animations */}
                                <motion.div 
                                    className="absolute -top-6 -right-6 w-16 h-16 md:w-32 md:h-32 border-2 border-blue-500/20 rounded-full hidden sm:block"
                                    animate={{ 
                                        rotate: 360,
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{ 
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                ></motion.div>
                                <motion.div 
                                    className="absolute -bottom-6 -left-6 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 hidden sm:block"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1,
                                    }}
                                ></motion.div>
                                <motion.div 
                                    className="absolute top-1/4 -left-4 w-8 h-8 md:w-16 md:h-16 border border-green-500/20 rounded-full hidden sm:block"
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.2, 0.8, 0.2],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                ></motion.div>

                                {/* Enhanced floating text labels */}
                                <motion.div 
                                    className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/60 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-gray-700"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                                    transition={{ delay: 1.8, duration: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <p className="text-xs md:text-sm text-gray-300">Meet 3D Me</p>
                                </motion.div>
                                <motion.div 
                                    className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-black/60 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-gray-700"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 2, duration: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <p className="text-xs md:text-sm text-gray-300">Interactive Experience</p>
                                </motion.div>
                            </motion.div>

                            {/* Enhanced instruction text */}
                            <motion.div 
                                className="absolute -bottom-8 md:-bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                                initial={{ opacity: 0 }}
                                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 2.2, duration: 1 }}
                            >
                                <p className="text-xs md:text-sm text-gray-400">Drag to rotate • Scroll to zoom</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Enhanced scroll indicator */}
                <motion.div 
                    className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={heroInView ? { 
                        opacity: 1, 
                        y: [0, 10, 0],
                    } : { opacity: 0, y: -20 }}
                    transition={{ 
                        opacity: { delay: 2.5, duration: 1 },
                        y: { 
                            delay: 3.5,
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }
                    }}
                >
                    <ArrowDown className="text-gray-400" size={20} />
                </motion.div>
            </motion.section>

            {/* Diagonal divider */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black transform -skew-y-1 origin-top-left"></div>
            </div>

            {/* Enhanced About Section with scroll animations */}
            <motion.section 
                ref={aboutRef}
                id="about" 
                className="py-32 px-4 bg-gradient-to-b from-gray-950 to-black relative"
                style={{ y: aboutParallax }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Enhanced Title with scroll animation */}
                        <motion.div 
                            className="lg:col-span-4 lg:col-start-2"
                            initial={{ opacity: 0, x: -100 }}
                            animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <motion.h2 
                                className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                                initial={{ backgroundPosition: "0% 50%" }}
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                About
                                <br />
                                <span className="ml-8">Me</span>
                            </motion.h2>
                        </motion.div>

                        {/* Enhanced Content cards with staggered animations */}
                        <motion.div 
                            className="lg:col-span-7 space-y-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate={aboutInView ? "visible" : "hidden"}
                        >
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ scale: 1.02, rotateY: 2 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm transform lg:translate-x-8 hover:border-gray-600 transition-all duration-500">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4">
                                            <motion.div 
                                                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Code className="text-white" size={20} />
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-3">Developer</h3>
                                                <p className="text-gray-300">
                                                    I enjoy building modern web applications with a focus on performance, scalability, and user experience.
                                                    Love working with APIs, especially with AI and machine learning, and I'm always eager to learn new technologies!
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                whileHover={{ scale: 1.02, rotateY: -2 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm transform lg:-translate-x-4 hover:border-gray-600 transition-all duration-500">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4">
                                            <motion.div 
                                                className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Palette className="text-white" size={20} />
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-3">My Free Time!</h3>
                                                <p className="text-gray-300">
                                                    When I'm not coding, you can play me in a game of chess, or maybe you can find me in the gym trying to PR my incline dumbbell press.
                                                    Or you can find me trying to configure my neovim configuration which is always a work in progress for me 😭
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                whileHover={{ scale: 1.02, rotateY: 3 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm transform lg:translate-x-12 hover:border-gray-600 transition-all duration-500">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4">
                                            <motion.div 
                                                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Zap className="text-white" size={20} />
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-3">Vision</h3>
                                                <p className="text-gray-300 mb-4">
                                                    I'm a Co-Founder of Akknoledge, a platform that connects students with study partners to help them succeed in their academic and career journeys.
                                                    I want to design and build platforms that can help people achieve their goals, and learn anything that I can along the way.
                                                </p>
                                                <motion.div 
                                                    className="flex flex-wrap gap-2"
                                                    variants={containerVariants}
                                                    initial="hidden"
                                                    animate={aboutInView ? "visible" : "hidden"}
                                                >
                                                    {skills.slice(0, 11).map((skill, index) => (
                                                        <motion.div
                                                            key={skill}
                                                            variants={itemVariants}
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ delay: index * 0.1 }}
                                                        >
                                                            <Badge variant="secondary" className="bg-gray-800 text-white">
                                                                {skill}
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Enhanced Skills floating sidebar */}
                    <motion.div 
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block"
                        initial={{ opacity: 0, x: 50 }}
                        animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <motion.div 
                            className="space-y-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate={aboutInView ? "visible" : "hidden"}
                        >
                            {skills.slice(11).map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    className="bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300 transform hover:scale-105 transition-transform"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Enhanced Projects Section with stunning animations */}
            <motion.section 
                ref={projectsRef}
                id="projects" 
                className="py-32 px-4 bg-gradient-to-b from-black to-gray-950"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h2 
                            className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            My Projects
                        </motion.h2>
                        <motion.div 
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"
                            initial={{ width: 0 }}
                            animate={projectsInView ? { width: "6rem" } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                    </motion.div>

                    {/* Enhanced Creative project grid */}
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={projectsInView ? "visible" : "hidden"}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={projectVariants}
                                custom={index}
                                whileHover={{ 
                                    scale: 1.05, 
                                    rotateY: 5,
                                    z: 50,
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className={`transform ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                                    } ${index === 1 ? "lg:translate-y-8" : ""} ${index === 2 ? "lg:-translate-y-4" : ""}`}
                            >
                                <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all duration-500 group backdrop-blur-sm h-full">
                                    <CardContent className="p-0 h-full flex flex-col">
                                        {/* Enhanced gradient header with floating elements */}
                                        <motion.div 
                                            className={`h-32 bg-gradient-to-r ${project.color} relative overflow-hidden`}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <motion.div 
                                                className="absolute bottom-4 left-6"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.2 + 1 }}
                                            >
                                                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                            </motion.div>
                                            <motion.div 
                                                className="absolute -top-8 -right-8 w-24 h-24 border-2 border-white/20 rounded-full"
                                                animate={{ 
                                                    rotate: 360,
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{ 
                                                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                                }}
                                            ></motion.div>
                                            
                                            {/* Floating tech icons */}
                                            <motion.div
                                                className="absolute top-2 right-2 w-4 h-4 bg-white/30 rounded-full"
                                                animate={{
                                                    y: [0, -10, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.3,
                                                }}
                                            />
                                            <motion.div
                                                className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full"
                                                animate={{
                                                    y: [0, -8, 0],
                                                    opacity: [0.2, 0.6, 0.2],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    delay: index * 0.4,
                                                }}
                                            />
                                        </motion.div>

                                        <div className="p-6 flex-grow flex flex-col">
                                            <motion.p 
                                                className="text-gray-300 mb-4 flex-grow"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.2 + 1.2 }}
                                            >
                                                {project.description}
                                            </motion.p>
                                            
                                            <motion.div 
                                                className="flex flex-wrap gap-2 mb-6"
                                                variants={containerVariants}
                                                initial="hidden"
                                                animate={projectsInView ? "visible" : "hidden"}
                                            >
                                                {project.tech.map((tech, techIndex) => (
                                                    <motion.div
                                                        key={tech}
                                                        variants={itemVariants}
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ delay: techIndex * 0.05 }}
                                                    >
                                                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
                                                            {tech}
                                                        </Badge>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                            
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent group-hover:border-white transition-colors w-full"
                                                    onClick={() => window.open(project.link, '_blank')}
                                                >
                                                    <ExternalLink size={16} className="mr-2" />
                                                    View Project
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Enhanced Contact Section with mesmerizing animations */}
            <motion.section 
                ref={contactRef}
                id="contact" 
                className="py-32 px-4 relative overflow-hidden"
            >
                {/* Animated background elements */}
                <motion.div 
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div 
                        className="relative inline-block mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={contactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <motion.h2 
                            className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            Let's Work Together
                        </motion.h2>
                        
                        {/* Floating decorative elements */}
                        <motion.div 
                            className="absolute -top-8 -right-8 w-16 h-16 border-2 border-blue-500/30 rounded-full"
                            animate={{ 
                                rotate: 360,
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{ 
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity },
                                opacity: { duration: 3, repeat: Infinity }
                            }}
                        ></motion.div>
                        <motion.div 
                            className="absolute -bottom-4 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.4, 0.8, 0.4],
                                x: [0, 10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: 1,
                            }}
                        ></motion.div>
                    </motion.div>

                    <motion.p 
                        className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        I'm always interested in new opportunities and exciting projects. Let's connect and create something amazing
                        together.
                    </motion.p>

                    <motion.div 
                        className="flex justify-center gap-6 mb-12 flex-wrap"
                        variants={containerVariants}
                        initial="hidden"
                        animate={contactInView ? "visible" : "hidden"}
                    >
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                                onClick={() => window.open('mailto:albrthuynh@gmail.com', '_blank')}
                            >
                                <Mail size={20} className="mr-2" />
                                Email Me
                            </Button>
                        </motion.div>
                        
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-900 bg-transparent transform transition-all duration-300 hover:border-white"
                                onClick={() => window.open('https://github.com/albrthuynh', '_blank')}
                            >
                                <Github size={20} className="mr-2" />
                                GitHub
                            </Button>
                        </motion.div>
                        
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-900 bg-transparent transform transition-all duration-300 hover:border-white"
                                onClick={() => window.open('https://www.linkedin.com/in/albrthuynh/', '_blank')}
                            >
                                <Linkedin size={20} className="mr-2" />
                                LinkedIn
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced floating background elements */}
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                ></motion.div>
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                        x: [0, -40, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                ></motion.div>
            </motion.section>

            {/* Enhanced Footer */}
            <motion.footer 
                className="py-8 px-4 border-t border-gray-800 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <div className="max-w-6xl mx-auto text-center text-gray-400">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        &copy; 2025 Albert Huynh. All rights reserved.
                    </motion.p>
                </div>
            </motion.footer>
        </div>
    )
}
