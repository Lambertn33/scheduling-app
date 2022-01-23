import React from 'react'
import Head from 'next/head'
export default function Header({title}) {
    return (
        <Head>
            <title>Cal-App| {title}</title>
        </Head>
    )
}