"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowDown, Code, Palette, Zap } from "lucide-react"
import type * as THREE from "three"
import { GLTFCharacter } from "./GLTFCharacter"

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

export default function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
            {/* Floating background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
                        top: "10%",
                        left: "10%",
                    }}
                />
                <div
                    className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
                        top: "60%",
                        right: "10%",
                    }}
                />
                <div
                    className="absolute w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
                        bottom: "20%",
                        left: "20%",
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-xl font-bold">Albert's Portfolio</div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gray-300 transition-colors relative group">
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                            </button>
                            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gray-300 transition-colors relative group">
                                About
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                            </button>
                            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gray-300 transition-colors relative group">
                                Projects
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                            </button>
                            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gray-300 transition-colors relative group">
                                Contact
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-800">
                            <div className="flex flex-col space-y-4">
                                <button onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="hover:text-gray-300 transition-colors text-left">
                                    Home
                                </button>
                                <button onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="hover:text-gray-300 transition-colors text-left">
                                    About
                                </button>
                                <button onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="hover:text-gray-300 transition-colors text-left">
                                    Projects
                                </button>
                                <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="hover:text-gray-300 transition-colors text-left">
                                    Contact
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section with 3D Character */}
            <section id="home" className="min-h-screen flex items-center justify-center px-4 relative pt-20 md:pt-0">
                <div className="max-w-7xl mx-auto w-full h-full">
                    {/* Mobile: Column layout, Desktop: Grid layout */}
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-center h-full">
                        {/* Left side - Text content */}
                        <div className="w-full lg:col-span-1 relative z-10 order-1">
                            <Card className="bg-black/80 backdrop-blur-md border-gray-800 p-6 md:p-8">
                                <div className="space-y-4 md:space-y-6">
                                    <div className="relative">
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent leading-tight">
                                            Albert
                                            <br />
                                            <span className="ml-4 md:ml-8">Huynh</span>
                                        </h1>
                                        <div className="absolute -top-2 -left-2 w-8 h-8 md:w-12 md:h-12 border-2 border-blue-500/30 rounded-full"></div>
                                    </div>

                                    <div className="relative ml-2 md:ml-4">
                                        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-2">Full-Stack Developer &</p>
                                        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6">AI Enthusiast</p>
                                        <div className="absolute -left-2 md:-left-3 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                                    </div>

                                    <p className="text-gray-400 ml-2 md:ml-4 mb-4 md:mb-6 text-sm md:text-base">
                                        Hello! I'm Albert, a passionate full-stack developer using technologies like React, Node.js, Flask, Supabase, and more! I'm really intrigued by using AI, and I'm really excited to learn about new technologies.
                                    </p>

                                    <div className="space-y-3 ml-2 md:ml-4">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 w-full text-sm md:text-base"
                                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            View My Work
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-gray-600 text-white hover:bg-gray-900 bg-transparent w-full text-sm md:text-base"
                                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Get In Touch
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right side - 3D Character */}
                        <div className="w-full lg:col-span-2 relative order-2">
                            <div className="h-64 sm:h-80 md:h-96 lg:h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-2xl md:rounded-3xl overflow-hidden relative">
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

                                {/* Decorative elements - hidden on mobile for cleaner look */}
                                <div className="absolute -top-6 -right-6 w-16 h-16 md:w-32 md:h-32 border-2 border-blue-500/20 rounded-full hidden sm:block"></div>
                                <div className="absolute -bottom-6 -left-6 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 hidden sm:block"></div>
                                <div className="absolute top-1/4 -left-4 w-8 h-8 md:w-16 md:h-16 border border-green-500/20 rounded-full hidden sm:block"></div>

                                {/* Floating text labels */}
                                <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/60 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-gray-700">
                                    <p className="text-xs md:text-sm text-gray-300">Meet 3D Me</p>
                                </div>
                                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-black/60 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-gray-700">
                                    <p className="text-xs md:text-sm text-gray-300">Interactive Experience</p>
                                </div>
                            </div>

                            {/* Instruction text */}
                            <div className="absolute -bottom-8 md:-bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                                <p className="text-xs md:text-sm text-gray-400">Drag to rotate • Scroll to zoom</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ArrowDown className="text-gray-400" size={20} />
                </div>
            </section>

            {/* Diagonal divider */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black transform -skew-y-1 origin-top-left"></div>
            </div>

            {/* About Section */}
            <section id="about" className="py-32 px-4 bg-gradient-to-b from-gray-950 to-black relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Title */}
                        <div className="lg:col-span-4 lg:col-start-2">
                            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                About
                                <br />
                                <span className="ml-8">Me</span>
                            </h2>
                        </div>

                        {/* Content cards - Staggered layout */}
                        <div className="lg:col-span-7 space-y-8">
                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm transform lg:translate-x-8">
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <Code className="text-white" size={20} />
                                        </div>
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

                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm transform lg:-translate-x-4">
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                                            <Palette className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-3">My Free Time!</h3>
                                            <p className="text-gray-300">
                                                When I'm not coding, you can play me in a game of chess, or maybe you can find me in the gym trying to PR my incline dumbbell press.
                                                Or you can find me trying to configure my neovim configuration which is always a work in progress for me 😭                                          </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm transform lg:translate-x-12">
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                            <Zap className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-3">Vision</h3>
                                            <p className="text-gray-300 mb-4">
                                                I'm a Co-Founder of Akknoledge, a platform that connects students with study partners to help them succeed in their academic and career journeys.
                                                I want to design and build platforms that can help people achieve their goals, and learn anything that I can along the way.

                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.slice(0, 11).map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="bg-gray-800 text-white">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Skills floating sidebar */}
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block">
                        <div className="space-y-2">
                            {skills.slice(0).map((skill, index) => (
                                <div
                                    key={skill}
                                    className="bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300 transform hover:scale-105 transition-transform"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section - Masonry-style Layout */}
            <section id="projects" className="py-32 px-4 bg-gradient-to-b from-black to-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            My Projects
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
                    </div>

                    {/* Creative project grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <Card
                                key={index}
                                className={`bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all duration-500 group backdrop-blur-sm ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                                    } ${index === 1 ? "lg:translate-y-8" : ""} ${index === 2 ? "lg:-translate-y-4" : ""}`}
                            >
                                <CardContent className="p-0">
                                    {/* Gradient header */}
                                    <div className={`h-32 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute bottom-4 left-6">
                                            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                        </div>
                                        <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-white/20 rounded-full"></div>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-gray-300 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-300">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-600 text-white hover:bg-gray-800 bg-transparent group-hover:border-white transition-colors"
                                            onClick={() => window.open(project.link, '_blank')}
                                        >
                                            <ExternalLink size={16} className="mr-2" />
                                            View Project
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section - Centered with floating elements */}
            <section id="contact" className="py-32 px-4 relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="relative inline-block mb-8">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Let's Work Together
                        </h2>
                        <div className="absolute -top-8 -right-8 w-16 h-16 border-2 border-blue-500/30 rounded-full"></div>
                        <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm"></div>
                    </div>

                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        I'm always interested in new opportunities and exciting projects. Let's connect and create something amazing
                        together.
                    </p>

                    <div className="flex justify-center gap-6 mb-12">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 transform hover:scale-105 transition-transform"
                            onClick={() => window.open('mailto:albrthuynh@gmail.com', '_blank')}
                        >
                            <Mail size={20} className="mr-2" />
                            Email Me
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-900 bg-transparent transform hover:scale-105 transition-transform"
                            onClick={() => window.open('https://github.com/albrthuynh', '_blank')}
                        >
                            <Github size={20} className="mr-2" />
                            GitHub
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-900 bg-transparent transform hover:scale-105 transition-transform"
                            onClick={() => window.open('https://www.linkedin.com/in/albrthuynh/', '_blank')}
                        >
                            <Linkedin size={20} className="mr-2" />
                            LinkedIn
                        </Button>
                    </div>
                </div>

                {/* Floating background elements */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-gray-800 relative">
                <div className="max-w-6xl mx-auto text-center text-gray-400">
                    <p>&copy; 2025 Albert Huynh. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
