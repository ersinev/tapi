import axios from "axios";
import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import { fetchPosts, deletePostById } from "./services/placeHolderService";
import AddNewPost from "./AddNewPost";
import { Row, UpdatedObject } from "./types/model";
import Grid from "@mui/material/Grid";
import "./style.css";
import { Button } from "@mui/material";
import deleted1 from "./deleted1.json";
import Lottie from "lottie-react";

function App() {
  const [rows, setrows] = useState<Row[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [lottieIsTrue, setlottieIsTrue] = useState(false);
  useEffect(() => {
    const storedRows = localStorage.getItem("rows");
    if (storedRows) {
      setrows(JSON.parse(storedRows).sort((a: Row, b: Row) => {
        if (a.date === undefined) return 1;
        if (b.date === undefined) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }));
    } else {
      fetchPosts().then((data: Row[]) => {
        setrows(data.sort((a: Row, b: Row) => {
          if (a.date === undefined) return -1;
          if (b.date === undefined) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }));
      });
    }
  }, []);

  useEffect(() => {
    const counterFromStorage = localStorage.getItem("idCounter");
    if (counterFromStorage) {
      setIdCounter(parseInt(counterFromStorage));
    }
    const storedCounter = localStorage.getItem("idCounter");
    if (storedCounter) {
      setIdCounter(parseInt(storedCounter));
    }
  }, []);

  const updateLocalStorage = (data: Row[]) => {
    localStorage.setItem("rows", JSON.stringify(data));
  };

  const deleteById = (id: number) => {
    deletePostById(id).then(() => {
      const filtered = rows.filter((el: any) => el.id !== id);
      setrows(filtered);
      updateLocalStorage(filtered);
    });
  };

  const patchById = async (id: number, data: UpdatedObject) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/${id}`,
        {
          title: data.title,
          body: data.body,
        }
      );
      setrows((prevData: any) => {
        const index = prevData.findIndex((item: Row) => item.id === id);
        const updatedItem = { ...prevData[index], ...response.data };
        const updatedList = [...prevData];
        updatedList[index] = updatedItem;
        updateLocalStorage(updatedList);
        return updatedList;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addNewPost = async (newPostData: UpdatedObject) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}`, {
        title: newPostData.title,
        body: newPostData.body,
      });

      const updatedRows = [
        
        {
          ...response.data,
          id: idCounter + 100,
          date: new Date(Date.now()).toLocaleString("en-us"),
        },
        ...rows,
      ];
      setrows(updatedRows);
      updateLocalStorage(updatedRows);
      setIdCounter(idCounter + 1);

      localStorage.setItem("idCounter", (idCounter + 1).toString());
    } catch (error) {
      console.error(error);
    }
  };

  const resetLocalStorage = () => {
    
    setlottieIsTrue(true);
    
    setInterval(() => {
      localStorage.clear();
      window.location.reload()
      setlottieIsTrue(false);
    }, 2000);
    
   
    
  };

  return (
    <Grid container className="App mainapp">
      <Grid container>
        <Grid item xs={12}>
          {lottieIsTrue ? (
            <div className="lottieDeleted">
            
            <Lottie animationData={deleted1}/>
            <h3>You have reseted the local storage successfully</h3>
            </div>
          ) : (
            <CustomPaginationActionsTable
              className="gridContainer"
              rows={rows}
              deleteById={deleteById}
              patchById={patchById}
            />
          )}
        </Grid>
        <Grid className="childMain" container padding={"5px"}>
          <Grid item xs={4}>
            <AddNewPost addnewpost={addNewPost} />
          </Grid>
          <Grid item xs={4}>
            <h3 className="nmbrPost">
              Number of Posts:{" "}
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 1000,
                  color: "rgb(56, 178, 171)",
                }}
              >
                {rows.length}
              </span>
            </h3>
          </Grid>
          <Grid item xs={4}>
            <Button
              className="resetLocalBtn"
              onClick={resetLocalStorage}
              variant="contained"
            >
              Reset Local Storage
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
