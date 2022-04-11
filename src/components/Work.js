import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import CVLook from './CVLook';
import Checkbox from '@mui/material/Checkbox';
import { selectIsShown, selectWorkingUser, setWorkingInfo } from '../redux/slicers/workSlice';
import { TextareaAutosize } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

import DatePicker from '@mui/lab/DatePicker';

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




function Work() {

    const dispatch = useDispatch();
    const history = useHistory();
    const styles = useStyles();
    const hasExperience = useSelector(selectIsShown);
    const infoWorking = useSelector(selectWorkingUser)



    const {
        register,
        watch,
        setValue,
        control,
    } = useForm({
        mode: "all",
        defaultValues: {
            row: infoWorking,
        }
    });

    const editHandler = () => {

        const workingDataForm = {
            row: watch('row')
        }

        dispatch(setWorkingInfo(workingDataForm));
        history.push("/education");
    }

    //console.log(watch('isShown'))


    const addNewWorkHandler = (event) => {
        event.preventDefault();
        const newJob = {
            id: watch('row')[watch('row').length - 1]?.id + 1,
            name: "",
            role: "",
            jobStart: null,
            jobEnd: null,
            description: "",
        }

        setValue('row', [...watch('row'), newJob]);
    }

    console.log(watch('row'))

    const checkDisabled = useMemo(() => {
        const validation = watch('row').every((item, index) =>
            item[index]?.jobStart &&
            item[index]?.jobEnd &&
            item[index]?.name &&
            item[index]?.role &&
            item[index]?.description
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

    const removeExperience = (id) => {

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
                    defaultValue="Work Experience"
                    InputProps={{
                        readOnly: true,
                    }}
                    className={styles.inputField}
                />

                <Button type='submit' className={styles.nextBtn} variant='outlined' onClick={(e) => addNewWorkHandler(e)} >Add</Button>

                {watch('row')?.length > 0 && hasExperience ? watch('row').map((item, index) => (
                    <div key={item.id}>
                        <div className={styles.oneLineInput}>
                            <TextField
                                focused
                                id="outlined-search"
                                label="Name"
                                placeholder='Amazon'
                                type="search"
                                {...register(`row[${index}].name`)}
                                className={styles.oneLineInputField}

                                onChange={(e) => setValue(`row[${index}].name`, e.target.value)}
                            />
                        </div>
                        <div className={styles.oneLineInput}>
                            <TextField
                                focused
                                id="outlined-search"
                                label="Role"
                                placeholder='Full-Stack Web Developer'
                                type="search"
                                {...register(`row[${index}].role`)}
                                className={styles.oneLineInputField}
                                onChange={(e) => setValue(`row[${index}].role`, e.target.value)}
                            />

                        </div>
                        <div className={styles.nameArea}>
                            
                            <DatePicker
                                label="Job Start"
                                value={watch(`row[${index}].jobStart`)}
                                onChange={(newValue) => setValue(`row[${index}].jobStart`, newValue)}
                                renderInput={(params) => <TextField variant='outlined' {...params} />}
                            />
                            
                            <DatePicker
                                label="Job End"
                                value={watch(`row[${index}].jobEnd`)}
                                onChange={(newValue) => setValue(`row[${index}].jobEnd`, newValue)}
                                renderInput={(params) => <TextField variant='outlined' {...params} />}
                            />



                        </div>
                        <br /><br />
                        <div>
                            <TextareaAutosize
                                focused="true"
                                aria-label="empty textarea"
                                {...register(`row[${index}].description`)}
                                placeholder=""
                                maxRows={8}
                                minRows={7}
                                style={{ width: 200 }}
                                onChange={(e) => setValue(`row[${index}].description`, e.target.value)}
                            />

                        </div>

                        <div>
                            <Button variant='outlined'
                                className={styles.deleteBtn}
                                startIcon={<DeleteIcon />}
                                onClick={() => removeExperience(watch(`row[${index}].id`))}
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

export default Work