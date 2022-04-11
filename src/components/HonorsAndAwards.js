import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CVLook from "./CVLook";
import Checkbox from "@mui/material/Checkbox";
import { TextareaAutosize } from "@mui/material";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  selectHonors,
  selectIsShown,
  setHonorsInfo,
} from "../redux/slicers/honorsSlice";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles((theme) => ({
  inputField: {
    display: "flex",
    backgroundColor: "transparent",

    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      // esi el chi linum???
      borderColor: "red",
    },
    width: "48%",
    height: "40px", ///chi pokhvum?????
  },
  oneLineInputField: {
    width: "100%",
    height: "40px", //???
  },

  oneLineInput: {
    width: "100%",
    marginTop: "30px",
  },

  nameArea: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "30px",
  },

  cvPaperArea: {
    display: "flex",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },

  pageLook: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    margin: "20px 15px",
  },

  nextBtn: {
    height: "30px",
    marginTop: "25px", // chi ashkhatum???
  },

  sidebarInput: {
    width: "30%",
  },
}));

function HonorsAndAwards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const hasHonor = useSelector(selectIsShown);
  const honorsInfo = useSelector(selectHonors);

  const { register, watch, setValue } = useForm({
    mode: "all",
    defaultValues: {
      row: honorsInfo,
    },
  });

  const editHandler = () => {
    const honorsDataForm = {
      row: watch("row"),
    };

    dispatch(setHonorsInfo(honorsDataForm));
    history.push("/skills");
  };

  const addNewHonorHandler = (event) => {
    event.preventDefault();
    const newHonor = {
      id: watch("row")[watch("row").length - 1]?.id + 1,
      title: "",
      subtitle: "",
      description: "",
    };

    setValue("row", [...watch("row"), newHonor]);
  };

  console.log(watch("row"));

  const checkDisabled = useMemo(() => {
    const validation = watch("row").every(
      (item, index) =>
        item[index]?.title && item[index]?.subtitle && item[index]?.description
    );
    return !validation;
  }, [watch("row")]);

  // console.log(checkDisabled + " CHECKDISABLED");

  const removeButtonDisabled = useMemo(() => {
    const valid = watch("row").length;

    if (valid > 1) {
      return false;
    }
    return true;
  }, [watch("row")]);

  const removeExperience = (id) => {
    setValue("row", [...watch("row").filter((p) => p.id !== id)]);
  };

  return (
    <Box className={styles.pageLook}>
      <form className={styles.sidebarInput}>
        <Checkbox
          {...label}
          defaultChecked
          {...register("isShown")}
          onChange={() => setValue("isShown", !watch("isShown"))}
        />
        <TextField
          focused
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
          defaultValue="Honors & Awards"
          className={styles.inputField}
          // onChange={(e) => setValue('firstName', e.target.value)}
        />

        <Button
          type="submit"
          className={styles.nextBtn}
          variant="outlined"
          onClick={(e) => addNewHonorHandler(e)}
        >
          Add
        </Button>

        {watch("row")?.length > 0 && hasHonor
          ? watch("row").map((item, index) => (
              <div key={item.id}>
                <div className={styles.oneLineInput}>
                  <TextField
                    focused
                    id="outlined-search"
                    label="Title"
                    placeholder="Code For Good Hackathon"
                    type="search"
                    {...register(`row[${index}].title`)}
                    className={styles.oneLineInputField}
                    onChange={(e) =>
                      setValue(`row[${index}].title`, e.target.value)
                    }
                  />
                </div>
                <div className={styles.oneLineInput}>
                  <TextField
                    focused
                    id="outlined-search"
                    label="Subtitle"
                    placeholder="First Place, National Level"
                    type="search"
                    {...register(`row[${index}].subtitle`)}
                    className={styles.oneLineInputField}
                    onChange={(e) =>
                      setValue(`row[${index}].subtitle`, e.target.value)
                    }
                  />
                </div>

                <br />
                <br />
                <div>
                  <TextareaAutosize
                    focused="true"
                    aria-label="empty textarea"
                    {...register(`row[${index}].description`)}
                    placeholder=""
                    maxRows={8}
                    minRows={7}
                    style={{ width: 200 }}
                    onChange={(e) =>
                      setValue(`row[${index}].description`, e.target.value)
                    }
                  />
                </div>

                <div>
                  <Button
                    variant="outlined"
                    className={styles.deleteBtn}
                    startIcon={<DeleteIcon />}
                    onClick={() => removeExperience(watch(`row[${index}].id`))}
                    disabled={removeButtonDisabled}
                  ></Button>
                </div>
              </div>
            ))
          : null}

        <br />
        <Button
          type="submit"
          className={styles.nextBtn}
          variant="outlined"
          onClick={() => editHandler()}
        >
          Next
        </Button>
      </form>

      <div className={styles.cvPaperArea}>
        <CVLook />
      </div>
    </Box>
  );
}

export default HonorsAndAwards;
