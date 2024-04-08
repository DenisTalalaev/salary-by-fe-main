import React, {useState} from "react";
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import s from './Registration.module.scss';
import { ErrorMessage } from '@hookform/error-message';
import openEye from '../../../common/assets/images/openEye.svg';
import closedEye from '../../../common/assets/images/closedEye.svg';
import {useNavigate} from "react-router-dom";
import registerUser from "../api/registerUser";
import authenticateGoogle from "../api/authenticateGoogle";
import googleIco from "../../../common/assets/images/googleIco.svg";

const schema = z.object({
    username: z.string().nonempty('Введите имя пользователя'),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
    email: z.string().nonempty('Введите email'),
});

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false); // Локальное состояние для отображения/скрытия пароля
    const passwordIcon = showPassword ? openEye : closedEye;
    const passwordInputType = showPassword ? 'text' : 'password';
    const navigate = useNavigate();

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
    });



    const renderErrorMessage = (name) =>{
        return (
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) =>
                    <div className={s.form_error}>
                        <p>{message}</p>
                    </div>
                }
            />
        );
    };

    const onSubmit = async (data) => {
        try {
           const response = await registerUser(data);
           alert(response.message);
           navigate('/auth/sign-in')
        } catch (message) {
            alert(message);
        }
    };

    return (
        <div className={s.container}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={s.form_field}>
                    <label>Логин</label>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input
                            className={s.form_field_input}
                            placeholder="Придумайте логин"
                            {...field}
                        />}
                    />
                    {errors.username && renderErrorMessage('username')}
                </div>
                <div className={s.form_field}>
                    <label>Email</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input
                            placeholder="Введите email"
                            type="text"
                            className={s.form_field_input}
                            {...field}
                        />}
                    />
                    {errors.email && renderErrorMessage('email')}
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
                                    placeholder="Придумайте пароль"
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
                <button type={"submit"}>Зарегистрироваться</button>
                <h5>Войти с помощью:</h5>
                <div className={s.form_google} onClick={authenticateGoogle}>
                    <img src={googleIco} alt={'google'}/>
                </div>
            </form>
        </div>
    );
}

export default Registration;
