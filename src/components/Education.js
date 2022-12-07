import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import Button from "@mui/material/Button";
import CVLook from "./CVLook";
import Checkbox from "@mui/material/Checkbox";
import { TextareaAutosize } from "@mui/material";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import DatePicker from "@mui/lab/DatePicker";
import {
  selectEducation,
  selectIsShown,
  setEducationInfo,
} from "../redux/slicers/educationSlice";

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

function Education() {
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const hasMajor = useSelector(selectIsShown);
  const eduInfo = useSelector(selectEducation);

  console.log(hasMajor,'hasMajors')

  const { register, watch, setValue, control } = useForm({
    mode: "all",
    defaultValues: {
      row: eduInfo,
    },
  });

  const watchRow = useWatch({ control, name: "row" });

  //useWatch - arajin parametrov vekaluma control-y ( chmoranas useForm-it mej control grel,setValue-i,watch-i het destruct arac,ete chka ),aysinqn control-a anum te value-nerict VORMEKNA POXVEL,u erkrord - qo element-y vor iran petqa tas,tvyal depqum row-y

  const editHandler = () => {
    const eduDataForm = {
      row: watch("row"),
    };

    dispatch(setEducationInfo(eduDataForm));
    history.push("/honorsandawards");
  };

  const addNewMajorHandler = (event) => {
    event.preventDefault();
    const newMajor = {
      id: watch("row")[watch("row").length - 1]?.id + 1,
      name: "",
      major: "",
      grade: "",
      startDate: null,
      endDate: null,
      description: "",
    };

    setValue("row", [...watch("row"), newMajor]);
  };

  const checkDisabled = useMemo(() => {
    const validation = watch("row").every(
      (item) =>
        item?.startDate &&
        item?.endDate &&
        item?.name &&
        item?.major &&
        item?.grade &&
        item?.description
    );
    return !validation;
  }, [watchRow]);

  // qani vor mer mot Array-a objectneri,watch('row') - ov cher jogum vor Array-i meji object-i value-n poxvela, isk useWatch-y KONKRET LSUMA TE VORERORD ROW-i vra es u dra value-nery joguma vor poxvela,checkDisabled-y ashxatec mnacac texernel kpoxes :)

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
          defaultValue="Education"
          className={styles.inputField}
        />

        <Button
          type="submit"
          className={styles.nextBtn}
          variant="outlined"
          onClick={(e) => addNewMajorHandler(e)}
        >
          Add
        </Button>

        {watch("row")?.length > 0 && hasMajor
          ? watch("row").map((item, index) => (
            <div key={item.id}>
              <div className={styles.oneLineInput}>
                <TextField
                  focused
                  id="outlined-search"
                  label="Name"
                  placeholder="Harvard University"
                  type="search"
                  {...register(`row[${index}].name`)}
                  className={styles.oneLineInputField}
                  onChange={(e) =>
                    setValue(`row[${index}].name`, e.target.value)
                  }
                />
              </div>
              <div className={styles.oneLineInput}>
                <TextField
                  focused
                  id="outlined-search"
                  label="Major"
                  placeholder="Masters in Computer Science"
                  type="search"
                  {...register(`row[${index}].major`)}
                  className={styles.oneLineInputField}
                  onChange={(e) =>
                    setValue(`row[${index}].major`, e.target.value)
                  }
                />
              </div>
              <div className={styles.oneLineInput}>
                <TextField
                  focused
                  id="outlined-search"
                  label="Grade"
                  placeholder="7.2 CGPA"
                  type="search"
                  {...register(`row[${index}].grade`)}
                  className={styles.oneLineInputField}
                  onChange={(e) =>
                    setValue(`row[${index}].grade`, e.target.value)
                  }
                />
              </div>
              <div className={styles.nameArea}>
                <DatePicker
                  label="Start Date"
                  value={watch(`row[${index}].startDate`)}
                  onChange={(newValue) =>
                    setValue(`row[${index}].startDate`, newValue)
                  }
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} />
                  )}
                />

                <DatePicker
                  label="End Date"
                  value={watch(`row[${index}].endDate`)}
                  onChange={(newValue) =>
                    setValue(`row[${index}].endDate`, newValue)
                  }
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} />
                  )}
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
          onClick={editHandler} //ete parameter chka karas prosto senc tas voch te senc () => editHandler()
          disabled={checkDisabled}
        >
          Nexta
        </Button> 
        <video playsInline loop src="blob:https://www.zara.com/6a309cb7-669c-400e-a88c-e3c98133fd2b">

        </video>
      </form>

      <div className={styles.cvPaperArea}>
        <CVLook />
      </div>
    </Box>
  );
}

export default Education;
