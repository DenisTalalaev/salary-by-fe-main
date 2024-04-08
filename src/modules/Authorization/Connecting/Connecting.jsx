import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import s from "./Connecting.module.scss";
import {z} from "zod";
import {ErrorMessage} from "@hookform/error-message";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const schemaEmployee = z.object({
    invitationCode: z.string().nonempty('Введите пригласительный код'),
});

const schemaDirector = z.object({
    organizationName: z.string().nonempty('Введите название организации'),
})

const Connecting = () => {

    const navigate = useNavigate();
    const [isEmployeePressed, setIsEmployeePressed] = useState(false);
    const [isDirectorPressed, setIsDirectorPressed] = useState(false);

    const {control: eControl, handleSubmit: eHandleSubmit, formState: {errors: eErrors}} = useForm({
        resolver: zodResolver(schemaEmployee),
    })

    const {control: dControl, handleSubmit: dHandleSubmit, formState: {errors: dErrors}} = useForm({
        resolver: zodResolver(schemaDirector),
    })

    const onBtnPress = (isEmployee) => {
        debugger
        if (isEmployee) {
            setIsEmployeePressed(true);
            setIsDirectorPressed(false);
        } else {
            setIsDirectorPressed(true);
            setIsEmployeePressed(false);
        }
    }

    const onEmployeeSubmit = async (data) => {
        alert();
    }

    const onDirectorSubmit = async (data) => {
        alert();
    }
    const renderErrorMessage = (name) =>{
        return (
            <ErrorMessage
                errors={isEmployeePressed ? eErrors : dErrors}
                name={name}
                render={({ message }) =>
                    <div className={s.form_error}>
                        <p>{message}</p>
                    </div>
                }
            />
        );
    };


    useEffect(() => {
        async function fetchData () {
            try {
                const userInfo = (await axios.get('/auth/valid')).data;
                if (userInfo && userInfo.authorities.includes('director') ) {
                    navigate('/account/director');
                } else if (userInfo && userInfo.authorities.includes('employee') ) {
                    navigate('/account/employee');
                }
            } catch (message) {
                alert(message);
            }
        }

        fetchData();

    }, []);

    return (
        <div className={s.Connecting}>
            {isEmployeePressed
                ?
                <form onSubmit={eHandleSubmit(onEmployeeSubmit)} className={s.form}>
                    <div className={s.form_field}>
                        <label>Пригласительный код</label>
                        <Controller
                            name="invitationCode"
                            control={eControl}
                            defaultValue=""
                            render={({field}) => <input
                                className={s.form_field_input}
                                placeholder="Введите пригласительный код"
                                {...field}
                            />}
                        />
                        {eErrors.invitationCode && renderErrorMessage('invitationCode')}
                    </div>
                    <button type={"submit"}>Подключиться</button>
                </form>
                :
                <button onClick={() => onBtnPress(true)}>Подключиться как работник</button>
            }
            {isDirectorPressed
                ?
                <form onSubmit={dHandleSubmit(onDirectorSubmit)} className={s.form}>
                    <div className={s.form_field}>
                        <label>Название организации</label>
                        <Controller
                            name="organizationName"
                            control={dControl}
                            defaultValue=""
                            render={({field}) => <input
                                className={s.form_field_input}
                                placeholder="Введите название организации"
                                {...field}
                            />}
                        />
                        {dErrors.organizationName && renderErrorMessage('organizationName')}
                    </div>
                    <button type={"submit"}>Подключиться</button>
                </form>
                :
                <button onClick={() => onBtnPress(false)}>Подключиться как директор</button>
            }
        </div>
    )
}

export default Connecting;