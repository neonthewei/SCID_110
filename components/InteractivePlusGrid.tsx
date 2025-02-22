'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from "framer-motion"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence } from 'framer-motion';

class Circle {
    x: number = 0;
    y: number = 0;
    left: number = 0;
    top: number = 0;
    scale: number = 1;
    style: number = 0;
    imageIndex: number = 0;
    animationTime: number = Math.random() * 100;
    morphStrength: number = 0;
    isHovered: boolean = false;
    radiusPoints: number[][] = Array(64).fill(0).map(() => [0, 0]);
}

// Add new component for large morphing circles
const LargeMorphingCircle = ({ category, index, imageUrl, onHover, activeIndex }: { 
    category: string, 
    index: number, 
    imageUrl: string,
    onHover: (isHovered: boolean, index: number) => void,
    activeIndex: number
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const circle = useRef<Circle>(new Circle());
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const scaleRef = useRef(1);
    const animationFrameRef = useRef<number>();
    const baseFrequency = useRef(Math.random() * 0.3 + 0.7);

    // Update scale with smooth transition
    const updateScale = () => {
        const isActive = activeIndex === index;
        const targetScale = isHovered || isActive ? 1.05 : 1;
        scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const size = 300;
        canvas.width = size;
        canvas.height = size;

        // Initialize circle properties
        circle.current.left = size / 2;
        circle.current.top = size / 2;
        circle.current.scale = 1;
        circle.current.imageIndex = index + 4;

        // Load image
        const img = new Image();
        img.src = `/ball/${index + 1}.png`;

        const animate = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, size, size);
            circle.current.animationTime = (Date.now() * 0.005) % 100;
            
            const morphStrength = 0.3;
            circle.current.morphStrength += (morphStrength - circle.current.morphStrength) * 0.15;

            updateScale();

            ctx.save();
            ctx.translate(size / 2, size / 2);
            ctx.scale(scaleRef.current, scaleRef.current);

            // Calculate morphing points with unique patterns
            const baseRadius = size / 2 * 0.9;
            const points: [number, number][] = [];
            const freq = baseFrequency.current;
            
            for (let i = 0; i < 64; i++) {
                const angle = (i / 64) * Math.PI * 2;
                const t = circle.current.animationTime;
                
                // 根據 index 設定不同的變形模式
                let morph = 0; // 預設值
                switch(index) {
                    case 0: // 溫工藝：較柔和的波動
                        morph = (
                            Math.sin(t * freq + angle * 2) * 0.02 + 
                            Math.sin(t * freq * 0.5 + angle * 3) * 0.015 +
                            Math.sin(t * freq * 0.3 + angle * 4) * 0.01
                        ) * circle.current.morphStrength;
                        break;
                    case 1: // 舒適巢：較大幅度的緩慢波動
                        morph = (
                            Math.sin(t * freq * 0.7 + angle * 2) * 0.03 + 
                            Math.sin(t * freq * 0.4 + angle * 4) * 0.02
                        ) * circle.current.morphStrength;
                        break;
                    case 2: // 冷火花：較銳利的變化
                        morph = (
                            Math.sin(t * freq + angle * 3) * 0.025 + 
                            Math.sin(t * freq * 0.8 + angle * 5) * 0.02 +
                            Math.sin(t * freq * 0.5 + angle * 7) * 0.01
                        ) * circle.current.morphStrength;
                        break;
                    case 3: // 熱對話：活潑的變化
                        morph = (
                            Math.sin(t * freq * 0.9 + angle * 2) * 0.025 + 
                            Math.sin(t * freq * 0.6 + angle * 4) * 0.015 +
                            Math.cos(t * freq * 0.4 + angle * 3) * 0.02
                        ) * circle.current.morphStrength;
                        break;
                }
                
                const radius = baseRadius * (1 + morph);
                points.push([
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius
                ]);
            }

            // Draw morphed shape
            if (img.complete) {
                ctx.beginPath();
                ctx.moveTo(points[0][0], points[0][1]);
                
                for (let i = 0; i < points.length; i++) {
                    const curr = points[i];
                    const next = points[(i + 1) % points.length];
                    const nextNext = points[(i + 2) % points.length];
                    
                    const cp1x = curr[0] + (next[0] - points[(i - 1 + points.length) % points.length][0]) / 4;
                    const cp1y = curr[1] + (next[1] - points[(i - 1 + points.length) % points.length][1]) / 4;
                    const cp2x = next[0] - (nextNext[0] - curr[0]) / 4;
                    const cp2y = next[1] - (nextNext[1] - curr[1]) / 4;
                    
                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next[0], next[1]);
                }
                
                ctx.closePath();
                ctx.clip();

                // Draw the image
                ctx.drawImage(
                    img,
                    -baseRadius * 1.2,
                    -baseRadius * 1.2,
                    baseRadius * 2.4,
                    baseRadius * 2.4
                );

                // Add inner glow
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, baseRadius);
                gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.15)');
                gradient.addColorStop(0.92, 'rgba(255, 255, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
                
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            ctx.restore();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [index, isHovered, activeIndex]);

    return (
        <div 
            className="flex-1 aspect-square relative group cursor-pointer"
            onMouseEnter={() => {
                setIsHovered(true);
                onHover(true, index);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onHover(false, index);
            }}
            onClick={() => {
                localStorage.setItem('selectedCategory', category);
                router.push('/all-works');
            }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
};

const categoryDescriptions = [
    {
        title: 'MildCraft（溫工藝）',
        temperature: '29°S～35°S',
        description: '工藝與材料'
    },
    {
        title: 'CozyNest（舒適巢）',
        temperature: '32°S～38°S',
        description: '空間與家具'
    },
    {
        title: 'ColdSpark（冷火花）',
        temperature: '25°S～31°S',
        description: '科技與互動'
    },
    {
        title: 'HotTalk（熱對話）',
        temperature: '35°S～41°S',
        description: '社會與溝通'
    }
];

const InteractivePlusGrid = () => {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridWidth = 7;
    const gridHeight = 4;
    const circles: Circle[][] = [];
    const baseRadius = useRef<number>(50);
    const contentWidthRef = useRef<number>(1200);
    const contentHeightRef = useRef<number>(600);
    const images = useRef<HTMLImageElement[]>([]);
    const [currentBgIndex, setCurrentBgIndex] = useState(0);
    const [previousBgIndex, setPreviousBgIndex] = useState(2);
    const bgImages = [
        '/reserve/reserve_bg_4.png',
        '/reserve/reserve_bg_2.png',
        '/reserve/reserve_bg_3.png',
    ];
    const bgSizeMultipliers = [1.4, 1.7, 1.32, 1.3];
    const isLoaded = useRef<boolean>(false);
    const loadedImagesCount = useRef<number>(0);
    const totalImages = gridWidth * gridHeight + 4;
    const conceptRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef(null);
    const [canScroll, setCanScroll] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0); // 追蹤當前激活的圓形
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

    const { scrollYProgress } = useScroll({
        target: conceptRef,
        offset: ["start end", "end start"]
    });

    const textOpacity1 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const textOpacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const textOpacity3 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

    // Calculate responsive dimensions
    const calculateDimensions = (windowWidth: number) => {
        // Base content width is 1200px for window width >= 1440px
        const maxContentWidth = 1200;
        const minContentWidth = 320;
        
        // Get window height and calculate aspect ratio
        const windowHeight = window.innerHeight;
        const aspectRatio = windowWidth / windowHeight;
        
        // Calculate content width based on window size
        let newContentWidth = Math.min(windowWidth * 0.85, maxContentWidth);
        newContentWidth = Math.max(newContentWidth, minContentWidth);
        
        // Calculate spacing based on content width
        const spacing = newContentWidth / (gridWidth + 1);
        
        // Calculate total grid height (actual space occupied by circles)
        const totalGridHeight = spacing * (gridHeight - 1); // Height between first and last circle
        
        // Adjust canvas height based on aspect ratio
        let canvasHeight;
        if (aspectRatio >= 1.7) { // 16:9 screens
            canvasHeight = totalGridHeight + spacing * 3;
        } else if (aspectRatio >= 1.5) { // 16:10 and 3:2 screens (like MacBook Pro)
            canvasHeight = totalGridHeight + spacing * 1.8;
        } else { // 4:3 and other screens
            canvasHeight = totalGridHeight + spacing * 3;
        }
        
        // Calculate circle radius based on content width
        const newRadius = Math.max((newContentWidth / maxContentWidth) * 50, 25);
        
        return { 
            contentWidth: newContentWidth,
            canvasHeight: canvasHeight,
            spacing: spacing,
            radius: newRadius,
            totalGridHeight: totalGridHeight
        };
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const c = canvasRef.current;
        const updateCanvasSize = () => {
            // Update dimensions based on window size
            const { contentWidth, canvasHeight, spacing, radius, totalGridHeight } = calculateDimensions(window.innerWidth);
            contentWidthRef.current = contentWidth;
            contentHeightRef.current = canvasHeight;
            baseRadius.current = radius;
            
            // Update canvas size
            c.width = window.innerWidth;
            c.height = canvasHeight;
            
            // Calculate centering
            const startX = (c.width - contentWidth) / 2;
            const startY = (canvasHeight - totalGridHeight) / 2;
            
            // Update circle positions with equal spacing
            circles.forEach((row, i) => {
                row.forEach((circle, j) => {
                    circle.left = startX + spacing * (i + 1);
                    circle.top = startY + spacing * j;
                });
            });
        };

        // Initial canvas setup and dimensions calculation
        updateCanvasSize();
        const context = c.getContext('2d');
        if (!context) return;

        // 初始化滑鼠位置檢查
        const initializeMouseState = () => {
            const rect = c.getBoundingClientRect();
            const event = window.event as MouseEvent | undefined;
            const initialMouseX = event?.clientX || 0;
            const initialMouseY = event?.clientY || 0;
            
            // 檢查滑鼠是否在 canvas 範圍內
            if (
                initialMouseX >= rect.left &&
                initialMouseX <= rect.right &&
                initialMouseY >= rect.top &&
                initialMouseY <= rect.bottom
            ) {
                mouseOver = true;
                mouse.x = initialMouseX - rect.left;
                mouse.y = initialMouseY - rect.top;
                mouseMoved = true;
            }
        };

        // 在組件掛載時檢查滑鼠狀態
        initializeMouseState();

        // Track loaded images
        const handleImageLoad = () => {
            loadedImagesCount.current += 1;
            if (loadedImagesCount.current === totalImages) {
                isLoaded.current = true;
            }
        };

        // 加載背景圖片
        const bgImageUrls = [
            '/reserve/reserve_bg_4.png',
            '/reserve/reserve_bg_3.png',
            '/reserve/reserve_bg_1.png',
            '/reserve/reserve_bg_2.png'
        ];

        // Load all images
        const imageUrls = Array.from({ length: gridWidth * gridHeight }, (_, index) => 
            `/ball/${index + 1}.png`
        );

        // First load background images
        bgImageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = handleImageLoad;
            images.current[index] = img;
        });

        // Then load ball images with offset
        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = handleImageLoad;
            images.current[index + bgImageUrls.length] = img;
        });

        // 初始化網格
        const { contentWidth, canvasHeight, spacing, totalGridHeight } = calculateDimensions(window.innerWidth);
        const startX = (c.width - contentWidth) / 2;
        const startY = (canvasHeight - totalGridHeight) / 2;
        
        let imageIndex = bgImageUrls.length; // Start after background images

        for (let j = 0; j < gridHeight; j++) {
            for (let i = 0; i < gridWidth; i++) {
                if (!circles[i]) circles[i] = [];
                const circle = new Circle();
                circle.left = startX + spacing * (i + 1);
                circle.top = startY + spacing * j;
                circle.imageIndex = imageIndex;
                circle.style = (i + j) % 4;
                circles[i][j] = circle;
                imageIndex++;
            }
        }

        let mouseMoved = false;
        let mouseOver = false;
        const mouse = { x: 0, y: 0 };

        // 繪製圓形函數
        const drawCircle = (context: CanvasRenderingContext2D, circle: Circle) => {
            const img = images.current[circle.imageIndex];
            const bgImg = images.current[circle.style % bgImageUrls.length];  // Use modulo to cycle through background images
            const size = baseRadius.current * 2;
            const baseImageScale = 1.15;
            const scaleBonus = (circle.scale - 1) * 0.1;
            const imageSize = size * (baseImageScale + scaleBonus);

            // Update animation time
            circle.animationTime += 0.005;
            
            // Update morph strength based on hover state
            const targetMorphStrength = circle.isHovered ? 1 : 0;
            circle.morphStrength += (targetMorphStrength - circle.morphStrength) * 0.15;
            
            // Calculate morphing points
            const getMorphedRadius = (angle: number) => {
                const t = circle.animationTime;
                const base = size/2;
                const morph = (
                    Math.sin(t + angle * 2) * 0.02 + 
                    Math.sin(t * 0.7 + angle * 3) * 0.015 +
                    Math.sin(t * 0.4 + angle * 4) * 0.01 +
                    Math.sin(t * 0.2 + angle * 5) * 0.008
                ) * circle.morphStrength;
                return base * (1 + morph);
            };

            // Calculate points around the circle with more points for smoother shape
            for (let i = 0; i < 64; i++) {
                const angle = (i / 64) * Math.PI * 2;
                const radius = getMorphedRadius(angle);
                circle.radiusPoints[i] = [
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius
                ];
            }

            // If image is loaded, draw the morphed shape
            if (img) {
                context.save();

                // Draw background if circle is enlarged
                if (circle.scale > 1 && bgImg) {
                    const bgSize = size * bgSizeMultipliers[circle.style];
                    context.globalAlpha = (circle.scale - 1) / 0.8;
                    context.drawImage(
                        bgImg,
                        -bgSize/2,
                        -bgSize/2,
                        bgSize,
                        bgSize
                    );
                    context.globalAlpha = 1;
                }

                // Create morphed path with bezier curves for smoother shape
                context.beginPath();
                context.moveTo(circle.radiusPoints[0][0], circle.radiusPoints[0][1]);
                
                for (let i = 0; i < 64; i++) {
                    const curr = circle.radiusPoints[i];
                    const next = circle.radiusPoints[(i + 1) % 64];
                    const nextNext = circle.radiusPoints[(i + 2) % 64];
                    
                    // Calculate control points for bezier curve
                    const cp1x = curr[0] + (next[0] - circle.radiusPoints[(i - 1 + 64) % 64][0]) / 4;
                    const cp1y = curr[1] + (next[1] - circle.radiusPoints[(i - 1 + 64) % 64][1]) / 4;
                    const cp2x = next[0] - (nextNext[0] - curr[0]) / 4;
                    const cp2y = next[1] - (nextNext[1] - curr[1]) / 4;
                    
                    // Use cubic bezier curves for even smoother transitions
                    context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next[0], next[1]);
                }
                
                context.closePath();
                context.clip();

                // Draw the main image with increased size
                context.drawImage(
                    img, 
                    -imageSize/2,  // Center the larger image
                    -imageSize/2,
                    imageSize,     // Use the larger size
                    imageSize
                );

                // Draw inner white edge
                const gradient = context.createRadialGradient(0, 0, 0, 0, 0, size/2);
                gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.15)');
                gradient.addColorStop(0.92, 'rgba(255, 255, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
                
                context.fillStyle = gradient;
                context.fill();

                context.restore();
            }
        };

        // 繪製函數
        const draw = () => {
            if (!context) return;
            
            if (mouseOver && mouseMoved) {
                calculateIconPosition();
                mouseMoved = false;
            }

            context.clearRect(0, 0, c.width, c.height);

            circles.forEach(row => {
                row.forEach(circle => {
                    context.save();
                    context.translate(circle.left + circle.x, circle.top + circle.y);
                    context.scale(circle.scale, circle.scale);
                    drawCircle(context, circle);
                    context.restore();
                });
            });

            requestAnimationFrame(draw);
        };

        // 計算位置
        const calculateIconPosition = () => {
            circles.forEach(row => {
                row.forEach(circle => {
                    const radius = baseRadius.current * 1.6;  // Adjusted interaction radius
                    const innerRadius = baseRadius.current * 0.6;
                    const dx = mouse.x - circle.left;
                    const dy = mouse.y - circle.top;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const angle = Math.atan2(dy, dx);

                    if (dist < radius && mouseOver) {
                        circle.isHovered = true;
                        const scale = dist <= innerRadius 
                            ? 1.8 
                            : 1 + (0.8 * (1 - (dist - innerRadius) / (radius - innerRadius)));
                        
                        gsap.to(circle, {
                            duration: 0.3,
                            scale: scale,
                            x: Math.cos(angle) * dist * 0.1,
                            y: Math.sin(angle) * dist * 0.1,
                            ease: "power2.out"
                        });
                    } else if (mouseOver) {
                        circle.isHovered = false;
                        gsap.to(circle, {
                            duration: 0.3,
                            scale: 1,
                            x: Math.cos(angle) * radius * 0.08,
                            y: Math.sin(angle) * radius * 0.08,
                            ease: "power2.out"
                        });
                    } else {
                        circle.isHovered = false;
                        gsap.to(circle, {
                            duration: 0.3,
                            scale: 1,
                            x: 0,
                            y: 0,
                            ease: "power2.out"
                        });
                    }
                });
            });
        };

        // 事件監聽
        const handleMouseMove = (e: MouseEvent) => {
            const rect = c.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouseMoved = true;
        };

        const handleMouseEnter = () => {
            mouseOver = true;
        };

        const handleMouseLeave = () => {
            mouseOver = false;
            // Immediately start transition for all circles
            circles.forEach(row => {
                row.forEach(circle => {
                    circle.isHovered = false;
                    gsap.to(circle, {
                        duration: 0.3,
                        scale: 1,
                        x: 0,
                        y: 0,
                        ease: "power2.out"
                    });
                });
            });
        };

        // 添加點擊處理函數
        const handleClick = (e: MouseEvent) => {
            console.log('Canvas clicked'); // 添加點擊事件觸發日誌
            if (!isLoaded.current) {
                console.log('Images not loaded yet'); // 檢查圖片加載狀態
                return;
            }
            const rect = c.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            console.log('Click position:', { clickX, clickY }); // 記錄點擊位置

            circles.forEach((row, rowIndex) => {
                row.forEach((circle, colIndex) => {
                    const dx = clickX - (circle.left + circle.x);
                    const dy = clickY - (circle.top + circle.y);
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const clickRadius = baseRadius.current * circle.scale;

                    console.log(`Circle [${rowIndex}][${colIndex}]:`, {
                        center: { x: circle.left + circle.x, y: circle.top + circle.y },
                        distance: dist,
                        radius: clickRadius
                    }); // 記錄每個圓的位置和距離

                    if (dist <= clickRadius) {
                        console.log('Circle clicked:', circle.style);
                        const categories = [
                            '溫工藝',
                            '舒適巢',
                            '冷火花',
                            '熱對話'
                        ];
                        localStorage.setItem('selectedCategory', categories[circle.style]);
                        router.push('/all-works');
                    }
                });
            });
        };

        // 添加滑鼠樣式變化
        const updateCursor = (e: MouseEvent) => {
            const rect = c.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            let isOverCircle = false;

            circles.forEach(row => {
                row.forEach(circle => {
                    const dx = mouseX - (circle.left + circle.x);
                    const dy = mouseY - (circle.top + circle.y);
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist <= baseRadius.current) {
                        isOverCircle = true;
                    }
                });
            });

            c.style.cursor = isOverCircle ? 'pointer' : 'default';
        };

        // 開始動畫
        draw();

        // 事件監聽
        console.log('Setting up event listeners');
        window.addEventListener('mousemove', initializeMouseState, { once: true }); // 添加一次性的全局滑鼠移動檢查
        c.addEventListener('click', handleClick, { capture: true });
        c.addEventListener('mousemove', handleMouseMove);
        c.addEventListener('mouseenter', handleMouseEnter);
        c.addEventListener('mouseleave', handleMouseLeave);
        c.addEventListener('mousemove', updateCursor);

        // 事件監聽
        const handleResize = () => {
            updateCanvasSize();
        };

        window.addEventListener('resize', handleResize);

        // 清理
        return () => {
            window.removeEventListener('mousemove', initializeMouseState);
            window.removeEventListener('resize', handleResize);
            c.removeEventListener('click', handleClick, { capture: true });
            c.removeEventListener('mousemove', handleMouseMove);
            c.removeEventListener('mouseenter', handleMouseEnter);
            c.removeEventListener('mouseleave', handleMouseLeave);
            c.removeEventListener('mousemove', updateCursor);
        };
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const trigger = ScrollTrigger.create({
            trigger: conceptRef.current,
            start: "center center",
            end: "center center",
            onEnter: () => {
                setCanScroll(true);
            },
            onLeaveBack: () => {
                setCanScroll(false);
            }
        });

        return () => {
            trigger.kill();
        };
    }, []);

    // Update background image rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousBgIndex(currentBgIndex);
            setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [currentBgIndex]);

    const handleCircleHover = (isHovered: boolean, index: number) => {
        if (isHovered) {
            setHoveredIndex(index);
            setActiveIndex(index);
        } else {
            setHoveredIndex(0);
            setActiveIndex(0);
        }
    };

    const scrollToExhibitionConcept = () => {
        if (conceptRef.current) {
            conceptRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full flex flex-col items-center relative overflow-x-hidden">
            <div className="w-full flex justify-center items-center bg-[#F2F2F2] relative">
                {/* Mobile Image */}
                <div className="block md:hidden w-full">
                    <img 
                        src="/Group 16.png" 
                        alt="Sense Mobile Header"
                        className="w-full h-auto"
                    />
                </div>
                {/* Desktop Interactive Canvas */}
                <div className="hidden md:block w-full">
                    <canvas
                        ref={canvasRef}
                        style={{ 
                            width: '100%', 
                            height: '100%'
                        }}
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
                        <motion.button
                            onClick={scrollToExhibitionConcept}
                            className="text-black p-2 rounded-full hover:bg-black/10 transition-colors"
                            animate={{
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <ChevronDown size={32} />
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="w-full relative">
                <div 
                    className="w-full h-24 absolute top-0 left-0 z-20" 
                    style={{
                        background: 'linear-gradient(to bottom, #F2F2F2 0%, rgba(242, 242, 242, 0.95) 15%, rgba(242, 242, 242, 0.8) 30%, rgba(242, 242, 242, 0.6) 45%, rgba(242, 242, 242, 0.4) 60%, rgba(242, 242, 242, 0.2) 75%, rgba(242, 242, 242, 0.1) 85%, transparent 100%)'
                    }}
                />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 flex justify-center overflow-hidden w-full">
                    <div className="flex items-start">
                        <img 
                            src="/trans.png" 
                            alt="Transition Left" 
                            className="w-auto h-[200px]"
                        />
                        <img 
                            src="/trans.png" 
                            alt="Transition Center" 
                            className="w-auto h-[200px]"
                        />
                        <img 
                            src="/trans.png" 
                            alt="Transition Right" 
                            className="w-auto h-[200px]"
                        />
                    </div>
                </div>
                <div className="w-full h-48 bg-black" />
            </div>
            <div className="w-full bg-black relative" ref={containerRef}>
                <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                    {bgImages.map((img, index) => (
                        <motion.img
                            key={`bg-${index}`}
                            src={img}
                            alt={`Background ${index}`}
                            initial={false}
                            animate={{ 
                                opacity: index === currentBgIndex ? (
                                    index === 0 ? 0.4 :  // 第一張圖 (bg_4)
                                    index === 1 ? 0.3 :  // 第二張圖 (bg_2)
                                    index === 2 ? 0.25   // 第三張圖 (bg_3)
                                    : 0
                                ) : 0,
                                scale: index === currentBgIndex ? (
                                    index === 1 ? 0.85 : 1
                                ) : 0.95,
                                rotate: [0, 360]
                            }}
                            transition={{ 
                                duration: 2,
                                ease: "easeInOut",
                                rotate: {
                                    duration: 20,
                                    ease: "linear",
                                    repeat: Infinity
                                }
                            }}
                            className="w-[100%] sm:w-[100%] md:w-[80%] max-w-[800px] h-auto object-contain absolute sm:max-w-[800px] max-w-[400px]"
                            style={{
                                filter: 'brightness(1.2) contrast(0.9)'
                            }}
                        />
                    ))}
                </div>
                {/* Exhibition Concept */}
                <div 
                    ref={conceptRef}
                    className="w-full max-w-[592px] mx-auto px-4 py-40 relative z-30 min-h-screen flex flex-col justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ opacity: textOpacity1 }}
                        className="mb-8 text-center"
                    >
                        <h2 className="text-[32px] font-bold text-white tracking-wide">
                            °<span className="text-white">Sense</span> 展覽概念
                        </h2>
                    </motion.div>
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            style={{ opacity: textOpacity2 }}
                            className="text-[14px] leading-[24px] text-center text-gray-300"
                        >
                            <p>在這個科技飛速發展、數據與算法主導生活的時代，人與人之間的連結逐漸被冷冰冰的機械感所取代，情感與溫度被稀釋成一串串代碼。</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            style={{ opacity: textOpacity3 }}
                            className="text-[14px] leading-[24px] text-center text-gray-300"
                        >
                            <p>然而，設計以一種悄然且柔和的姿態存在，為世界注入人性的溫暖。</p>
                            <p className="mt-4">每一道曲線、每一個材質選擇、每一個細節，都蘊藏著設計者的情感、溫度與對人的關懷，我們透過設計傳遞溫度、形成連結。</p>
                        </motion.div>
                    </div>
                    {/* Second Scroll Down Button */}
                    <div className="absolute bottom-[78px] left-1/2 transform -translate-x-1/2 z-30 hidden md:block">
                        <motion.button
                            onClick={() => {
                                const circlesSection = document.querySelector('.large-interactive-circles');
                                if (circlesSection) {
                                    const rect = circlesSection.getBoundingClientRect();
                                    const elementTop = window.pageYOffset + rect.top;
                                    const elementHeight = rect.height;
                                    const windowHeight = window.innerHeight;
                                    const windowWidth = window.innerWidth;
                                    
                                    // 根據螢幕寬度調整滾動距離
                                    let scrollDivisor;
                                    if (windowWidth >= 1920) {
                                        scrollDivisor = 8; // 大螢幕使用較小的除數，滾動距離較長
                                    } else {
                                        scrollDivisor = 6; // 一般螢幕使用較大的除數，滾動距離較短
                                    }
                                    
                                    const targetScroll = elementTop - windowHeight / scrollDivisor;
                                    window.scrollTo({
                                        top: targetScroll,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                            animate={{
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <ChevronDown size={32} />
                        </motion.button>
                    </div>
                </div>
            </div>
            {/* <div className="absolute left-10 top-[23%] w-72 z-30">
                <img 
                    src="/logo/logo4x.png" 
                    alt="Sense Logo" 
                    className="w-full h-auto"
                />
            </div> */}
            {/* Large Interactive Circles Section */}
            <div className="w-full bg-black py-48 relative z-30 large-interactive-circles overflow-hidden">
                <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
                    {/* Desktop View */}
                    <div className="hidden md:flex justify-between items-center gap-4">
                        {['溫工藝', '舒適巢', '冷火花', '熱對話'].map((category, index) => (
                            <div key={category} className="scale-90">
                                <LargeMorphingCircle
                                    category={category}
                                    index={index}
                                    imageUrl={`/ball/${index + 1}.png`}
                                    onHover={handleCircleHover}
                                    activeIndex={activeIndex}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Desktop Description Area */}
                    <div className="hidden md:block h-[120px] mt-20 relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                key={hoveredIndex}
                                className="text-center"
                            >
                                <h3 className="text-white text-xl font-bold mb-2">
                                    {categoryDescriptions[hoveredIndex].title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-1">
                                    {categoryDescriptions[hoveredIndex].temperature}
                                </p>
                                <p className="text-gray-300 text-base">
                                    {categoryDescriptions[hoveredIndex].description}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden relative">
                        {/* Circle Display */}
                        <div className="w-[300px] h-[300px] mx-auto relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: slideDirection === 'left' ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: slideDirection === 'left' ? 50 : -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full"
                                >
                                    <LargeMorphingCircle
                                        category={['溫工藝', '舒適巢', '冷火花', '熱對話'][activeIndex]}
                                        index={activeIndex}
                                        imageUrl={`/ball/${activeIndex + 1}.png`}
                                        onHover={handleCircleHover}
                                        activeIndex={activeIndex}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Title with Navigation Buttons */}
                        <div className="relative mt-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: slideDirection === 'left' ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: slideDirection === 'left' ? 20 : -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center mb-2"
                                >
                                    <h3 className="text-white text-xl font-bold mb-2">
                                        {categoryDescriptions[activeIndex].title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-1">
                                        {categoryDescriptions[activeIndex].temperature}
                                    </p>
                                    <p className="text-gray-300 text-base">
                                        {categoryDescriptions[activeIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <button
                                onClick={() => {
                                    setSlideDirection('right');
                                    setActiveIndex((prev) => (prev - 1 + 4) % 4);
                                }}
                                className="absolute left-4 top-2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                aria-label="Previous category"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={() => {
                                    setSlideDirection('left');
                                    setActiveIndex((prev) => (prev + 1) % 4);
                                }}
                                className="absolute right-4 top-2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                aria-label="Next category"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Transition Section */}
            <div className="w-full relative">
                <div 
                    className="w-full h-24 absolute bottom-0 left-0 z-20" 
                    style={{
                        background: 'linear-gradient(to top, rgb(249, 250, 251) 0%, rgba(249, 250, 251, 0.95) 15%, rgba(249, 250, 251, 0.8) 30%, rgba(249, 250, 251, 0.6) 45%, rgba(249, 250, 251, 0.4) 60%, rgba(249, 250, 251, 0.2) 75%, rgba(249, 250, 251, 0.1) 85%, transparent 100%)'
                    }}
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex justify-center overflow-hidden w-full">
                    <div className="flex items-end">
                        <img 
                            src="/trans.png" 
                            alt="Transition Left" 
                            className="w-auto h-[200px] rotate-180"
                        />
                        <img 
                            src="/trans.png" 
                            alt="Transition Center" 
                            className="w-auto h-[200px] rotate-180"
                        />
                        <img 
                            src="/trans.png" 
                            alt="Transition Right" 
                            className="w-auto h-[200px] rotate-180"
                        />
                    </div>
                </div>
                <div className="w-full h-48 bg-black" />
                {/* CTA Button Overlay */}
                <div className="w-full h-48 absolute bottom-32 left-0 z-30 flex items-center justify-center">
                    <button 
                        className="bg-white text-black font-medium py-2 px-4 rounded-xl"
                        onClick={() => window.location.href = '/book-tour'}
                    >
                        立即預約導覽
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InteractivePlusGrid; 