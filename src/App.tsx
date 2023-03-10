import axios from "axios";
import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import { fetchPosts, deletePostById } from "./services/placeHolderService";
import AddNewPost from "./AddNewPost";
import { Row, UpdatedObject } from "./types/model";
import Grid from "@mui/material/Grid";
import "./style.css";
function App() {
  const [rows, setrows] = useState<Row[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);
  useEffect(() => {
    const storedRows = localStorage.getItem("rows");
    if (storedRows) {
      setrows(JSON.parse(storedRows));
    } else {
      fetchPosts().then((data) => setrows(data));
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
        ...rows,
        {
          ...response.data,
          id: idCounter + 100,
          date: new Date(Date.now()).toLocaleString("en-us"),
        },
      ];
      setrows(updatedRows);
      updateLocalStorage(updatedRows);
      setIdCounter(idCounter + 1);

      localStorage.setItem("idCounter", (idCounter + 1).toString());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container className="App mainapp">
      <Grid container >
        <Grid item xs={12}>
          <CustomPaginationActionsTable
          className="gridContainer"
            rows={rows}
            deleteById={deleteById}
            patchById={patchById}
          />
        </Grid>
        <Grid container alignItems={"center"} padding={"5px"}>
          <Grid item xs={6}>
            <AddNewPost addnewpost={addNewPost} />
          </Grid>
          <Grid item xs={6}>
             <h3 className="nmbrPost" >Number of Posts:  <span style={{fontSize:"22px", fontWeight:1000, color:'rgb(56, 178, 171)'}}>{rows.length}</span></h3>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
