import { X } from 'lucide-react';
import { useEffect } from 'react';

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

const Lightbox = ({ imageUrl, onClose }: LightboxProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-[fade-in_0.25s_ease-out_both] items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-white transition hover:rotate-90 hover:text-accent"
        aria-label="Fermer"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="relative max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="Photo en plein écran"
          className="max-h-[90vh] max-w-full animate-[zoom-in_0.4s_var(--ease-out)_both] object-contain"
        />
      </div>
    </div>
  );
};

export default Lightbox;
