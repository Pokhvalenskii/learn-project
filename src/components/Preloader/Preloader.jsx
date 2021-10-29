import './Preloader.css'
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from 'react-redux';


function Preloader() {

  const loading = useSelector((state) => state.isFetching.load);

  return (
    <div className='preloaderContainer'>
      {loading && <ClipLoader color={'#2196f3'} loading={loading} size={50} />}
    </div>
  )
}

export { Preloader }