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
}

const InteractivePlusGrid = () => {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridWidth = 7;
    const gridHeight = 4;
    const circles: Circle[][] = [];
    const baseRadius = 50;
    const images = useRef<HTMLImageElement[]>([]);
    const bgImages = useRef<HTMLImageElement[]>([]);
    const bgSizeMultipliers = [1.4, 1.7, 1.32, 1.3]; // 為每個背景圖片設置不同的大小倍率

    useEffect(() => {
        if (!canvasRef.current) return;

        const c = canvasRef.current;
        c.width = window.innerWidth;
        c.height = 800;
        const context = c.getContext('2d');
        if (!context) return;

        // 加載背景圖片
        const bgImageUrls = [
            '/reserve/reserve_bg_4.png',  // for ball2
            '/reserve/reserve_bg_3.png',  // for ball1
            '/reserve/reserve_bg_1.png',  // for ball3
            '/reserve/reserve_bg_2.png'   // for ball4
        ];

        bgImageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                bgImages.current[index] = img;
            };
        });

        // 加載圖片
        const imageUrls = [
            '/ball/ball2.png',
            '/ball/ball1.png',
            '/ball/ball3.png',
            '/ball/ball4.png'
        ];

        // 初始化網格
        const contentWidth = 1200;
        const startX = (c.width - contentWidth) / 2;

        for (let i = 0; i < gridWidth; i++) {
            circles[i] = [];
            for (let j = 0; j < gridHeight; j++) {
                const circle = new Circle();
                circle.left = startX + (contentWidth / (gridWidth + 1) * (i + 1));
                circle.top = c.height / (gridHeight + 1) * (j + 1);
                circle.style = (i + j) % 4;
                circles[i][j] = circle;
            }
        }

        let mouseMoved = false;
        let mouseOver = false;
        const mouse = { x: 0, y: 0 };

        // 繪製圓形函數
        const drawCircle = (context: CanvasRenderingContext2D, circle: Circle) => {
            const img = images.current[circle.style];
            const bgImg = bgImages.current[circle.style];
            const size = baseRadius * 2;

            // 如果圖片已加載，則繪製圖片
            if (img) {
                context.save();

                // 如果圓形被放大且背景圖片已加載，先繪製背景
                if (circle.scale > 1 && bgImg) {
                    const bgSize = size * bgSizeMultipliers[circle.style];
                    context.globalAlpha = (circle.scale - 1) / 0.8; // 根據放大程度調整透明度
                    context.drawImage(
                        bgImg,
                        -bgSize/2,
                        -bgSize/2,
                        bgSize,
                        bgSize
                    );
                    context.globalAlpha = 1;
                }

                // 繪製主圖片
                context.beginPath();
                context.arc(0, 0, size/2, 0, Math.PI * 2);
                context.clip();
                context.drawImage(
                    img, 
                    -size/2, 
                    -size/2, 
                    size, 
                    size
                );

                // 繪製內部白色邊緣
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
                    const radius = 80;
                    const innerRadius = 30; // 內圈範圍，在這個範圍內保持最大尺寸
                    const dx = mouse.x - circle.left;
                    const dy = mouse.y - circle.top;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const angle = Math.atan2(dy, dx);

                    if (dist < radius && mouseOver) {
                        // 在內圈範圍內保持最大尺寸，超過後才開始縮小
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
                        gsap.to(circle, {
                            duration: 0.3,
                            scale: 1,
                            x: Math.cos(angle) * radius * 0.08,
                            y: Math.sin(angle) * radius * 0.08,
                            ease: "power2.out"
                        });
                    } else {
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
            calculateIconPosition();
        };

        // 添加點擊處理函數
        const handleClick = (e: MouseEvent) => {
            const rect = c.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // 檢查是否點擊到任何圓形
            circles.forEach(row => {
                row.forEach(circle => {
                    const dx = clickX - (circle.left + circle.x);
                    const dy = clickY - (circle.top + circle.y);
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist <= baseRadius) {
                        // 根據圓形的style決定分類
                        const categories = [
                            '溫工藝',  // 50°S
                            '舒適巢',  // 25°S
                            '冷火花',  // -20°S
                            '熱對話'   // 80°S
                        ];
                        // 將選中的分類存儲到 localStorage
                        localStorage.setItem('selectedCategory', categories[circle.style]);
                        // 跳轉到作品總覽頁面
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

                    if (dist <= baseRadius) {
                        isOverCircle = true;
                    }
                });
            });

            c.style.cursor = isOverCircle ? 'pointer' : 'default';
        };

        // 開始動畫
        draw();

        // 加載圖片
        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                images.current[index] = img;
            };
        });

        // 事件監聽
        c.addEventListener('mousemove', handleMouseMove);
        c.addEventListener('mouseenter', handleMouseEnter);
        c.addEventListener('mouseleave', handleMouseLeave);
        c.addEventListener('click', handleClick);
        c.addEventListener('mousemove', updateCursor);

        // 事件監聽
        const handleResize = () => {
            c.width = window.innerWidth;
            const newStartX = (c.width - contentWidth) / 2;
            
            circles.forEach((row, i) => {
                row.forEach((circle, j) => {
                    circle.left = newStartX + (contentWidth / (gridWidth + 1) * (i + 1));
                });
            });
        };

        window.addEventListener('resize', handleResize);

        // 清理
        return () => {
            window.removeEventListener('resize', handleResize);
            c.removeEventListener('mousemove', handleMouseMove);
            c.removeEventListener('mouseenter', handleMouseEnter);
            c.removeEventListener('mouseleave', handleMouseLeave);
            c.removeEventListener('click', handleClick);
            c.removeEventListener('mousemove', updateCursor);
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center relative">
            <div className="w-full flex justify-center items-center bg-[#F2F2F2] relative">
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '800px' }}
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
            <div className="w-full h-96 bg-black">
            </div>
        </div>
    );
};

export default InteractivePlusGrid; 