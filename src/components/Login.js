import {
    Card,
    Grid,
    Button,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { Controller, useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const PageLook = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const Login = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


    useEffect(() => {
        if(localStorage.getItem('authorized')) {
            history.push('/personal')
        }
    },[])


    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({
        defaultValues: {
            email: 'a@mail.ru',
            password: 'dummyPass',

        }
    });

    const onSubmit = (formData) => {
        if (formData.email === 'a@mail.ru' && formData.password === 'dummyPass') {

            localStorage.setItem('authorized', true);

            history.push('/personal')
        }

    }

    return (
        <PageLook>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <TextField {...field} sx={{ mb: 3, width: '100%' }} />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="password"
                                    type="password"
                                    render={({ field }) => (
                                        <TextField {...field} sx={{ mb: '12px', width: '100%' }} />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="agreement"
                                    render={({ field }) => (
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber me" />
                                    )}
                                />

                                {message && (
                                    <p sx={{ color: 'red' }}>
                                        {message}
                                    </p>
                                )}
                                <Box position="relative">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        type="submit"
                                    >
                                        Sign in
                                    </Button>
                                    {loading && (
                                        <StyledProgress
                                            size={24}
                                            className="buttonProgress"
                                        />
                                    )}
                                </Box>


                            </form>
                            <Box mb={2} flexWrap="wrap">


                                <span sx={{ mr: 1, ml: '20px' }}>or</span>
                                <Button
                                    sx={{ textTransform: 'capitalize' }}
                                    onClick={() =>
                                        history.push('/session/signup')
                                    }
                                >
                                    Sign up
                                </Button>
                                <Button
                                    sx={{ color: 'blue' }}
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button>

                            </Box>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </PageLook>
    )
}

export default Login