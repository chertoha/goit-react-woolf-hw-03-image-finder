import ErrorComponent from 'components/ErrorComponent';
import ImageGallery from 'components/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import SearchBar from 'components/SearchBar';
import { getImages } from 'services/api';
import { AppWrapper } from './App.styled';

const { Component } = require('react');

class App extends Component {
  state = {
    search: '',
    page: 1,
    error: null,
    isLoading: false,
    images: [],
    totalImages: 0,
  };

  autoScroll = () => {
    const gallery = document.querySelector('.gallery');

    if (gallery) {
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  };

  setError = message => {
    this.setState({ error: message });
  };

  onSubmitSearch = value => {
    this.setState({
      search: value,
      images: [],
      page: 1,
    });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    this.autoScroll();

    if (
      prevState.search === this.state.search &&
      prevState.page === this.state.page
    )
      return;

    this.setState({ isLoading: true, error: null });

    getImages(this.state.search, this.state.page)
      .then(({ hits: fetchedImages, totalHits }) => {
        this.setState(({ images }) => ({
          images: [...images, ...fetchedImages],
          totalImages: totalHits,
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
    const { isLoading, error, images, totalImages } = this.state;

    return (
      <AppWrapper>
        <SearchBar setError={this.setError} setValue={this.onSubmitSearch} />
        {error && <ErrorComponent message={`Error occured! ${error}`} />}
        {isLoading && <Loader />}
        {!error && <ImageGallery images={images} />}

        {images.length > 0 && totalImages !== images.length && (
          <LoadMoreButton onClick={this.onLoadMoreClick} />
        )}
      </AppWrapper>
    );
  }
}

export default App;
