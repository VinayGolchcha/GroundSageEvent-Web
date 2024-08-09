import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddNotes from "../Component/NotesPopUp";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ExpensesList from "../Component/ExpensesList";
import IncomeList from "../Component/IncomeList";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Component/Loading";

const TransactionList = () => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("income");
  const [transactionData, setTransactionData] = useState([]);
  const { user, activeEventId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const deleteTransection = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/transaction/delete-transaction/${id}/${activeEventId}`,
        {
          headers: {
            authorization: user?.token,
            Accept: "application/json",
            "Content-Type": "application/json",
            role_id: user?.role_id,
          },
        }
      );
      toast.error(res?.data?.message, {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
      fecthTransections();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };


  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const handleClick = () => {
    window.location.reload();
  }
  const fecthTransections = () => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URI}/transaction/fetch-all-transaction`,
      {
        method: "POST",
        headers: {
          authorization: user?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
          role_id: user?.role_id,
        },
        body: JSON.stringify({
          event_id: activeEventId,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched data
        setTransactionData(data.data);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching transaction data:", error);
      });
  };

  useEffect(() => {
    // Fetch transaction data from the API
    fecthTransections();
  }, []);

  useEffect(() => {
    // Fetch transaction data from the API
    fecthTransections();
  }, [activeEventId ]);


  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div style={{ background: "rgb(66, 92, 90)", minHeight: "130vh" }}>
        <ToastContainer />
        <Box
          component="img"
          src="../../Images/arrow-left.png"
          alt="Share"
          sx={{
            cursor: "pointer",
            width: { xs: "35px", md: "45px" },
            margin: { xs: "20px 0px 0px 20px", md: "10px 0px 0px 20px" },
          }}
          onClick={() => {
            navigate(-1); // Navigate back by one step in the history stack
          }}
        />
        <Typography
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            fontSize: { xs: "30px", sm: "40px", md: "56px" },
            fontFamily: "Inter",
            fontWeight: "700",
            marginTop: "-30px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.52)", // Adding outside shadow
          }}
          onClick={handleClick}
        >
          Transactions
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
          
        >
          <Button
            variant={activeButton === "income" ? "contained" : "outlined"}
            // color={activeButton === "income" ? "primary" : "default"}
            onClick={() => handleButtonClick("income")}
            sx={{
              borderColor: "rgb(247, 230, 173)",
              borderRadius: "4px",
              fontWeight: "400",
              fontFamily: "Aoboshi One",
              background:
                activeButton === "income"
                  ? "rgb(247, 230, 173)"
                  : "transparent", // Apply yellow background to active DOM button
              marginRight: "20px",
              color:
                activeButton === "income"
                  ? "rgb(91, 94, 97)"
                  : "rgb(255, 255, 255)",
              padding: "10px 30px 10px 30px",
              "&:hover": {
                color: activeButton === "income" ? "white" : "rgb(91, 94, 97)",
                background:
                  activeButton === "income"
                    ? "transparent"
                    : "rgb(247, 230, 173)",
              },
            }}
            size="large"
          >
            INCOME
          </Button>
          <Button
            variant={activeButton === "expenses" ? "contained" : "outlined"}
            // color={activeButton === "expenses" ? "primary" : "default"}
            onClick={() => handleButtonClick("expenses")}
            size="large"
            sx={{
              borderColor: "rgb(247, 230, 173)",
              borderRadius: "4px",
              fontWeight: "400",
              fontFamily: "Aoboshi One",
              background:
                activeButton === "expenses"
                  ? "rgb(247, 230, 173)"
                  : "transparent",

              color:
                activeButton === "expenses"
                  ? "rgb(91, 94, 97)"
                  : "rgb(255, 255, 255)",
              padding: "10px 30px 10px 30px",
              "&:hover": {
                color:
                  activeButton === "expenses" ? "white" : "rgb(91, 94, 97)",
                background:
                  activeButton === "expenses"
                    ? "transparent"
                    : "rgb(247, 230, 173)",
              },
            }}
          >
            EXPENSE
          </Button>
        </div>
        {/* {(activeButton === "income" && transactionData.length > 0) ? (
          <IncomeList
            data={transactionData?.filter((item) => item?.tag === "income")}
            deleteTransaction={deleteTransection} // Corrected prop name
          />
        ) : (
          <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/create-transaction");
                }}
            />
          </Box>
        )}
        {activeButton === "expenses" && transactionData.length > 0 && (
          <ExpensesList
            data={transactionData?.filter((item) => item?.tag === "expense")}
            deleteTransaction={deleteTransection} // Corrected prop name
          />
        )} */}
      {(activeButton === "income" && transactionData.length > 0) ? (
        <>
          <IncomeList
            data={transactionData?.filter((item) => item?.tag === "income")}
            deleteTransection={deleteTransection} // Corrected prop name
          />
          {transactionData?.filter((item) => item?.tag === "income").length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop : "20px"
              }}
            >
              <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/create-transaction");
                }}
              />
            </Box>
          )}
        </>
      ) : ( activeButton === "income" && 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" , marginTop : "20px" }}
                onClick={() => {
                  navigate("/create-transaction");
                }}
              />
          
        </Box>
      )}

      {activeButton === "expenses" && (
        <>
          {transactionData.length > 0 ? (
            <ExpensesList
              data={transactionData?.filter((item) => item?.tag === "expense")}
              deleteTransection={deleteTransection} // Corrected prop name
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              
            </Box>
          )}
          {transactionData.length > 0 && transactionData?.filter((item) => item?.tag === "expense").length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="add-icon.png"
                alt="add-icon"
                style={{ cursor: "pointer" , marginTop : "20px" }}
                onClick={() => {
                  navigate("/create-transaction");
                }}
              />
            </Box>
          )}
        </>
      )}

      </div>
    );
  }
};

export default TransactionList;
