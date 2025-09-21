"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  onComplete: () => void;
}

export function CountdownTimer({
  targetDate,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // bikin target hari ini jam 23:59:59
    const now = new Date()
    const target = new Date()
    target.setHours(23, 59, 59, 999)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = target.getTime() - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setIsComplete(true)
        onComplete?.()
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [onComplete])

  if (isComplete) {
    return null
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-primary/20 rounded-xl p-4">
          <div className="text-2xl md:text-3xl font-bold text-primary font-playfair">
            {timeLeft.days}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Hari</div>
        </div>
        <div className="bg-secondary/20 rounded-xl p-4">
          <div className="text-2xl md:text-3xl font-bold text-secondary font-playfair">
            {timeLeft.hours}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Jam</div>
        </div>
        <div className="bg-accent/20 rounded-xl p-4">
          <div className="text-2xl md:text-3xl font-bold text-accent-foreground font-playfair">
            {timeLeft.minutes}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Menit</div>
        </div>
        <div className="bg-primary/20 rounded-xl p-4">
          <div className="text-2xl md:text-3xl font-bold text-primary font-playfair">
            {timeLeft.seconds}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Detik</div>
        </div>
      </div>
    </div>
  );
}
