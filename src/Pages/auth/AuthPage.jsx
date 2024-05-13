import { TextField, Button, Box, Typography, InputLabel, Paper, Card, Divider, InputAdornment, FormControl, OutlinedInput, Icon } from "@mui/material"
import { useEffect, useRef, useState } from "react"

import {LoginPage} from "../../components/AuthPageComponents/loginPageComponent"
import { RegisterPage } from "../../components/AuthPageComponents/registerPageComponent"

export default function Auth() {
    const [formType, setFormType] = useState('login')
    const loginPageRef = useRef()
    const registerPageRef = useRef()
    const containerRef = useRef()

    const onLoginBtnClick = () => {
        setFormType('login')
    }
    const onRegisterBtnClick = () => {
        setFormType('register')
    }

    const resizeObserver = new ResizeObserver((entries) => {
        if(!containerRef.current) return
        containerRef.current.style.height = entries[0].contentRect.height + 'px'
    });

    useEffect(() => {
        if (!containerRef.current || !loginPageRef.current || !registerPageRef.current) return
        if (formType == 'login') {
            resizeObserver.observe(loginPageRef.current);  
        } else {
            resizeObserver.observe(registerPageRef.current);
        }
        return () => resizeObserver.disconnect();
    }, [formType])

    return (
        <>
        <Box sx={{
            width: '100%',
            minHeight: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 8
        }}>
            <Card elevation={4} sx={(theme) => ({
                maxWidth: theme.breakpoints.values.md,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            })}>
                <Box sx={{display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Typography variant="h4">S C R A P Y</Typography>
                </Box>

                <Box sx={{ display: 'flex', height: 'fit-content',mt:4, mb: 6, width: '100%', position: 'relative' }}>
                    <Button disableRipple sx={{
                        width: '100%',
                        '&:hover': {
                            backgroundColor: '#0000'
                        }
                    }} onClick={onLoginBtnClick}><Typography>LOGIN</Typography></Button>
                    <Divider sx={{ mx: 1 }} flexItem orientation="vertical" />
                    <Button disableRipple sx={{
                        width: '100%',
                        '&:hover': {
                            backgroundColor: '#0000'
                        }
                    }} onClick={onRegisterBtnClick}><Typography>REGISTER</Typography></Button>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        minWidth: 'calc(50% - 8px)',
                        border: '1px solid',

                        borderRadius: '4px',
                        backgroundColor: 'primary.main',
                        opacity: 0.1,
                        transition: 'all 0.35s ease-in-out',
                        ...(formType == 'register' && {
                            transform: 'translate(calc(100% + 16px))'
                        })

                    }}></Box>
                </Box>

                <Box
                    ref={containerRef}
                    sx={{
                        display: 'flex',
                        width: '400px',
                        transition: 'all 0.35s ease-in-out',
                        ...(formType == 'register' && {
                            transform: `translateX(calc(-400px - 64px))`
                        })
                    }}>
                    <LoginPage setFormType={setFormType} ref={loginPageRef}/>
                    <RegisterPage setFormType={setFormType} ref={registerPageRef}/>
                </Box>
            </Card>
        </Box>
        </>
    )
}