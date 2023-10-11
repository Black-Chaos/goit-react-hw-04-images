import { PixabayAPI } from 'API/PixabayAPI';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const pixApi = new PixabayAPI();
pixApi.setParams({
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export function App() {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1 && !q) return;
    getImages();
  }, [page, q]);

  const getImages = async () => {
    setLoading(true);
    try {
      const data = await pixApi.search();
      if (data) {
        setImgs(prevImgs => [...prevImgs, ...data.hits]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestion = q => {
    pixApi.setSearchQuestion(q);
    setImgs([]);
    setPage(1);
    setQ(q);
  };

  const result = imgs.length > 0;

  return (
    <div className="App">
      <Searchbar onSubmit={handleQuestion} />
      {result ? (
        <ImageGallery images={imgs} />
      ) : (
        <p className="message">No result</p>
      )}
      {result && <Button handleClick={() => setPage(page + 1)} />}
      {loading && (
        <div className="Overlay">
          <MagnifyingGlass
            visible={true}
            height="240"
            width="240"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#3f51b5"
          />
        </div>
      )}
    </div>
  );
}
