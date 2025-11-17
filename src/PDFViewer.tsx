import { useState } from "react"
import { motion } from "framer-motion"
import { X, Download, Maximize2 } from "lucide-react"
import { Button } from "@/ui/button"

interface PDFViewerProps {
    pdfUrl: string
    title: string
    onClose: () => void
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `${title}.pdf`
        link.click()
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={`bg-gray-900 rounded-lg shadow-2xl flex flex-col ${isFullscreen ? 'w-full h-full' : 'w-full max-w-7xl h-[95vh]'
                    }`}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700 flex-shrink-0">
                    <h3 className="text-lg md:text-xl font-semibold text-white truncate">{title}</h3>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                            onClick={toggleFullscreen}
                        >
                            <Maximize2 size={16} />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300"
                            onClick={handleDownload}
                        >
                            <Download size={16} className="md:mr-2" />
                            <span className="hidden md:inline">Download</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                            onClick={onClose}
                        >
                            <X size={16} />
                        </Button>
                    </div>
                </div>

                {/* PDF Viewer - takes full remaining space */}
                <div className="flex-1 overflow-hidden bg-gray-800">
                    <iframe
                        src={pdfUrl}
                        className="w-full h-full"
                        title={title}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
