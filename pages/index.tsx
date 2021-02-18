import 'setimmediate'
// if (!global.localStorage) {
//     global.localStorage = {
//         clear: () => undefined,
//         getItem: (key: string): string | null => '',
//         key: (index: number): string | null => '',
//         removeItem: (key: string): void => undefined,
//         setItem: (key: string, value: string): void => undefined
//     }
// }
import Index from '../src/index'
import React from 'react'
import Head from 'next/head'

function NextApp() {
    return (
        <>
            <Head>
                <title>ExpoBunny</title>
                <meta name="description" content="React Native,Typescript,Redux,Mock server,JWT Auth,Google Auth,Expo,React Navigation,Next.js for deploying.Write once run everywhere,iOS,Android,Web.I know you don't want a complicated project, what you want is a collection of samples based on cutting-edge technologies.Your happy use is my goal!"/>
                <meta name="keywords" content="React Native,Expo,React Navigation,Next.js,Typescript,Redux,Mock server,JWT Auth,Google Auth"/>
                <script
                    async
                    defer
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCdDf8m_Kaf0t6J_egFFZ8ASgwUnctUL4"
                    type="text/javascript"/>
            </Head>
            <Index />
        </>
    )
}

export default NextApp
