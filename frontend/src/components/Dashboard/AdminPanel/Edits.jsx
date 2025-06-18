/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import styled from "styled-components";

const Container = styled.div`
  height: 82vh;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 2rem;
  border-bottom: 2px solid #000;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  font-size: 2rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MainSection = styled.div`
  height: max-content;
  margin-bottom: 4rem;
`;

const TopDestinations = styled.div`
  height: max-content;
  margin-bottom: 2rem;
`;

const PhotosContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PhotoLeftCol = styled.div`
  min-width: 75%;
  background: ${(props) =>
    props.$hasPhotos ? `url("${props.$mainPhoto}")` : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40rem;

  color: #666;
  font-size: 1.5rem;
  /* border: 2px solid #ccc; */
  position: relative;

  @media (max-width: 768px) {
    min-width: 70%;
  }
`;

const PhotoRightCol = styled.div`
  flex: 3;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 30%;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  height: 35rem;
  overflow-y: auto;
  border-radius: 5px;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

const EmptyPhotoGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.5rem;
`;

const PhotoWrapper = styled.div`
  aspect-ratio: 4 / 3;
  border: ${(props) =>
    props.$selected ? "3px solid #2a93d5" : "3px solid transparent"};
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  & > button {
    flex: 1;
    padding: 0.5rem 0.5rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    background-color: #2a93d5;
    opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
    pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

    &:hover {
      cursor: pointer;
    }
  }
    @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuoteInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  padding: 0.5rem;

  & > input {
    flex: 1;
    border: none;
    padding: 0.5rem;
    font-size: 1.5rem;
    outline: none;

    &::placeholder {
      font-size: 1.5rem;
    }
  }

  & > button {
    background-color: #2a93d5;
    color: #fff;
    border: none;
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #247bb5;
    }

    @media (max-width: 768px) {
      padding: 0.5rem 1rem;
    }

  }
`;

const PhotoQuote = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0.5rem;
  font-size: 2rem;
  border-radius: 5px;
  font-weight: bold;
`;

const Card = styled.div`
  min-width: 29rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 5%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 1) 15%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const UpperRow = styled.div`
  flex: 8;
  position: relative;
  background-color: ${(props) => (props.image ? "none" : "#C4C4C4")};
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
  cursor: pointer;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  width: 18rem;
  padding: 0.8rem;
  font-size: 1.6rem;
  border-radius: 5px;
  margin: 0.5rem 0;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.danger ? "red" : "#237AB8")};
    color: #fff;
  }
  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

const BottomRow = styled.div`
  flex: 1.5;
  background-color: #333333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  letter-spacing: 2px;
  border-radius: 0 0 12px 12px;
  cursor: pointer;
`;

const EditableText = styled.input`
  background: none;
  border: none;
  color: white;
  text-align: center;
  font-size: 2.2rem;
  letter-spacing: 2px;
  width: 100%;
  padding: 0 1rem;
  &:focus {
    outline: none;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  /* margin: 2rem 0; */
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  max-width: 20rem;

  &:focus {
    border-color: #237ab8;
  }
  &::placeholder {
    font-weight: bold;
  }
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Message = styled.div`
  margin-top: 2rem;
  font-size: 1.8rem;
  color: #666;
  text-align: center;
`;

function Edits() {
  const [photos, setPhotos] = React.useState(["/package-bg.jpeg"]);
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const [quote, setQuote] = React.useState("Quote...");
  const [inputQuote, setInputQuote] = React.useState("");

  const handleAddPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos([...photos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (selectedPhoto !== null) {
      const updatedPhotos = photos.filter(
        (_, index) => index !== selectedPhoto
      );
      setPhotos(updatedPhotos);
      setSelectedPhoto(null);
    }
  };

  const handleAddQuote = () => {
    setQuote(inputQuote);
    setInputQuote("");
  };

  const [numDestinations, setNumDestinations] = useState("");
  const [destinations, setDestinations] = useState([]);
  const fileInputRef = useRef(null);
  const currentDestinationRef = useRef(null);
  const [editingId, setEditingId] = useState(null);

  const handleDeleteDestination = (id) => {
    setDestinations(
      destinations.filter((destination) => destination.id !== id)
    );
  };
  const handleNameChange = (id, newName) => {
    if (newName.trim() === "") return;
    setDestinations(
      destinations.map((destination) =>
        destination.id === id ? { ...destination, name: newName } : destination
      )
    );
  };

  const handleImageClick = (id) => {
    currentDestinationRef.current = id;
    fileInputRef.current.click();
  };
  const handleInputChange = (e) => {
    setNumDestinations(e.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setDestinations(
      destinations.map((destination) =>
        destination.id === currentDestinationRef.current
          ? { ...destination, image: imageUrl }
          : destination
      )
    );
    event.target.value = "";
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const count = parseInt(numDestinations, 10);
      if (!isNaN(count) && count > 0) {
        const newDestinations = Array.from({ length: count }, (_, index) => ({
          id: index + 1,
          name: `Destination ${index + 1}`,
          image: null, // No image initially
        }));
        setDestinations(newDestinations);
      } else {
        setDestinations([]);
      }
    }
  };

  return (
    <Container>
      <Header>Edits</Header>
      <MainSection>
        <Title>Main-Section</Title>
        <PhotosContainer>
          <PhotoLeftCol
            $hasPhotos={photos.length > 0}
            $mainPhoto={photos[0] || ""}
          >
            {photos.length === 0 && "No photos added yet"}
            {quote && <PhotoQuote>{quote}</PhotoQuote>}
          </PhotoLeftCol>
          <PhotoRightCol>
            <PhotoGrid>
              {photos.length === 0 && (
                <EmptyPhotoGrid>Add photos</EmptyPhotoGrid>
              )}
              {photos.map((photo, index) => (
                <PhotoWrapper
                  key={index}
                  $selected={selectedPhoto === index}
                  onClick={() => setSelectedPhoto(index)}
                >
                  <Photo src={photo} alt={`Gallery item ${index + 1}`} />
                </PhotoWrapper>
              ))}
            </PhotoGrid>
            <Actions $disabled={photos.length === 0 && !selectedPhoto}>
              <button>
                <label htmlFor="photo-upload">Add Photo</label>
              </button>
              <button
                onClick={handleRemovePhoto}
                disabled={selectedPhoto === null}
              >
                Remove Photo
              </button>
            </Actions>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAddPhoto}
            />
          </PhotoRightCol>
        </PhotosContainer>
        <QuoteInputContainer>
          <input
            type="text"
            placeholder="Quote"
            value={inputQuote}
            onChange={(e) => setInputQuote(e.target.value)}
          />
          <button onClick={handleAddQuote}>Add Quote</button>
        </QuoteInputContainer>
      </MainSection>
      <TopDestinations>
        <Title>Top Destinations</Title>
        <InputContainer>
          <Input
            type="number"
            placeholder="No. of Destinations"
            value={numDestinations}
            onChange={handleInputChange}
            onKeyPress={handleInputSubmit}
          />
        </InputContainer>
        {destinations.length > 0 ? (
          <DestinationsGrid>
            {destinations.map((destination) => (
              <Card key={destination.id}>
                <UpperRow
                  image={destination.image}
                  onClick={() => handleImageClick(destination.id)}
                >
                  <Overlay>
                    <Button
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        setDestinations(
                          destinations.filter((d) => d.id !== destination.id)
                        );
                      }}
                    >
                      Remove Destination
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(destination.id);
                      }}
                    >
                      Edit Destination
                    </Button>
                  </Overlay>
                </UpperRow>
                <BottomRow onClick={() => setEditingId(destination.id)}>
                  {editingId === destination.id ? (
                    <EditableText
                      type="text"
                      value={destination.name}
                      onChange={(e) =>
                        handleNameChange(destination.id, e.target.value)
                      }
                      onBlur={() => setEditingId(null)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setEditingId(null);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    destination.name
                  )}
                </BottomRow>
              </Card>
            ))}
          </DestinationsGrid>
        ) : (
          <Message>Please enter a number to display destinations.</Message>
        )}
        <HiddenFileInput
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </TopDestinations>
    </Container>
  );
}

export default Edits;
