import { Fragment } from "react"
import Styles from '../styles/Layout.module.css'
import Head from "next/head"

export default function Layout({children}){
    return(
        <Fragment>
            <Head>
                <title>Quiz App</title>
            </Head>
            <main className={Styles.main}>
                <div className={Styles.content}>
                    {children}
                </div>
            </main>
        </Fragment>
    )
}