import { useState } from 'react';

const COLORS = {
  GOLD: '#FFD700',
  ORANGE: '#FF9100',
  ORANGE_DARK: '#E65100',
  BORDER: '#000000',
  BG_GRADIENT_TOP: '#263238',
  BG_GRADIENT_BOT: '#102027',
};

export function AvatarScreenPreview() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${COLORS.BG_GRADIENT_TOP} 0%, ${COLORS.BG_GRADIENT_BOT} 100%)`,
        padding: '32px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
      }}
    >
      {/* 1. TOP HUD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              background: '#333',
              border: `3px solid ${COLORS.BORDER}`,
              borderBottom: `8px solid ${COLORS.BORDER}`,
              borderRadius: '12px',
              padding: '12px 20px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            TOP
          </button>
          <button
            style={{
              background: '#333',
              border: `3px solid ${COLORS.BORDER}`,
              borderBottom: `8px solid ${COLORS.BORDER}`,
              borderRadius: '12px',
              padding: '12px 20px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            BOTTOM
          </button>
        </div>

        <div
          style={{
            background: COLORS.BORDER,
            border: `2px solid ${COLORS.GOLD}`,
            borderRadius: '8px',
            padding: '12px 16px',
            textShadow: '2px 2px 0px #000',
            transform: 'rotate(-2deg)',
          }}
        >
          <div
            style={{
              color: COLORS.GOLD,
              fontWeight: '900',
              fontSize: '28px',
              textTransform: 'uppercase',
              letterSpacing: '-1px',
            }}
          >
            SKATEHUBBA
          </div>
        </div>
      </div>

      {/* 2. AVATAR STAGE (Center) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <img
          src="https://github.com/shadcn.png"
          alt="Avatar"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            opacity: 0.9,
          }}
        />
        <div
          style={{
            width: '200px',
            height: '30px',
            background: '#000',
            opacity: 0.5,
            borderRadius: '100px',
          }}
        />
      </div>

      {/* 3. BOTTOM CONTROLS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Row 1: Main Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <button
            style={{
              flex: 1,
              background: COLORS.ORANGE,
              border: `3px solid ${COLORS.BORDER}`,
              borderBottom: `8px solid ${COLORS.ORANGE_DARK}`,
              borderRadius: '12px',
              padding: '20px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '20px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'transform 0.1s',
            }}
            onMouseDown={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(5px)';
            }}
            onMouseUp={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            🎒 EQUIP
          </button>
          <button
            style={{
              flex: 1,
              background: COLORS.ORANGE,
              border: `3px solid ${COLORS.BORDER}`,
              borderBottom: `8px solid ${COLORS.ORANGE_DARK}`,
              borderRadius: '12px',
              padding: '20px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '20px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'transform 0.1s',
            }}
            onMouseDown={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(5px)';
            }}
            onMouseUp={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            🗺️ MAP
          </button>
        </div>

        {/* Row 2: Status Bar */}
        <div
          style={{
            background: '#000',
            border: `2px solid ${COLORS.GOLD}`,
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            color: COLORS.GOLD,
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          <span>HARDWARE: × 24</span>
          <span>BEARINGS: × 16</span>
        </div>
      </div>
    </div>
  );
}
