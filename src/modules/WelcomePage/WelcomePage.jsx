import React from 'react'
import s from './WelcomePage.module.scss'

const WelcomePage = () => {

    const LOGO_TITLE = "MySalaryInfo";
    const LOGO_CONTENT = "MySalaryInfo — ресурс для отслеживания выплат";
    const SIGN_IN = "Войти";
    const SIGN_UP = "Зарегистрироваться";
    const CONNECT = "Подключиться";

    return (
        <>
            <header className={s.header}>
                <h3 className={s.header_logo}>
                    {LOGO_TITLE}
                </h3>
                <div className={s.header_auth_buttons}>
                    <a href="/auth/sign-in">
                        <button>{SIGN_IN}</button>
                    </a>
                    <a href="/auth/sign-up">
                        <button>{SIGN_UP}</button>
                    </a>
            </div>
            </header>
            <main className={s.content}>
                <h2>{LOGO_CONTENT}</h2>
                <a href={"/auth/sign-up"}>
                    <button>{CONNECT}</button>
                </a>
            </main>
        </>
    )
}

export default WelcomePage;