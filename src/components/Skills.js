import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import CVLook from './CVLook';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectSkill, setSkillsInfo, selectIsShown } from '../redux/slicers/skillsSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const useStyles = makeStyles((theme) => ({
  inputField: {
    display: 'flex',
    backgroundColor: 'transparent',

    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': { // esi el chi linum???
      borderColor: 'red',
    },
    width: '48%',
    height: '40px', ///chi pokhvum?????

  },
  oneLineInputField: {

    width: '100%',
    height: '40px'//???
  },


  oneLineInput: {
    width: '100%',
    marginTop: '30px'
  },

  nameArea: {

    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '30px',
  },

  cvPaperArea: {
    display: 'flex',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  pageLook: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    margin: '20px 15px',
  },

  nextBtn: {
    height: '30px',
    marginTop: '25px', // chi ashkhatum???
  },

  sidebarInput: {
    width: '30%',
  },

}));




function Skills() {

  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();
  const hasSkill = useSelector(selectIsShown);
  const skillsInfo = useSelector(selectSkill)



  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
    control,
  } = useForm({
    mode: "all",
    defaultValues: {
      row: skillsInfo,
    }
  });



  const editHandler = () => {

    const skillsDataForm = {
      row: watch('row')
    }

    dispatch(setSkillsInfo(skillsDataForm));
    history.push("/hobbies");
  }


  const addNewSkillHandler = (event) => {
    event.preventDefault();
    const newSkill = {
      id: watch('row')[watch('row').length - 1]?.id + 1,
      skillType: "",
    }

    setValue('row', [...watch('row'), newSkill]);
  }

  console.log(watch('row'))

  const checkDisabled = useMemo(() => {
    const validation = watch('row').every((item, index) =>
      item[index]?.skillType

    );
    return !validation
  }, [watch('row')])

  // console.log(checkDisabled + " CHECKDISABLED");

  const removeButtonDisabled = useMemo(() => {
    const valid = watch('row').length;

    if (valid > 1) {
      return false;
    }
    return true;


  }, [watch('row')])

  const removeSkill = (id) => {

    console.log(id);

    //dispatch(setWorkingInfo(infoWorking.filter(p => p.id !== id)))
    setValue('row', [...watch('row').filter(p => p.id !== id)]);

  }

  return (
    <Box
      className={styles.pageLook}
    >

      <form className={styles.sidebarInput}>

        <Checkbox
          {...label}
          defaultChecked
          {...register("isShown")}
          onChange={() => setValue('isShown', !watch('isShown'))}
        />
        <TextField
          focused
          id="outlined-read-only-input"
          defaultValue="Skills"
          InputProps={{
            readOnly: true,
          }}
          className={styles.inputField}
        />

        <Button type='submit' className={styles.nextBtn} variant='outlined' onClick={(e) => addNewSkillHandler(e)} >Add</Button>

        {watch('row')?.length > 0 && hasSkill ? watch('row').map((item, index) => (
          <div key={item.id}>
            <div className={styles.oneLineInput}>
              <TextField
                focused
                id="outlined-search"
                label="Title"
                placeholder='Team Building'
                type="search"
                {...register(`row[${index}].skillType`)}
                className={styles.oneLineInputField}

                onChange={(e) => setValue(`row[${index}].skillType`, e.target.value)}
              />
            </div>

            <br /><br />

            <div>
              <Button variant='outlined'
                className={styles.deleteBtn}
                startIcon={<DeleteIcon />}
                onClick={() => removeSkill(watch(`row[${index}].id`))}
                disabled={removeButtonDisabled}>
              </Button>
            </div>

          </div>
        )) : null}



        <br />
        <Button
          type='submit'
          className={styles.nextBtn}
          variant='outlined'
          onClick={editHandler}
        //disabled={checkDisabled}
        >
          Next
        </Button>
      </form>

      <div className={styles.cvPaperArea}>
        <CVLook />
      </div>


    </Box>
  )
}

export default Skills;