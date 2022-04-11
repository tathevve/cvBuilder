import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserInfo } from '../redux/slicers/personalSlice';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CVLook from './CVLook';
import { useHistory } from 'react-router-dom';
import { TextareaAutosize } from '@mui/material';



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
    objective:{
        marginTop: "35px",
    },
    subtitle: {
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
        justifyContent: 'space-between'
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


function Personal() {
    const users = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const styles = useStyles();



    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
        setValue,
    } = useForm({
        mode: "all",

    })



    const editHandler = () => {


        const personalData = {
            ...watch()
        }

        dispatch(setUserInfo(personalData));
        history.push("/work");

    }

    console.log(watch())

    return (
        <Box
            className={styles.pageLook}
        >

            <div className={styles.sidebarInput}>
                <div className={styles.nameArea}>
                    <TextField
                        focused
                        id="outlined-search"
                        label="First name"
                        placeholder='Jane'
                        type="search"
                        {...register("firstName")}
                        className={styles.inputField}
                        onChange={(e) => setValue('firstName', e.target.value)}

                    />
                    <TextField
                        focused
                        id="outlined-search"
                        label="last name"
                        placeholder='Doe'
                        type="search"
                        {...register("lastName")}
                        className={styles.inputField}
                        onChange={(e) => setValue('lastName', e.target.value)}
                    />



                </div>
                <div className={styles.oneLineInput}>
                    <TextField
                        focused
                        id="outlined-search"
                        label="subtitle"
                        placeholder='Full-Stack Web Developer'
                        type="search"
                        {...register("subtitle")}
                        className={styles.subtitle}
                        onChange={(e) => setValue('subtitle', e.target.value)}
                    />
                </div>

                <div className={styles.oneLineInput}>
                    <TextField
                        focused
                        id="outlined-search"
                        label="firstAddress"
                        placeholder='Palladium Complex'
                        type="search"
                        {...register("firstAddress")}
                        className={styles.subtitle}
                        onChange={(e) => setValue('firstAddress', e.target.value)}
                    />
                </div>

                <div className={styles.oneLineInput}>
                    <TextField
                        focused
                        id="outlined-search"
                        label="secondAddress"
                        placeholder='140 E 14th St'
                        type="search"
                        {...register("secondAddress")}
                        className={styles.subtitle}
                        onChange={(e) => setValue('secondAddress', e.target.value)}
                    />
                </div>

                <div className={styles.oneLineInput}>
                    <TextField
                        focused
                        id="outlined-search"
                        label="phoneNumber"
                        placeholder='+1 541 754 3010'
                        type="search"
                        {...register("phoneNumber")}
                        className={styles.subtitle}
                        onChange={(e) => setValue('phoneNumber', e.target.value)}
                    />
                </div>

                <div className={styles.oneLineInput}>
                    <TextField
                        focused
                        id="outlined-search"
                        label="email"
                        placeholder='jane.doe@example.com'
                        type="search"
                        {...register("email")}
                        className={styles.subtitle}
                        onChange={(e) => setValue('email', e.target.value)}
                    />
                </div>

                <div>
                    <TextareaAutosize
                        focused="true"
                        className={styles.objective}
                        aria-label="empty textarea"
                        {...register("objective")}
                        placeholder="Looking for a challenging role in a reputable
                             organization to utilize my technical, database, and 
                             management skills for the growth of the organization as 
                             well as to enhance my knowledge about new and emerging 
                             trends in the IT sector."
                        maxRows={8}
                        minRows={7}
                        style={{ width: 200 }}
                        onChange={(e) => setValue("objective", e.target.value)}
                    />

                </div>

                <br />
                <Button type='submit' className={styles.nextBtn} variant='outlined' onClick={() => editHandler()} >Next</Button>
            </div>

            <div className={styles.cvPaperArea}>
                <CVLook />
            </div>


        </Box>
    )
}

export default Personal;