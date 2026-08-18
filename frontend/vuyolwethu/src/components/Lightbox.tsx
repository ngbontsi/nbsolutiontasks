import { X } from 'lucide-react'

interface LightboxProps {
  src: string | null
  onClose: () => void
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  if (!src) return null

  return (
    <div className="lightbox open" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}><X size={36} /></button>
      <img src={src} alt="Gallery full view" onClick={e => e.stopPropagation()} />
    </div>
  )
}
