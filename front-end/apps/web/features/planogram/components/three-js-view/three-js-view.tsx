'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import type { GridResponse, LayoutItem } from '@/features/planogram/types';
import { useThemeStore } from '@/stores/themeStore';

interface ThreeJSViewProps {
  gridData: GridResponse;
  rowLayouts: Record<number, LayoutItem[]>;
}

// Simple product box component
function ProductBox({ item, position, size, color }: { item: LayoutItem; position: [number, number, number]; size: [number, number, number]; color: string }) {
  const [width, , depth] = size;
  const productName = item.meta.name || 'Unknown';

  // Position text in the center of the box
  // Calculate font size based on box width and text length
  // Longer text gets smaller font size
  const textLength = productName.length;
  const baseFontSize = Math.min(0.2, width * 0.2);
  // Decrease font size for longer text (scale down by up to 40% for very long text)
  const lengthFactor = textLength > 20 ? 0.6 : textLength > 15 ? 0.7 : textLength > 10 ? 0.85 : 1.0;
  const fontSize = baseFontSize * lengthFactor;

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Product name text in center */}
      <Suspense fallback={null}>
        <Text position={[0, 0, depth / 2 + 0.01]} fontSize={fontSize} color='white' anchorX='center' anchorY='middle' maxWidth={width * 0.9} textAlign='center' outlineWidth={0.02} outlineColor='#000000' font='https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf'>
          {productName}
        </Text>
      </Suspense>
    </group>
  );
}

// Shelf row component
function ShelfRow({ rowId, rowLayouts, rowIndex, cellWidth, shelfWidth, totalRows }: { rowId: number; rowLayouts: Record<number, LayoutItem[]>; rowIndex: number; cellWidth: number; shelfWidth: number; totalRows: number }) {
  const { isDark } = useThemeStore();
  // Scale up shelf dimensions proportionally
  const scaleFactor = 1.5;
  const rowHeight = 0.2 * scaleFactor;
  const rowDepth = 0.4 * scaleFactor;
  const rowSpacing = 1.2 * scaleFactor;
  // Reverse the order: first row (index 0) should be at the top, last row at the bottom
  const reversedIndex = totalRows - 1 - rowIndex;
  const yPosition = reversedIndex * rowSpacing;
  const items = rowLayouts[rowId] || [];

  return (
    <group position={[0, yPosition, 0]}>
      {/* Shelf base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[shelfWidth, rowHeight, rowDepth]} />
        <meshStandardMaterial color={isDark ? '#6b5b4a' : '#8b7355'} />
      </mesh>

      {/* Products on shelf */}
      {items.map((item) => {
        const scaleFactor = 1.5;
        const itemWidth = item.w * cellWidth;
        // Calculate height based on product's pack_height_in, converted to Three.js scale
        // Convert inches to Three.js units (same scale as cellWidth: 0.1) and scale up
        const itemHeight = (item.meta.pack_height_in || 3.0) * 0.1 * scaleFactor;
        const itemDepth = rowDepth * 0.9;
        const xPosition = item.x * cellWidth - shelfWidth / 2 + itemWidth / 2;
        // Use color from backend, fallback to gray
        const color = item.meta.color || '#9ca3af';
        // Position product on top of shelf
        const yPosition = rowHeight / 2 + itemHeight / 2;

        return <ProductBox key={item.i} item={item} position={[xPosition, yPosition, 0]} size={[itemWidth, itemHeight, itemDepth]} color={color} />;
      })}
    </group>
  );
}

// Main scene component
function Scene({ gridData, rowLayouts }: { gridData: GridResponse; rowLayouts: Record<number, LayoutItem[]> }) {
  const { isDark } = useThemeStore();
  // Scale factor to make boxes bigger proportionally
  const scaleFactor = 1.5;
  const shelfWidth = gridData.grid.cols * gridData.grid.cellWidthIn * 0.1 * scaleFactor;
  const cellWidth = gridData.grid.cellWidthIn * 0.1 * scaleFactor;

  // Calculate center position based on number of rows
  const totalRows = gridData.rows.length;

  return (
    <>
      <ambientLight intensity={isDark ? 0.8 : 0.6} />
      <directionalLight position={[5, 10, 5]} intensity={isDark ? 1.5 : 1.2} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={isDark ? 0.7 : 0.5} />

      {/* Shelf rows */}
      {gridData.rows.map((row, index) => (
        <ShelfRow key={row.id} rowId={row.id} rowLayouts={rowLayouts} rowIndex={index} cellWidth={cellWidth} shelfWidth={shelfWidth} totalRows={totalRows} />
      ))}
    </>
  );
}

export function ThreeJSView({ gridData, rowLayouts }: ThreeJSViewProps) {
  const { isDark, initTheme } = useThemeStore();

  useEffect(() => {
    const cleanup = initTheme();
    return cleanup;
  }, [initTheme]);

  // Calculate center position based on number of rows for better initial view
  const scaleFactor = 1.5;
  const totalRows = gridData.rows.length;
  const rowSpacing = 1.2 * scaleFactor;
  const centerY = ((totalRows - 1) * rowSpacing) / 2;
  const shelfWidth = gridData.grid.cols * gridData.grid.cellWidthIn * 0.1 * scaleFactor;

  // Position camera to center on the shelves
  const cameraY = centerY + 2;
  const cameraZ = Math.max(10, shelfWidth * 0.8);

  // Calculate canvas height proportionally based on number of rows
  // Base height for 3 rows or less, then add height for each additional row
  const baseHeight = 500;
  const heightPerRow = 150;
  const canvasHeight = totalRows <= 3 ? baseHeight : baseHeight + (totalRows - 3) * heightPerRow;

  return (
    <div className='bg-card p-6 rounded-lg shadow-md mt-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>3D Visualization</h2>
        <div className='text-xs text-muted-foreground'>
          <div>Mouse: Drag to rotate, Scroll to zoom, Right-click to pan</div>
        </div>
      </div>
      <div className='w-full border-2 border-border rounded-lg overflow-hidden bg-muted' style={{ height: `${canvasHeight}px` }}>
        <Suspense
          fallback={
            <div className='w-full h-full flex items-center justify-center'>
              <div className='text-muted-foreground'>Loading 3D visualization...</div>
            </div>
          }
        >
          <Canvas camera={{ position: [0, cameraY, cameraZ], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
            <color attach='background' args={[isDark ? '#1a1a1a' : '#ffffff']} />
            <PerspectiveCamera makeDefault position={[0, cameraY, cameraZ]} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={5} maxDistance={30} enableDamping={true} dampingFactor={0.05} target={[0, centerY, 0]} />
            <Scene gridData={gridData} rowLayouts={rowLayouts} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

