import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";

// Define styled components
const SliderContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const HotelImage = styled.img`
  width: 50%;
  height: auto;
  border-radius: 8px;
  margin-right: 20px;
`;

const HotelDetails = styled.div`
  flex: 1;
`;

const HotelName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const HotelLocation = styled.span`
  font-size: 14px;
  color: #007bff;
  margin-left: 5px;
`;

const HotelDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const BookButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;



const HotelSlider = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:19200/api/hotels");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Expected JSON, got ${contentType}`);
        }

        const data = await response.json();
        setHotels(data.data.hotels);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <SliderContainer>
      <Slider {...settings}>
        {hotels.map((hotel) => (
          <Slide key={hotel.id}>
            <HotelImage src={hotel.urlImage} alt={hotel.name} />
            <HotelDetails>
              <HotelName>{hotel.name}
                <HotelLocation>{hotel.location}</HotelLocation>
              </HotelName>
              <HotelDescription>{hotel.description}</HotelDescription>
              <BookButton onClick={() => window.open(hotel.link, "_blank")}>
                Réserver ma table
              </BookButton>
            </HotelDetails>
          </Slide>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default HotelSlider;
