import ImageGallery from 'components/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton';
import SearchBar from 'components/SearchBar';
import { getImages } from 'services/api';

const { Component } = require('react');

class App extends Component {
  state = {
    search: '',
    page: 1,
    error: null,
    isLoading: false,
    images: [],
  };

  autoScroll = () => {
    const gallery = document.querySelector('.ImageGallery');

    if (gallery) {
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  };

  onSubmitSearch = e => {
    e.preventDefault();

    const { value } = e.target.elements.searchImage;

    if (value === '') {
      this.setState({ error: 'Empty query error' });
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      search: value.trim(),
      images: [],
      page: 1,
    }));

    e.target.reset();
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.autoScroll();

    if (
      prevState.search === this.state.search &&
      prevState.page === this.state.page
    )
      return;

    this.setState({ isLoading: true, error: null });

    getImages(this.state.search, this.state.page)
      .then(({ hits: fetchedImages }) => {
        this.setState(({ images }) => ({
          images: [...images, ...fetchedImages],
        }));
      })
      .catch(err => {
        this.setState({ error: err.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, error, images } = this.state;

    // console.log(images);

    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmitSearch} />
        {error && <div>Error!!!! {error}</div>}
        {isLoading && <div>Loading...</div>}
        {!error && <ImageGallery images={images} />}

        {images.length > 0 && <LoadMoreButton onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}

export default App;
