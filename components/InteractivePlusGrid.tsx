"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import React from "react";

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
  opacity: number = 0.15; // Default opacity when not hovered
  textOpacity: number = 0; // For text rotation animation
  rotationAngle: number = Math.random() * Math.PI * 2; // Random starting rotation angle
  rotationSpeed: number = 0.0015; // Base rotation speed (slower)
  targetRotationSpeed: number = 0.0015; // Target rotation speed
  radiusPoints: number[][] = Array(64)
    .fill(0)
    .map(() => [0, 0]);
}

// Define category data with names and colors
const categoryData = [
  {
    zhName: "溫工藝",
    enName: "+MILDCRAFT",
    color: "#DA6615",
    temperature: "29°S～35°S",
    description: "工藝與材料",
    longDescription:
      "用雙手傳遞溫暖，塑造希望的形狀。這不僅是藝術，更是一種人與物之間的流動——從手心到物品，讓關懷不再只是語言，而是得以觸摸的溫度。",
  },
  {
    zhName: "舒適巢",
    enName: "+COZYNEST",
    color: "#8CBB28",
    temperature: "19°S～25°S",
    description: "家居與兒童",
    longDescription:
      "室溫穩定而舒適，均勻地散布於空間中，帶來安心與放鬆。指尖觸碰木質與織物，感受微妙的溫差變化，讓身體自然沉浸在柔和與安穩之中。",
  },
  {
    zhName: "冷火花",
    enName: "+CHILL SPARKS",
    color: "#3DB5E9",
    temperature: "5°S、130～140°S",
    description: "科技與載具",
    longDescription:
      "冰冷的材質勾勒出理性的輪廓，內裡卻蘊含精密的技術與人性化的考量。每次觸碰都能感受到隱藏其中的細緻，讓科技與生活在低調與溫暖之間達成微妙的平衡。",
  },
  {
    zhName: "熱對話",
    enName: "+CULTURAL BREW",
    color: "#C3206D",
    temperature: "85°S～100°S",
    description: "社會與推測",
    longDescription:
      "有價值的對話不僅是交換觀點，更是讓思維層層加溫。文化的演進、議題的探索、未來的推測，皆在不斷升溫的對話中翻騰、交融。",
  },
];

// Use the categoryData instead of the old categoryDescriptions
const categoryDescriptions = categoryData;

// Add new component for large morphing circles
const LargeMorphingCircle = ({
  category,
  index,
  imageUrl,
  onHover,
  activeIndex,
  isLowerGrid = false,
}: {
  category: string;
  index: number;
  imageUrl: string;
  onHover: (isHovered: boolean, index: number) => void;
  activeIndex: number;
  isLowerGrid?: boolean;
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
    // 将目标缩放比例保持为较小的值，避免超出容器
    // 只进行视觉上的放大，不会影响实际尺寸
    const targetScale = isHovered || isActive ? 1.08 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.15;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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
    img.src = imageUrl;

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, size, size);
      circle.current.animationTime = (Date.now() * 0.005) % 100;

      // Keep the hover-based morph strength variation
      const morphStrength = isHovered ? 0.4 : 0.3;
      circle.current.morphStrength +=
        (morphStrength - circle.current.morphStrength) * 0.15;

      updateScale();

      ctx.save();
      ctx.translate(size / 2, size / 2);

      // 这里应用缩放，但在画布的中心缩放，不会超出边界
      // 注意保留一些边缘空间防止接触容器边缘
      const safeScale = Math.min(scaleRef.current, 1.08);
      ctx.scale(safeScale, safeScale);

      // Calculate morphing points with unique patterns
      const baseRadius = (size / 2) * 0.9;
      const points: [number, number][] = [];
      const freq = baseFrequency.current;

      for (let i = 0; i < 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        const t = circle.current.animationTime;

        // 根據 index 設定不同的變形模式
        let morph = 0; // 預設值
        const hoverMultiplier = isHovered || activeIndex === index ? 1.3 : 1.0; // 悬停时增强变形

        switch (index) {
          case 0: // 溫工藝：較柔和的波動
            morph =
              (Math.sin(t * freq + angle * 2) * 0.02 +
                Math.sin(t * freq * 0.5 + angle * 3) * 0.015 +
                Math.sin(t * freq * 0.3 + angle * 4) * 0.01) *
              circle.current.morphStrength *
              hoverMultiplier;
            break;
          case 1: // 舒適巢：較大幅度的緩慢波動
            morph =
              (Math.sin(t * freq * 0.7 + angle * 2) * 0.03 +
                Math.sin(t * freq * 0.4 + angle * 4) * 0.02) *
              circle.current.morphStrength *
              hoverMultiplier;
            break;
          case 2: // 冷火花：較銳利的變化
            morph =
              (Math.sin(t * freq + angle * 3) * 0.025 +
                Math.sin(t * freq * 0.8 + angle * 5) * 0.02 +
                Math.sin(t * freq * 0.5 + angle * 7) * 0.01) *
              circle.current.morphStrength *
              hoverMultiplier;
            break;
          case 3: // 熱對話：活潑的變化
            morph =
              (Math.sin(t * freq * 0.9 + angle * 2) * 0.025 +
                Math.sin(t * freq * 0.6 + angle * 4) * 0.015 +
                Math.cos(t * freq * 0.4 + angle * 3) * 0.02) *
              circle.current.morphStrength *
              hoverMultiplier;
            break;
        }

        const radius = baseRadius * (1 + morph);
        points.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
      }

      // Draw morphed shape
      if (img.complete) {
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);

        for (let i = 0; i < points.length; i++) {
          const curr = points[i];
          const next = points[(i + 1) % points.length];
          const nextNext = points[(i + 2) % points.length];

          const cp1x =
            curr[0] +
            (next[0] - points[(i - 1 + points.length) % points.length][0]) / 4;
          const cp1y =
            curr[1] +
            (next[1] - points[(i - 1 + points.length) % points.length][1]) / 4;
          const cp2x = next[0] - (nextNext[0] - curr[0]) / 4;
          const cp2y = next[1] - (nextNext[1] - curr[1]) / 4;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next[0], next[1]);
        }

        ctx.closePath();
        ctx.clip();

        // Set opacity based on hover state
        const imageOpacity = isLowerGrid
          ? 1
          : isHovered || activeIndex === index
          ? 1
          : 0.15;
        ctx.globalAlpha = imageOpacity;

        // Draw the image
        ctx.drawImage(
          img,
          -baseRadius * 1.2,
          -baseRadius * 1.2,
          baseRadius * 2.4,
          baseRadius * 2.4
        );

        // Reset opacity for gradient
        ctx.globalAlpha = 1;

        // Add inner glow - 增强发光效果
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, baseRadius);

        if (isLowerGrid) {
          // For lower grid circles, use the more subtle hover-state gradient
          // regardless of hover state
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
          gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.18)");
          gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.25)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.35)");
        } else {
          // For top grid circles, keep the hover-dependent gradient
          if (isHovered || activeIndex === index) {
            // 悬停时的强烈发光效果 - 也往内移动
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.18)");
            gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.25)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.35)");
          } else {
            // 正常状态的发光效果 - 中心透明度高，边缘完全不透明
            gradient.addColorStop(0.3, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
            gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.3)");
            gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.6)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
          }
        }

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
  }, [index, isHovered, activeIndex, imageUrl, isLowerGrid]);

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
        localStorage.setItem("selectedCategory", category);
        router.push("/all-works");
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

// 添加一個輔助函數來處理文本中的破折號換行
const formatDescription = (text: string) => {
  // 在破折號處分割文本
  const parts = text.split("——");
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}——
        <br />
        {parts[1]}
      </>
    );
  }

  // 在句號處分割文本
  const sentences = text.split("。");
  if (sentences.length > 1) {
    return (
      <>
        {sentences.map((sentence, index) =>
          index < sentences.length - 1 ? (
            <React.Fragment key={index}>
              {sentence}。<br />
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{sentence}</React.Fragment>
          )
        )}
      </>
    );
  }

  return text;
};

const InteractivePlusGrid = () => {
  // Add this near the top of the component to load the custom font
  useEffect(() => {
    // Load the custom font
    const loadFont = async () => {
      const fontFace = new FontFace(
        "FuturaCyrillicBook",
        "url(/FuturaCyrillicBook.ttf)"
      );

      try {
        // Wait for the font to load
        const loadedFont = await fontFace.load();

        // Add the loaded font to the document
        document.fonts.add(loadedFont);

        // Force a re-render to apply the new font
        setFontLoaded(true);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    loadFont();
  }, []);

  const [fontLoaded, setFontLoaded] = useState(false);

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
    "/reserve/reserve_bg_4.png",
    "/reserve/reserve_bg_2.png",
    "/reserve/reserve_bg_3.png",
  ];
  const bgSizeMultipliers = [1.4, 1.7, 1.32, 1.3];
  const isLoaded = useRef<boolean>(false);
  const loadedImagesCount = useRef<number>(0);
  const totalImages = gridWidth * gridHeight;
  const conceptRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0); // 追蹤當前激活的圓形
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: conceptRef,
    offset: ["start end", "end start"],
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
    if (aspectRatio >= 1.7) {
      // 16:9 screens
      canvasHeight = totalGridHeight + spacing * 3;
    } else if (aspectRatio >= 1.5) {
      // 16:10 and 3:2 screens (like MacBook Pro)
      canvasHeight = totalGridHeight + spacing * 1.8;
    } else {
      // 4:3 and other screens
      canvasHeight = totalGridHeight + spacing * 3;
    }

    // Calculate circle radius based on content width
    const newRadius = Math.max((newContentWidth / maxContentWidth) * 50, 25);

    return {
      contentWidth: newContentWidth,
      canvasHeight: canvasHeight,
      spacing: spacing,
      radius: newRadius,
      totalGridHeight: totalGridHeight,
    };
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const c = canvasRef.current;
    const updateCanvasSize = () => {
      // Update dimensions based on window size
      const { contentWidth, canvasHeight, spacing, radius, totalGridHeight } =
        calculateDimensions(window.innerWidth);
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
    const context = c.getContext("2d");
    if (!context) return;

    // 初始化滑鼠位置檢查
    const initializeMouseState = () => {
      // 如果是移動設備，不執行初始化
      if (window.innerWidth < 768) {
        return;
      }

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

    // Load ball images
    const imageUrls = Array.from(
      { length: gridWidth * gridHeight },
      (_, index) => `/ball/${index + 1}.png`
    );

    // Load ball images
    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = handleImageLoad;
      images.current[index] = img;
    });

    // 初始化網格
    const { contentWidth, canvasHeight, spacing, totalGridHeight } =
      calculateDimensions(window.innerWidth);
    const startX = (c.width - contentWidth) / 2;
    const startY = (canvasHeight - totalGridHeight) / 2;

    let imageIndex = 0; // Start after background images

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

    // 繪製函數
    const draw = () => {
      if (!context) return;

      if (mouseOver && mouseMoved) {
        calculateIconPosition();
        mouseMoved = false;
      }

      context.clearRect(0, 0, c.width, c.height);

      // First pass: Draw all circle backgrounds
      circles.forEach((row) => {
        row.forEach((circle) => {
          context.save();
          context.translate(circle.left + circle.x, circle.top + circle.y);
          context.scale(circle.scale, circle.scale);

          // Only draw the circle, not the text
          drawCircleBackground(context, circle);

          context.restore();
        });
      });

      // Second pass: Draw text for hovered circles on top of everything
      circles.forEach((row) => {
        row.forEach((circle) => {
          if (circle.isHovered) {
            context.save();
            context.translate(circle.left + circle.x, circle.top + circle.y);
            context.scale(circle.scale, circle.scale);

            // Only draw the text
            drawCircleText(context, circle);

            context.restore();
          }
        });
      });

      requestAnimationFrame(draw);
    };

    // Split the drawCircle function into background and text functions
    const drawCircleBackground = (
      context: CanvasRenderingContext2D,
      circle: Circle
    ) => {
      const img = images.current[circle.imageIndex];
      const size = baseRadius.current * 2;
      const baseImageScale = 1.15;
      const scaleBonus = (circle.scale - 1) * 0.1;
      const imageSize = size * (baseImageScale + scaleBonus);

      // Update opacity with smooth transition - using the same easing as scale
      const targetOpacity = circle.isHovered ? 1 : 0.15;
      // Only do the transition for top grid circles
      circle.opacity += (targetOpacity - circle.opacity) * 0.15;

      // Update text opacity with smooth transition
      const targetTextOpacity = circle.isHovered ? 1 : 0;
      circle.textOpacity += (targetTextOpacity - circle.textOpacity) * 0.1;

      // Update rotation speed based on hover state with more dramatic change
      circle.targetRotationSpeed = circle.isHovered ? 0.006 : 0.0008; // Slower speeds (was 0.015/0.0015)
      circle.rotationSpeed +=
        (circle.targetRotationSpeed - circle.rotationSpeed) * 0.03; // Smoother transition

      // Update rotation angle
      circle.rotationAngle += circle.rotationSpeed;
      if (circle.rotationAngle > Math.PI * 2) {
        circle.rotationAngle -= Math.PI * 2; // Keep angle between 0 and 2π
      }

      // Use perfect circle instead of morphed shape
      if (img) {
        context.save();

        // Create perfect circle path
        context.beginPath();
        context.arc(0, 0, size / 2, 0, Math.PI * 2); // Simple circle with radius = size/2
        context.closePath();
        context.clip();

        // Set opacity using the smoothly transitioning opacity property
        context.globalAlpha = circle.opacity;

        // Draw the main image with increased size
        context.drawImage(
          img,
          -imageSize / 2, // Center the larger image
          -imageSize / 2,
          imageSize, // Use the larger size
          imageSize
        );

        // Reset opacity for gradient
        context.globalAlpha = 1;

        // Draw inner white edge
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, size / 2);

        if (circle.isHovered) {
          // Hover state gradient - 也往内移动
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
          gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.15)");
          gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.2)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)");
        } else {
          // Non-hover state - higher transparency in center, full opacity at edge
          gradient.addColorStop(0.3, "rgba(255, 255, 255, 0)");
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
          gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.3)");
          gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.6)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
        }

        context.fillStyle = gradient;
        context.fill();

        context.restore();
      }
    };

    // New function just for drawing the text
    const drawCircleText = (
      context: CanvasRenderingContext2D,
      circle: Circle
    ) => {
      if (!circle.isHovered) return;

      const size = baseRadius.current * 2;
      const categoryStyle = circle.style % 4;
      const category = categoryData[categoryStyle];

      context.save();

      // Get the category color
      const categoryColor = category.color;

      // Calculate full circle radius for text placement
      const textRadius = (size / 2) * 1.35;

      // Only draw English text rotating around the entire circle
      const enText = category.enName;

      // Calculate font size proportional to circle size
      const enFontSize = Math.round(baseRadius.current * 0.36);

      // Set font for English text - use FuturaCyrillicBook font with normal weight instead of bold
      context.font = `normal ${enFontSize}px 'FuturaCyrillicBook', 'Futura', sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      // Use smooth fade-in effect for the text
      context.globalAlpha = circle.textOpacity;

      // Apply overall rotation to the entire text arc
      context.rotate(circle.rotationAngle);

      // Customize arc length based on category
      let arcLength;
      switch (categoryStyle) {
        case 0: // MILDCRAFT
          arcLength = Math.PI * 0.45; // 90 degrees
          break;
        case 1: // COZYNEST
          arcLength = Math.PI * 0.42; // 81 degrees
          break;
        case 2: // CHILL SPARKS
          arcLength = Math.PI * 0.55; // 108 degrees
          break;
        case 3: // CULTURAL BREW
          arcLength = Math.PI * 0.6; // 108 degrees
          break;
        default:
          arcLength = Math.PI * 0.55; // Default (99 degrees)
      }

      // Use a fixed starting position at the top of the circle
      const startAngle = -Math.PI / 2 - arcLength / 2; // Center at the top

      // Improve letter spacing by calculating relative character widths
      const totalChars = enText.length;

      // Pre-calculate character widths to determine relative spacing
      const charWidths = [];
      let totalWidth = 0;

      // Calculate the width of each character
      for (let i = 0; i < totalChars; i++) {
        const char = enText[i];
        const charWidth = context.measureText(char).width;
        charWidths.push(charWidth);
        totalWidth += charWidth;
      }

      // Calculate normalized position for each character
      const positions = [];
      let runningWidth = 0;

      for (let i = 0; i < totalChars; i++) {
        // For first character, start at 0
        if (i === 0) {
          positions.push(0);
        } else {
          // For subsequent characters, position based on cumulative width
          // Add a small fixed space between characters (adjust 0.5 as needed)
          runningWidth += (charWidths[i - 1] + charWidths[i]) * 0.5;
          positions.push(runningWidth / totalWidth);
        }
      }

      // Draw each letter around the arc with improved spacing
      for (let i = 0; i < totalChars; i++) {
        // Calculate position using normalized position
        const normalizedPos = positions[i] / (positions[totalChars - 1] || 1);
        const angle = startAngle + normalizedPos * arcLength;

        // Convert angle to x,y coordinates on the circle
        const x = Math.cos(angle) * textRadius;
        const y = Math.sin(angle) * textRadius;

        context.save();
        context.translate(x, y);
        context.rotate(angle + Math.PI / 2); // Rotate characters to face outward

        // Draw the letter
        context.fillStyle = categoryColor;
        context.fillText(enText[i], 0, 0);
        context.restore();
      }

      context.restore();
    };

    // Replace the existing drawCircle function with a stub that calls the appropriate function
    const drawCircle = (context: CanvasRenderingContext2D, circle: Circle) => {
      drawCircleBackground(context, circle);
      if (circle.isHovered) {
        drawCircleText(context, circle);
      }
    };

    // 計算位置
    const calculateIconPosition = () => {
      circles.forEach((row) => {
        row.forEach((circle) => {
          const radius = baseRadius.current * 1.6; // Adjusted interaction radius
          const innerRadius = baseRadius.current * 0.6;
          const dx = mouse.x - circle.left;
          const dy = mouse.y - circle.top;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const angle = Math.atan2(dy, dx);

          if (dist < radius && mouseOver) {
            // Add a temporary speed boost when entering hover state
            if (!circle.isHovered) {
              circle.rotationSpeed = 0.025; // Quick burst of speed on hover entry
            }

            circle.isHovered = true;
            const scale =
              dist <= innerRadius
                ? 1.8
                : 1 + 0.8 * (1 - (dist - innerRadius) / (radius - innerRadius));

            gsap.to(circle, {
              duration: 0.3,
              scale: scale,
              x: Math.cos(angle) * dist * 0.1,
              y: Math.sin(angle) * dist * 0.1,
              ease: "power2.out",
            });
          } else if (mouseOver) {
            // Add a temporary speed boost when leaving hover state
            if (circle.isHovered) {
              circle.rotationSpeed = 0.015; // Quick burst of speed on hover exit
            }

            circle.isHovered = false;
            gsap.to(circle, {
              duration: 0.3,
              scale: 1,
              x: Math.cos(angle) * radius * 0.08,
              y: Math.sin(angle) * radius * 0.08,
              ease: "power2.out",
            });
          } else {
            circle.isHovered = false;
            gsap.to(circle, {
              duration: 0.3,
              scale: 1,
              x: 0,
              y: 0,
              ease: "power2.out",
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
      circles.forEach((row) => {
        row.forEach((circle) => {
          circle.isHovered = false;
          gsap.to(circle, {
            duration: 0.3,
            scale: 1,
            x: 0,
            y: 0,
            ease: "power2.out",
          });
        });
      });
    };

    // 添加點擊處理函數
    const handleClick = (e: MouseEvent) => {
      console.log("Canvas clicked"); // 添加點擊事件觸發日誌
      if (!isLoaded.current) {
        console.log("Images not loaded yet"); // 檢查圖片加載狀態
        return;
      }
      const rect = c.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      console.log("Click position:", { clickX, clickY }); // 記錄點擊位置

      circles.forEach((row, rowIndex) => {
        row.forEach((circle, colIndex) => {
          const dx = clickX - (circle.left + circle.x);
          const dy = clickY - (circle.top + circle.y);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const clickRadius = baseRadius.current * circle.scale;

          console.log(`Circle [${rowIndex}][${colIndex}]:`, {
            center: { x: circle.left + circle.x, y: circle.top + circle.y },
            distance: dist,
            radius: clickRadius,
          }); // 記錄每個圓的位置和距離

          if (dist <= clickRadius) {
            console.log("Circle clicked:", circle.style);
            const categories = ["溫工藝", "舒適巢", "冷火花", "熱對話"];
            localStorage.setItem("selectedCategory", categories[circle.style]);
            router.push("/all-works");
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

      circles.forEach((row) => {
        row.forEach((circle) => {
          const dx = mouseX - (circle.left + circle.x);
          const dy = mouseY - (circle.top + circle.y);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= baseRadius.current) {
            isOverCircle = true;
          }
        });
      });

      c.style.cursor = isOverCircle ? "pointer" : "default";
    };

    // 開始動畫
    draw();

    // 事件監聽
    console.log("Setting up event listeners");
    window.addEventListener("mousemove", initializeMouseState, { once: true }); // 添加一次性的全局滑鼠移動檢查
    c.addEventListener("click", handleClick, { capture: true });
    c.addEventListener("mousemove", handleMouseMove);
    c.addEventListener("mouseenter", handleMouseEnter);
    c.addEventListener("mouseleave", handleMouseLeave);
    c.addEventListener("mousemove", updateCursor);

    // 事件監聽
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    // 清理
    return () => {
      window.removeEventListener("mousemove", initializeMouseState);
      window.removeEventListener("resize", handleResize);
      c.removeEventListener("click", handleClick, { capture: true });
      c.removeEventListener("mousemove", handleMouseMove);
      c.removeEventListener("mouseenter", handleMouseEnter);
      c.removeEventListener("mouseleave", handleMouseLeave);
      c.removeEventListener("mousemove", updateCursor);
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
      },
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
      conceptRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getMobileImageUrl = (originalUrl: string) => {
    // Add mobile suffix before the extension
    return originalUrl.replace(/(\.[^.]+)$/, "-mobile$1");
  };

  return (
    <div className="w-full flex flex-col items-center relative overflow-x-hidden">
      <div className="w-full flex justify-center items-center bg-white relative">
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
              width: "100%",
              height: "100%",
            }}
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
            <motion.div
              className="text-black p-2 rounded-full"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <ChevronDown size={32} />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div
          className="w-full h-24 absolute top-0 left-0 z-20"
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.6) 45%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0.1) 85%, transparent 100%)",
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
        <div className="absolute inset-0 flex items-center justify-end overflow-visible">
          {bgImages.map((img, index) => (
            <motion.img
              key={`bg-${index}`}
              src={isMobile ? getMobileImageUrl(img) : img}
              alt={`Background ${index}`}
              loading={index === currentBgIndex ? "eager" : "lazy"}
              initial={false}
              animate={{
                opacity:
                  index === currentBgIndex
                    ? index === 0
                      ? 0.5 // Increased from 0.3
                      : index === 1
                      ? 0.4 // Increased from 0.2
                      : index === 2
                      ? 0.35 // Increased from 0.15
                      : 0
                    : 0,
                scale:
                  index === currentBgIndex ? (index === 1 ? 0.8 : 0.9) : 0.9,
                rotate: isMobile ? [0, 180] : [0, 360],
              }}
              transition={{
                duration: isMobile ? 1.5 : 2, // Faster transitions on mobile
                ease: "easeInOut",
                rotate: {
                  duration: isMobile ? 30 : 20, // Slower rotation on mobile
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="w-[120%] sm:w-[100%] md:w-[70%] lg:w-[65%] xl:w-[60%] 2xl:w-[55%] max-w-[700px] h-auto object-contain absolute sm:max-w-[700px] max-w-[400px] right-[-10%] translate-x-[50%] md:right-[-5%] lg:right-[-8%] xl:right-[-8%] 2xl:right-[0%] md:translate-x-0 mt-[20%] xl:mt-[15%] 2xl:mt-[10%]"
              style={{
                filter: isMobile
                  ? "brightness(1.1) contrast(0.95)"
                  : "brightness(1.2) contrast(0.9)",
              }}
            />
          ))}
        </div>
        {/* Exhibition Concept */}
        <div
          ref={conceptRef}
          className="w-full relative z-30 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-[800px] md:max-w-[850px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1100px] md:ml-[12%] lg:ml-[15%] xl:ml-[18%] 2xl:ml-[16%] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 relative">
            {/* Small rotating image above text */}
            <div className="absolute -top-64 right-[75%] w-[300px] hidden md:block">
              {bgImages.map((img, index) => (
                <motion.img
                  key={`small-bg-${index}`}
                  src={img}
                  alt="Small Rotating Background"
                  className="w-full h-auto object-contain absolute top-0 left-0"
                  initial={false}
                  animate={{
                    opacity:
                      index === (currentBgIndex + 2) % bgImages.length
                        ? 0.3
                        : 0,
                    rotate: -360,
                  }}
                  transition={{
                    opacity: {
                      duration: 1.5,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 15,
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }}
                  style={{
                    filter: "brightness(1.2) contrast(0.9)",
                  }}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ opacity: textOpacity1 }}
              className="mb-8 md:text-left text-center"
            >
              <h2 className="text-title text-white tracking-wide">
                °<span className="text-white">Sense</span> 展覽概念
              </h2>
            </motion.div>
            <div className="space-y-12 max-w-[600px] md:max-w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ opacity: textOpacity2 }}
                className="text-body text-gray-300 space-y-0 md:text-left text-center"
              >
                <p>「溫度」承載著互動的軌跡，透過觸碰映現；</p>
                <p>
                  「感知」詮釋了主觀的體驗，藉由設計成型。在兩者的交互作用下，°S
                  成為我們報以世界的情感單位。
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ opacity: textOpacity3 }}
                className="text-body text-gray-300 space-y-0 md:text-left text-center"
              >
                <p>面對世界的廣闊，我們懷抱最真誠而純粹的心、謙卑與同理，</p>
                <p>以設計的手法為所見與聞注入暖意。</p>
                <p>
                  溫度是相對也是絕對，是對話的依據，是情感的證明，如同我們以設計付諸於萬物的注目與熱情。
                </p>
              </motion.div>
            </div>
          </div>
          {/* Second Scroll Down Button - Decorative Only */}
          <div className="absolute bottom-[78px] left-1/2 transform -translate-x-1/2 z-30 hidden md:block">
            <motion.div
              className="text-white p-2 rounded-full"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <ChevronDown size={32} />
            </motion.div>
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
            {categoryData.map((category, index) => (
              <div key={category.zhName} className="scale-90">
                <LargeMorphingCircle
                  category={category.zhName}
                  index={index}
                  imageUrl={
                    index === 0
                      ? `/ball/ball2.webp`
                      : index === 1
                      ? `/ball/ball1.webp`
                      : `/ball/ball${index + 1}.webp`
                  }
                  onHover={handleCircleHover}
                  activeIndex={activeIndex}
                  isLowerGrid={true}
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
                <p className="text-caption text-gray-400 mb-3">
                  {categoryDescriptions[hoveredIndex].temperature} |{" "}
                  {categoryDescriptions[hoveredIndex].description}
                </p>
                <h3 className="text-[1.5rem] leading-tight text-white font-bold mb-5">
                  {categoryDescriptions[hoveredIndex].zhName}
                </h3>
                <p className="text-body text-gray-400 max-w-[700px] mx-auto leading-relaxed">
                  {formatDescription(
                    categoryDescriptions[hoveredIndex].longDescription
                  )}
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
                  initial={{
                    opacity: 0,
                    x: slideDirection === "left" ? -50 : 50,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection === "left" ? 50 : -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <LargeMorphingCircle
                    category={categoryData[activeIndex].zhName}
                    index={activeIndex}
                    imageUrl={
                      activeIndex === 0
                        ? `/ball/ball2.webp`
                        : activeIndex === 1
                        ? `/ball/ball1.webp`
                        : `/ball/ball${activeIndex + 1}.webp`
                    }
                    onHover={handleCircleHover}
                    activeIndex={activeIndex}
                    isLowerGrid={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Title with Navigation Buttons */}
            <div className="relative mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{
                    opacity: 0,
                    x: slideDirection === "left" ? -20 : 20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection === "left" ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-2"
                >
                  <p className="text-caption text-gray-400 mb-3">
                    {categoryDescriptions[activeIndex].temperature} |{" "}
                    {categoryDescriptions[activeIndex].description}
                  </p>
                  <h3 className="text-subtitle text-white font-bold mb-3">
                    {categoryDescriptions[activeIndex].zhName}
                  </h3>
                  <p className="text-body text-gray-400 max-w-[600px] mx-auto leading-relaxed">
                    {formatDescription(
                      categoryDescriptions[activeIndex].longDescription
                    )}
                  </p>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => {
                  setSlideDirection("right");
                  setActiveIndex((prev) => (prev - 1 + 4) % 4);
                }}
                className="absolute left-4 top-2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  setSlideDirection("left");
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
            background:
              "linear-gradient(to top, rgb(249, 250, 251) 0%, rgba(249, 250, 251, 0.95) 15%, rgba(249, 250, 251, 0.8) 30%, rgba(249, 250, 251, 0.6) 45%, rgba(249, 250, 251, 0.4) 60%, rgba(249, 250, 251, 0.2) 75%, rgba(249, 250, 251, 0.1) 85%, transparent 100%)",
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
            className="bg-white text-black text-body font-medium py-2 px-4 rounded-[18px] flex items-center gap-2"
            onClick={() => (window.location.href = "/book-tour")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 10H17M17 10L12 5M17 10L12 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            立即預約導覽
          </button>
        </div>
      </div>
    </div>
  );
};

// Add helper function to shade colors (make darker or lighter)
const shadeColor = (color: string, percent: number): string => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + (R * percent) / 100));
  G = Math.min(255, Math.max(0, G + (G * percent) / 100));
  B = Math.min(255, Math.max(0, B + (B * percent) / 100));

  const rr = Math.round(R).toString(16).padStart(2, "0");
  const gg = Math.round(G).toString(16).padStart(2, "0");
  const bb = Math.round(B).toString(16).padStart(2, "0");

  return `#${rr}${gg}${bb}`;
};

export default InteractivePlusGrid;
