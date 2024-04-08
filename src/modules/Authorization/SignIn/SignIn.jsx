import React, {useEffect, useState} from "react";
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import s from './SignIn.module.scss';
import {ErrorMessage} from '@hookform/error-message';
import openEye from '../../../common/assets/images/openEye.svg';
import closedEye from '../../../common/assets/images/closedEye.svg';
import googleIco from '../../../common/assets/images/googleIco.svg';
import authenticateUser from "../api/authenticateUser";
import {useLocation, useNavigate} from "react-router-dom";
import authenticateGoogle from "../api/authenticateGoogle";
import axios from "axios";

const schema = z.object({
    username: z.string().nonempty('Введите имя пользователя'),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordIcon = showPassword ? openEye : closedEye;
    const passwordInputType = showPassword ? 'text' : 'password';
    const navigate = useNavigate();
    const location = useLocation();

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });

    const redirectUser = async () => {
        const userInfo = (await axios.get('/auth/valid')).data;
        if (userInfo && userInfo.authorities.includes('director') ) {
            navigate('/account/director');
        } else if (userInfo && userInfo.authorities.includes('employee') ) {
            navigate('/account/employee');
        } else {
            navigate('/auth/connecting');
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            localStorage.setItem('Authorization', `Bearer ${token}`);
            redirectUser();
        }
    }, []);


    const renderErrorMessage = (name) => {
        return (
            <ErrorMessage
                errors={errors}
                name={name}
                render={({message}) =>
                    <div className={s.form_error}>
                        <p>{message}</p>
                    </div>
                }
            />
        );
    };

    const onSubmit = async (data) => {
        try {
            const response = await authenticateUser(data);
            localStorage.setItem('Authorization', response.token);
            await redirectUser();
        } catch (message) {
            alert(message);
        }
    };

    return (
        <div className={s.container}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={s.form_field}>
                    <label>Логин</label>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input
                            className={s.form_field_input}
                            placeholder="Введите логин"
                            {...field}
                        />}
                    />
                    {errors.username && renderErrorMessage('username')}
                </div>
                <div className={s.form_field}>
                    <label>Пароль</label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <div className={s.form_field_password}>
                                <input
                                    placeholder="Введите пароль"
                                    type={passwordInputType}
                                    {...field} />
                                <img
                                    src={passwordIcon}
                                    onClick={() => setShowPassword(!showPassword)}
                                    alt="visibility password"
                                />
                            </div>
                        )}
                    />
                    {errors.password && renderErrorMessage('password')}
                </div>
                <button type="submit">Войти</button>
                <h5>Войти с помощью:</h5>
                <div className={s.form_google} onClick={authenticateGoogle}>
                    <img src={googleIco} alt={'google'}/>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
