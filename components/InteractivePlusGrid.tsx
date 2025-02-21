'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

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
    const bgImages = useRef<HTMLImageElement[]>([]);
    const bgSizeMultipliers = [1.4, 1.7, 1.32, 1.3];
    const isLoaded = useRef<boolean>(false);
    const loadedImagesCount = useRef<number>(0);
    const totalImages = gridWidth * gridHeight + 4;

    // Calculate responsive dimensions
    const calculateDimensions = (windowWidth: number) => {
        // Base content width is 1200px for window width >= 1440px
        const maxContentWidth = 1200;
        const minContentWidth = 320;
        
        // Calculate content width based on window size
        let newContentWidth = Math.min(windowWidth * 0.85, maxContentWidth);
        newContentWidth = Math.max(newContentWidth, minContentWidth);
        
        // Calculate spacing based on content width
        const spacing = newContentWidth / (gridWidth + 1);
        
        // Calculate total grid height (actual space occupied by circles)
        const totalGridHeight = spacing * (gridHeight - 1); // Height between first and last circle
        const canvasHeight = totalGridHeight + spacing * 2.5; // Increased from 3 to 5 for more vertical space
        
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

        bgImageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = handleImageLoad;
            bgImages.current[index] = img;
        });

        // 初始化網格
        const { contentWidth, canvasHeight, spacing, totalGridHeight } = calculateDimensions(window.innerWidth);
        const startX = (c.width - contentWidth) / 2;
        const startY = (canvasHeight - totalGridHeight) / 2; // Center the grid vertically
        
        let imageIndex = 0;

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
            const bgImg = bgImages.current[circle.style];
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

        // Load all images
        const imageUrls = Array.from({ length: gridWidth * gridHeight }, (_, index) => 
            `/ball/${index + 1}.png`
        );

        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                images.current[index] = img;
                handleImageLoad(); // 確保每張圖片加載後都調用handleImageLoad
            };
        });

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

    return (
        <div className="w-full flex flex-col items-center relative">
            <div className="w-full flex justify-center items-center bg-[#F2F2F2] relative">
                <canvas
                    ref={canvasRef}
                    style={{ 
                        width: '100%', 
                        height: '100%'
                    }}
                />
                <div className="absolute left-8 bottom-0 w-72">
                    <img 
                        src="/logo/logo4x.png" 
                        alt="Sense Logo" 
                        className="w-full h-auto"
                    />
                </div>
            </div>
            <div className="w-full relative">
                <div 
                    className="w-full h-48 absolute top-0 left-0 z-20" 
                    style={{
                        background: 'linear-gradient(to bottom, #F2F2F2 0%, rgba(242, 242, 242, 0.95) 15%, rgba(242, 242, 242, 0.8) 30%, rgba(242, 242, 242, 0.6) 45%, rgba(242, 242, 242, 0.4) 60%, rgba(242, 242, 242, 0.2) 75%, rgba(242, 242, 242, 0.1) 85%, transparent 100%)'
                    }}
                />
                <div className="w-full absolute top-0 left-0 z-10">
                    <img 
                        src="/trans.png" 
                        alt="Transition" 
                        className="w-full h-auto"
                    />
                </div>
                <div className="w-full h-96 bg-black" />
            </div>
            <div className="w-full h-96 bg-black" />
        </div>
    );
};

export default InteractivePlusGrid; 