import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Calendar, Camera, ChevronLeft, ChevronRight, Heart, Images, MapPin, Quote, Star } from "lucide-react";


const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 20px;
  overflow-x: auto;
  padding: 1rem;
  width: 100%;
  justify-content: center;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 768px) {
    width: 100%;
    /* border: 1px solid black; */
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PageNumber = styled.button`
  border: 1px solid #ccc;
  padding: 6px 25px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 1.5rem;
  min-width: 40px;
`;

const ArrowButton = styled.button`
  background-color: #fff;
  padding: 6px;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 2.5rem;

`;

const ReviewsComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageIndexes, setImageIndexes] = useState({});
  const [progresses, setProgresses] = useState(0);
  const reviewsPerPage = 4;
  const slideInterval = 10000;

  const reviewsData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    reviewer: `John ${i + 1}`,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laborum sit expedita est et neque, quam vitae dolorum hic velit totam, ducimus vel enim id in sed itaque ea doloribus voluptatibus quisquam consequatur magnam cum consequuntur. Id at, exercitationem nemo rem, quibusdam veniam voluptatum harum tempora quidem nostrum temporibus molestias.",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
    ],
    userPhoto: "/user.jpg",
    date: "2022-01-01",
    location: "New Delhi, India",
    rating: 3,
    likes: 100
  }));


  useEffect(() => {
    const interval = setInterval(() => {
      setProgresses((prev) => {
        let newProgresses = { ...prev };
        Object.keys(newProgresses).forEach((reviewId) => {
          if ((reviewsData.find(r => r.id == reviewId)?.images.length || 0) === 0) return;

          const newProgress = (newProgresses[reviewId] ?? 0) + (100 / (slideInterval / 16));
          if (newProgress >= 100) {
            newProgresses[reviewId] = 0;
            setImageIndexes((prevIndexes) => ({
              ...prevIndexes,
              [reviewId]: ((prevIndexes[reviewId] ?? 0) + 1) % (reviewsData.find(r => r.id == reviewId)?.images.length || 1)
            }));
          } else {
            newProgresses[reviewId] = newProgress;
          }
        });
        return newProgresses;
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(reviewsData.length / reviewsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePrevImage = (reviewId) => {
    setProgresses((prev) => ({ ...prev, [reviewId]: 0 }));
    setImageIndexes((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] > 0 ? prev[reviewId] - 1 : (reviewsData.find(r => r.id === reviewId)?.images.length || 1) - 1
    }));
  };

  const handleNextImage = (reviewId) => {
    setProgresses((prev) => ({ ...prev, [reviewId]: 0 }));
    setImageIndexes((prev) => ({
      ...prev,
      [reviewId]: ((prev[reviewId] ?? 0) + 1) % (reviewsData.find(r => r.id === reviewId)?.images.length || 1)
    }));
  };

  const updateImageIndex = (reviewId, index) => {
    setImageIndexes((prev) => ({ ...prev, [reviewId]: index }));
    setProgresses((prev) => ({ ...prev, [reviewId]: 0 }));
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviewsData.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  return (
    <div className="w-full !mb-25 flex flex-col items-center">
      {currentReviews.map((review, index) => (
        <div key={review.id} className="w-[90%] !my-10">
          <div className="flex w-full flex-col md:flex-row-reverse gap-5 !p-10 bg-gray-100 rounded-3xl transition-all">

            {/* Image Section */}
            <div className="size-full md:w-[500px] relative">
              {review.images.length > 0 ?
                <img
                  src={review.images[imageIndexes[review.id] ?? 0]}
                  alt="Travel memory"
                  className="object-cover rounded-xl h-[500px] w-full md:w-[500px]"
                /> :
                <div className="flex flex-col gap-2 justify-center items-center h-[500px] w-full md:w-[500px] bg-gray-200 rounded-xl">
                  <Images className="text-gray-400 text-2xl" />
                  <div className="text-gray-400 text-2xl">No Images Uploaded</div>
                </div>}
              {review.images.length > 0 && (
                <>
                  <button
                    onClick={() => handlePrevImage(review.id)}
                    className="absolute !px-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-black/20 to-transparent hover:from-black/30 transition-all duration-300 z-10 h-full"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-100" />
                  </button>

                  <button
                    onClick={() => handleNextImage(review.id)}
                    className="absolute !px-2 right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-black/30 to-transparent hover:from-black/30 transition-all duration-300 z-10 h-full"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-200" />
                  </button>
                </>)}
              <div className={`flex items-center gap-6 absolute bottom-5 left-5 ${review.images.length > 0 ? "text-gray-200" : "text-gray-400"}`}> 
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                  <span>{review.likes} likes</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                  <Camera className="w-5 h-5" />
                  <span>{review.images.length} photos</span>
                </button>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex gap-10 border-b border-gray-200 !pb-5">
                <img src={review.userPhoto} alt="User" className="rounded-full size-20" />
                <div>
                  <h3 className="text-3xl font-bold">{review.reviewer}</h3>
                  <div className="flex md:items-center md:gap-4 flex-col md:flex-row">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-6 text-gray-500" />
                      <span>{review.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-6 text-gray-500" />
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-1 !mt-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="size-8 text-yellow-400 fill-current" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} className="size-8 text-gray-400" />
                  ))}
                  <p className="!ml-5">{review.rating} / 5</p>
                </div>
                <Quote className="size-12 text-gray-500 !mt-6 opacity-20" />
                <p className="!p-5">{review.text}</p>
              </div>
              <div className="hidden md:block">
              <div className="flex justify-center gap-3 z-10 !mt-25">
                {review.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => updateImageIndex(review.id, index)}
                    className="h-3 w-[120px] relative overflow-hidden bg-gray-400 transition-all duration-300"
                  >
                    {index === (imageIndexes[review.id] ?? 0) && (
                      <div
                        className="absolute left-0 top-0 h-full bg-black transition-all duration-300 ease-linear"
                        style={{ width: `${progresses[review.id] ?? 0}%` }}
                      />
                    )}
                  </button>
                ))}
              </div>
              </div>
            </div>

          </div>
        </div>
      ))}

      <Pagination>
        <ArrowButton onClick={handlePrev} className={`${currentPage == 1 ? "!cursor-not-allowed" : "hover:!bg-gray-200"}`}>
          <FiChevronLeft />
        </ArrowButton>
        {Array.from(
          { length: Math.ceil(reviewsData.length / reviewsPerPage) },
          (_, i) => (
            <PageNumber
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`${currentPage === i + 1 ? "bg-blue-500 !text-white" : "hover:!bg-gray-100"}`}
            >
              {i + 1}
            </PageNumber>

          )
        )}
        <ArrowButton onClick={handleNext} className={`${currentPage == totalPages ? "!cursor-not-allowed" : "hover:!bg-gray-200"}`}>
          <FiChevronRight />
        </ArrowButton>
      </Pagination>
    </div>
  );
};

export default ReviewsComponent;
