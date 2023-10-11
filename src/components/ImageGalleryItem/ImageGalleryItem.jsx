import { Modal } from "components/Modal/Modal";
import { useState } from "react";

export function ImageGalleryItem({ link, bigImg, tags,  }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togleModalOpen = () => setIsModalOpen(!isModalOpen)


    return (
      <li className="ImageGalleryItem" onClick={togleModalOpen}>
        <img className="ImageGalleryItem-image" src={link} alt={tags} />
        {isModalOpen && <Modal link={bigImg} tags={tags} handleCloseModal={ togleModalOpen} />}
      </li>
    );
  
}