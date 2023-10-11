import { useEffect } from 'react';

export function Modal({ link, tags, handleCloseModal }) {
  useEffect(() => {
    const handleClose = ({ code }) => {
      if (code === 'Escape') handleCloseModal();
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [handleCloseModal]);

  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={link} alt={tags} />
      </div>
    </div>
  );
}
