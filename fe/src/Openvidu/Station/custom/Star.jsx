import React, { useEffect, useState } from 'react';

export default function Start() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const $canvas = canvasRef.current;
    if (!$canvas) return;

    const ctx = $canvas.getContext('2d');

    const getRandomRadius = () => Math.random() * 1 + 0.5; // 크기 랜덤
    const getRandomSpeed = () => Math.random() * 0.3 + 0.1; // 속도 랜덤
    const getRandomDir = () => [-1, 1][Math.floor(Math.random() * 2)];

    const Star = {
      data: [],
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,

      init() {
        Star.make();
        Star.loop();
      },

      loop() {
        Star.move();
        Star.draw();

        window.requestAnimationFrame(Star.loop);
      },

      make() {
        const data = [];

        // 랜덤한 데이터 100개 생성
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * Star.canvasWidth;
          const y = Math.random() * Star.canvasHeight;

          const size = getRandomRadius();
          const speed = getRandomSpeed();
          const dir = getRandomDir();

          data.push({ x, y, size, speed, dir });
        }

        // Snow 객체에 데이터 저장
        Star.data = data;
      },

      move() {
        Star.data = Star.data.map((item) => {
          // 방향에 맞게 이동
          item.x += item.dir * item.speed; // x축 없애면 직선 운동
          item.y += item.speed;

          // 캔버스를 벗어났는지 판단
          const isMinOverPositionX = -item.size > item.x; // x축 없애면 직선 운동
          const isMaxOverPositionX = item.x > Star.canvasWidth; // x축 없애면 직선 운동
          const isOverPositionY = item.y > Star.canvasHeight;

          // 벗어나면 반대방향, 맨 위로
          if (isMinOverPositionX || isMaxOverPositionX) {
            item.dir *= -1;
          }
          // if (isOverPositionY) {
          //   // y축만 계산
          //   item.y = -item.size;
          // }
          if (isOverPositionY) {
            item.y = -item.size;
          }

          return item;
        });
      },

      draw() {
        ctx.clearRect(0, 0, Star.canvasWidth, Star.canvasHeight);

        ctx.fillStyle = '#000'; // 배경 검정
        ctx.fillRect(0, 0, Star.canvasWidth, Star.canvasHeight);

        Star.data.forEach((item) => {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 0, .6)'; // 노랑색으로 변경
          ctx.moveTo(item.x, item.y - item.size);
          // 꼭지점 5개 깎아서 별모양 완성
          for (let i = 1; i <= 5; i++) {
            const angle = (i * 2 * Math.PI) / 5;
            const x = item.x + item.size * Math.sin(angle);
            const y = item.y - item.size * Math.cos(angle);
            ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        });
      },
    };

    Star.init();

    window.onresize = () => {
      Star.canvasWidth = window.innerWidth; // 전체 너비로 수정
      Star.canvasHeight = window.innerHeight; // 전체 높이로 수정

      Star.make();
    };

    return () => {
      // 컴포넌트가 언마운트되면 이벤트 리스너를 제거합니다.
      window.removeEventListener('resize', Star.make);
    };
  }, []);
  //  TEST 끝

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full overflow-hidden m-0 p-0"
      />
    </>
  );
}
