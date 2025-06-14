import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateNewRoom } from "../apis/backendApis";
import { UserContext } from "../contexts/UserContext";

function RoomCreatePanel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userlimit, setUserLimit] = useState(2);
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSetUserLimit = (e) => {
    setUserLimit(e.target.value);
  };

  const handleGoBack = () => {
    navigate("/main");
  };

  const handleCreate = async () => {
    if (!name) {
      alert("Please fill the title");
      return;
    }
    const result = await fetchCreateNewRoom(
      name,
      description,
      userlimit,
      uid,
      false
    );
    if (result) {
      navigate(`/RoomPage/${result}`);
    }
  };

  return (
    <MiniPannelWrapper>
      <TitleP>
        <BackButton onClick={handleGoBack}>
          <ArrowBackIcon />
        </BackButton>
        &nbsp;&nbsp;Create public room
      </TitleP>
      <p>Room title*</p>
      <Input
        type="text"
        placeholder="Title your room with unique name"
        value={name}
        onChange={handleSetName}
      />
      <p>Description</p>
      <Input
        type="text"
        placeholder="Explain about your room"
        value={description}
        onChange={handleSetDescription}
      />
      <p>
        User limit&nbsp;&nbsp;
        <Select onChange={handleSetUserLimit} value={userlimit}>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, index) => {
            return (
              <option value={number} key={index}>
                {number}
              </option>
            );
          })}
        </Select>
      </p>
      <Button onClick={handleCreate}>Create</Button>
    </MiniPannelWrapper>
  );
}

const TitleP = styled.p`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
`;

const Select = styled.select`
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;

  & option {
    background-color: rgba(50, 50, 50);
    color: white;
  }
`;

const Button = styled.button`
  align-self: center;
  padding: 10px;
  width: 50%;
  border-radius: 50px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
    color: white;
  }
`;

const Input = styled.input`
  width: calc(100% - 30px);
  border-radius: 5px;
  padding: 10px;
`;

const MiniPannelWrapper = styled.div`
  width: 400px;
  background: rgba(0, 0, 0, 0.75);
  padding: 30px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  & p {
    color: white;
    margin-top: 5px;
  }
`;

export default RoomCreatePanel;
