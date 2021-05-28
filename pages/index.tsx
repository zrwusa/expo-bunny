import 'setimmediate'
import React from 'react'
import Head from 'next/head'
// import Index from '../src/index'
// todo not SSR but get better SEO performance
import dynamic from "next/dynamic";

const Index = dynamic(
    () => {
        return import("../src/index");
    },
    {ssr: false}
);

function NextApp() {
    return (
        <>
            <Head>
                <title>ExpoBunny</title>
                <meta name="description"
                      content="React Native,Typescript,Redux,Mock server,JWT Auth,Google Auth,Expo,React Navigation,Next.js for deploying.Write once run everywhere,iOS,Android,Web.I know you don't want a complicated project, what you want is a collection of samples based on cutting-edge technologies.Your happy use is my goal!"/>
                <meta name="keywords" content="React Native,Expo,React Navigation,Next.js,Typescript,Redux,Mock server,JWT Auth,Google Auth"/>
                <script
                    async
                    defer
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCdDf8m_Kaf0t6J_egFFZ8ASgwUnctUL4"
                    type="text/javascript"/>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `// Prevent Document from sliding left and right, only keep upside down. 
                                 // Do not include the touchpad on the Mac to slide
                                 let startX, startY;
                                 document.addEventListener('touchstart', function (e) {
                                     startX = e.touches[0].pageX;
                                     startY = e.touches[0].pageY;
                                 });
                                 document.addEventListener('touchmove', function (e) {
                                     let moveX = e.touches[0].pageX;
                                     let moveY = e.touches[0].pageY;
                                     if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
                                         e.preventDefault();
                                     }
                                 }, {passive: false});`
                    }}
                    type="text/javascript"/>
            </Head>
            <Index/>
        </>
    )
}

export default NextApp
