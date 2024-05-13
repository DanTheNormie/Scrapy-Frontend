import { Box, TextField, FormControl, FormHelperText, InputLabel, InputAdornment, OutlinedInput, IconButton, Button, Typography, } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { forwardRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { LoadingButton } from "@mui/lab"
import { useQuery } from "@tanstack/react-query"
import { LOCAL_URL, LOCAL_NETWORK_URL } from "../../general_vals.mjs"
import { redirect, useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext.mjs"

export const LoginPage = forwardRef(({ setFormType }, ref) => {
    const [showPass, setShowPass] = useState(false)
    const { handleSubmit, control, getValues } = useForm()
    const navigate = useNavigate()
    const {updateUser} = useAuth()
    const login = async () => {
        const payload_data = getValues()
        console.log(payload_data);
        const payload = {
            email: payload_data.loginEmail,
            password: payload_data.loginPass
        }

        const options = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials:'include'
        }
        try {
            const res = await fetch(`${LOCAL_URL}/login`, options)
            if(res.status !== 200) throw new Error(`${res.status}, ${res.statusText}`)
            const data = await res.json()
            console.log(data);
            if (data.success == false) {
                throw new Error(data.message)
            } else {
                updateUser(data.data)
                navigate('/dashboard')
                return 'Noice' 
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.message)
        }   
    }

    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ['login'],
        queryFn: login,
        enabled: false,
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false
    })

    const onSubmit = (data) => {
        refetch()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="post">
            <Box ref={ref} sx={{ display: "flex", flexDirection: "column", alignItems: 'center', width: '400px', mr: 4 }}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Cannot be empty',
                        pattern: {
                            value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm,
                            message: 'Invalid email address'
                        },
                    }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState
                    }) => {
                        return (
                            <TextField id="login-email" fullWidth sx={{ mb: 2 }} label="Email *" value={value} onChange={onChange} error={!!error} helperText={error ? error.message : null} />
                        )
                    }}
                    name="loginEmail"
                />


                <Controller
                    control={control}
                    name="loginPass"
                    rules={{
                        required: "Cannot be empty",
                        maxLength: {
                            value: 20,
                            message: 'cannot exceed 20 characters'
                        },
                        minLength: {
                            value: 6,
                            message: 'must contain atleast 6 characters'
                        },
                        validate: (value) => {
                            let capitalPresent = false, specialPresent = false, numberPresent = false
                            const validSpecialChars = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`
                            console.log(validSpecialChars);
                            for (const char of value) {
                                if (!specialPresent && validSpecialChars.includes(char)) specialPresent = true
                                if (!numberPresent && (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57)) numberPresent = true
                                if (!capitalPresent && (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)) capitalPresent = true
                            }
                            let errmsg = 'Password must contain '
                            let counter = 1
                            if (!capitalPresent) errmsg += `<br>${counter++}. atleast 1 Capital Letter `
                            if (!numberPresent) errmsg += `<br>${counter++}. atleast 1 Number `
                            if (!specialPresent) errmsg += `<br>${counter++}. atleast 1 Special Character `

                            if (!capitalPresent || !specialPresent || !numberPresent) {
                                return errmsg
                            }

                            return true
                        }
                    }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error }
                    }) => (
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel htmlFor="login-pass" error={!!error} required>Password</InputLabel>
                            <OutlinedInput id="login-pass" label='Password *'
                                type={showPass ? 'text' : 'password'}
                                onChange={onChange}
                                value={value}
                                error={!!error}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => { setShowPass((prev) => !prev) }}
                                            onMouseDown={(e) => { e.preventDefault() }}
                                            edge="end">
                                            {showPass ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {error && <Typography sx={{ color: 'error.main', ml: 2, mt: .5, fontSize: '0.75rem' }} variant="body2" dangerouslySetInnerHTML={{ __html: error.message }}></Typography>}
                        </FormControl>
                    )}
                />

                {error && <FormHelperText sx={{color:'error.main'}}>{error.message}</FormHelperText>}

                <LoadingButton loading={isLoading} type="submit" variant="contained" sx={{
                    width: '100px',
                    mt: 4

                }}>Login</LoadingButton>

                <Typography sx={{ mt: 2 }}>Not yet registered?<Button disableRipple onClick={() => setFormType('register')} sx={{ '&:hover': { backgroundColor: '#0000' } }}>SignUp Here</Button></Typography>
            </Box>

        </form>
    )
})