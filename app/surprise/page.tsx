"use client"

import { useEffect, useState, useRef } from "react"
import { Balloons } from "@/components/balloons"
import { PhotoFrames } from "@/components/photo-frames"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function SurprisePage() {
  const [showMessage, setShowMessage] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()

  // 🔒 State untuk password modal
  const [showModal, setShowModal] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    if (!isUnlocked) return
    const timer = setTimeout(() => {
      setShowMessage(true)
      audioRef.current?.play().catch(() => {
        console.warn("Autoplay diblokir, butuh interaksi user")
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [isUnlocked])

  const handleCheckPassword = () => {
    if (password === "22091996") {
      setIsUnlocked(true)
      setShowModal(false)
      setError("")
    } else {
      setError("Password salah, coba lagi ya ❤️")
    }
  }

  if (!isUnlocked) {
    // 🔒 Tampilan awal (popup password)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        {showModal && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 w-80">
            <h2 className="text-xl font-bold text-center">🔒 Masukkan Password My Birth Day</h2>
            <Input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button onClick={handleCheckPassword}>Masuk</Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 🎉 Tampilan kejutan kalau password benar
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 🎶 Audio player */}
      <audio ref={audioRef} src="/Selamat Ulang Tahun [Jamrud].mp3" autoPlay loop />

      <Balloons />
      <PhotoFrames />

      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-primary/30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-36 h-36 bg-secondary/30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/3 right-20 w-20 h-20 bg-accent/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 left-16 w-28 h-28 bg-primary/20 rounded-full blur-xl animate-pulse" />

      <div className="text-center space-y-8 max-w-lg mx-auto relative z-10">
        {showMessage ? (
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-primary font-playfair text-balance leading-tight">
                {"Happy Birthday Tuwir ❤️"}
              </h1>

              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
                <p className="text-sm md:text-md text-foreground leading-relaxed font-medium text-balance">
                  {`Selamat ulang tahun mba e 🎉✨
Hari ini adalah hari spesial buat lu, hari di mana dunia diberikan hadiah paling berharga ketika lu ada di dunia. Gua benar-benar bersyukur bisa kenal lu sama gua bahagia bisa pernah jadi orang yang paling spesial di hidup lu, sampe sekarang udah ada yang bisa gantiin gua buat jagain lu, mungkin dia lebih baik dan lebih ngertiin lu sampai lu bilang mending sama dia , gapapa mba e emang sesuatu akan ada masanya bukan iri ya tapi emang wajar.

Semoga di usia yang baru ini, semua doa dan harapan lu bisa terwujud satu per satu. Gua doakan kesehatan yang selalu lu impikan terwujud bisa lari lagi refreshing jalan jalan tanpa mikirin kaki, rezeki yang semakin lancar, kebahagiaan yang gak ada habisnya, sama cinta dan kasih sayang yang selalu mengelilingi hidup lu. Jangan pernah ragu sama diri lu sendiri, karena lu punya banyak hal baik yang mungkin bahkan belum lu sadari.

Teruslah jadi orang yang kuat, rendah hati, dan semangat seperti yang gua kenal selama ini. Inget, setiap langkah kecil yang lu ambil hari ini akan membawa lu lebih dekat ke mimpi-mimpi besarmu di masa depan. Jangan lupa juga untuk tetap menikmati setiap momen, sekecil apa pun itu, karena hidup bukan hanya tentang tujuan, tapi juga perjalanan yang indah di sepanjang jalan.

Sekali lagi, selamat ulang tahun! Semoga tahun ini jadi salah satu bab paling indah dalam hidup lu. Thanks sudah jadi orang yang luar biasa. 🎂❤️`}
                </p>
              </div>
            </div>

            {/* Decorative hearts */}
            <div className="flex justify-center space-x-4 text-2xl animate-pulse">
              <span className="text-primary">💖</span>
              <span className="text-secondary">💕</span>
              <span className="text-accent">💗</span>
              <span className="text-primary">💖</span>
            </div>

            {/* Additional sweet message */}
            <div className="bg-secondary/20 rounded-xl p-4 border border-secondary/30">
              <p className="text-secondary-foreground font-medium text-balance">
                {"Sorry ya mba e kadonya nyusul sekarang cuman bisa bikin ginian :(((("}
              </p>
            </div>

            {/* Back button */}
            <div className="pt-4">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-medium"
              >
                {"← Kembali ke Beranda"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-2xl text-primary font-playfair animate-pulse">
            {"Mempersiapkan kejutan... ✨"}
          </div>
        )}
      </div>
    </div>
  )
}
